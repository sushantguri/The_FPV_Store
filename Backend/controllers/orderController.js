const pool = require('../dbConfig');

const createOrder = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const items = req.body.items;
        const total = req.body.total;
        const address = req.body.address || null;
        const city = req.body.city || null;
        const zipCode = req.body.zipCode || null;
        const country = req.body.country || null;
        const paymentMethod = req.body.paymentMethod || 'QR_PAY';
        const transactionId = req.body.transactionId || null;

        const userId = req.user.id;

        await connection.beginTransaction();

        const [orderResult] = await connection.execute(
            'INSERT INTO orders (user_id, total, address, city, zip_code, country, payment_method, transaction_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [userId, total, address, city, zipCode, country, paymentMethod, transactionId]
        );

        const orderId = orderResult.insertId;

        for (const item of items) {
            await connection.execute(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.id, item.quantity, item.price]
            );

            // Reduce the stock of the purchased product, ensuring it doesn't drop below 0
            await connection.execute(
                'UPDATE products SET stock = GREATEST(0, stock - ?) WHERE id = ?',
                [item.quantity, item.id]
            );
        }

        await connection.commit();

        const [order] = await pool.execute(
            'SELECT * FROM orders WHERE id = ?',
            [orderId]
        );

        const [orderItems] = await pool.execute(
            'SELECT * FROM order_items WHERE order_id = ?',
            [orderId]
        );

        res.status(201).json({
            ...order[0],
            items: orderItems
        });

    } catch (error) {
        await connection.rollback();
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    } finally {
        connection.release();
    }
};

const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const [orders] = await pool.execute(
            'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );

        for (let order of orders) {
            const [items] = await pool.execute(`
                SELECT oi.*, p.name, p.description, p.image_url, p.category
                FROM order_items oi
                JOIN products p ON oi.product_id = p.id
                WHERE oi.order_id = ?
            `, [order.id]);

            order.items = items.map(item => ({
                id: item.id,
                orderId: item.order_id,
                productId: item.product_id,
                quantity: item.quantity,
                price: item.price,
                product: {
                    id: item.product_id,
                    name: item.name,
                    description: item.description,
                    imageUrl: item.image_url,
                    category: item.category
                }
            }));
        }

        res.status(200).json(orders);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

const getAllOrders = async (req, res) => {
    console.log("getAllOrders: fetching orders...");
    try {
        const [orders] = await pool.execute(
            'SELECT o.*, u.name as user_name, u.email as user_email FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC'
        );
        console.log(`getAllOrders: found ${orders.length} orders`);

        for (let order of orders) {
            console.log(`getAllOrders: fetching items for order ${order.id}`);
            const [items] = await pool.execute(`
                SELECT oi.*, p.name, p.description, p.image_url, p.category
                FROM order_items oi
                JOIN products p ON oi.product_id = p.id
                WHERE oi.order_id = ?
            `, [order.id]);
            console.log(`getAllOrders: found ${items.length} items for order ${order.id}`);

            order.items = items.map(item => ({
                id: item.id,
                orderId: item.order_id,
                productId: item.product_id,
                quantity: item.quantity,
                price: item.price,
                product: {
                    id: item.product_id,
                    name: item.name,
                    description: item.description,
                    imageUrl: item.image_url,
                    category: item.category
                }
            }));
        }

        console.log("getAllOrders: responding with orders");
        res.status(200).json(orders);

    } catch (error) {
        console.error("getAllOrders: ERROR", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await pool.execute(
            'UPDATE orders SET status = ? WHERE id = ?',
            [status, id]
        );

        res.status(200).json({ message: "Order status updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

module.exports = { createOrder, getUserOrders, getAllOrders, updateOrderStatus };

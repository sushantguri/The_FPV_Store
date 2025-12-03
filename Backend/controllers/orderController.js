const prisma = require('../prismaClient');

const createOrder = async (req, res) => {
    try {
        const items = req.body.items;
        const total = req.body.total;
        const address = req.body.address;
        const city = req.body.city;
        const zipCode = req.body.zipCode;
        const country = req.body.country;

        const userId = req.user.id;

        const orderItems = items.map(item => {
            return {
                productId: item.id,
                quantity: item.quantity,
                price: item.price
            };
        });

        const order = await prisma.order.create({
            data: {
                userId: userId,
                total: total,
                address: address,
                city: city,
                zipCode: zipCode,
                country: country,
                items: {
                    create: orderItems
                }
            },
            include: {
                items: true
            }
        });

        res.status(201).json(order);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await prisma.order.findMany({
            where: { userId: userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json(orders);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

module.exports = { createOrder, getUserOrders };

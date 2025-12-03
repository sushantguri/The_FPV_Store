
const prisma = require('../prismaClient.js');

const getProducts = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const search = req.query.search;
        const category = req.query.category;
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const sort = req.query.sort;

        const skip = (page - 1) * limit;

        const where = {};

        if (search) {
            where.OR = [
                { name: { contains: search } },
                { description: { contains: search } }
            ];
        }

        if (category) {
            where.category = category;
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) {
                where.price.gte = parseFloat(minPrice);
            }
            if (maxPrice) {
                where.price.lte = parseFloat(maxPrice);
            }
        }

        let orderBy = {};
        if (sort) {
            const parts = sort.split(':');
            const field = parts[0];
            const order = parts[1];
            if (order === 'desc') {
                orderBy[field] = 'desc';
            } else {
                orderBy[field] = 'asc';
            }
        } else {
            orderBy = { createdAt: 'desc' };
        }

        const products = await prisma.product.findMany({
            where: where,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy: orderBy
        });

        const total = await prisma.product.count({ where: where });

        res.status(200).json({
            result: products,
            pagination: {
                total: total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) }
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const createProduct = async (req, res) => {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const category = req.body.category;
        const imageUrl = req.body.imageUrl;
        const stock = req.body.stock;

        const product = await prisma.product.create({
            data: {
                name: name,
                description: description,
                price: parseFloat(price),
                category: category,
                imageUrl: imageUrl,
                stock: parseInt(stock)
            }
        });

        res.status(201).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const category = req.body.category;
        const imageUrl = req.body.imageUrl;
        const stock = req.body.stock;

        const product = await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                name: name,
                description: description,
                price: parseFloat(price),
                category: category,
                imageUrl: imageUrl,
                stock: parseInt(stock)
            }
        });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await prisma.product.delete({
            where: { id: parseInt(id) }
        });

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };

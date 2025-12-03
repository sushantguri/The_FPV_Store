const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { id: decodedData?.id, role: decodedData?.role };
            req.userId = decodedData?.id;
            req.userRole = decodedData?.role;
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Unauthenticated' });
    }
};

module.exports = { protect };

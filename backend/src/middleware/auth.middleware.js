import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    try {

        // Retrieves authorization header from frontend
        const authHeader = req.headers.authorization; 

        // Checks whether the token exists
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Access denied. No token provided.'
            });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        console.error("JWT Error:", error.name);
        console.error("JWT Message:", error.message);

        return res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
};

export { verifyToken };

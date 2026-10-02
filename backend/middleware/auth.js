const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authenticate(
    req,
    res,
    next
) {
    try {
        const header =
            req.headers.authorization || "";
            //req.headers.authorization retrieves that header.
            //|| ""  provides an empty string if the header is missing.

        if (
            !header.startsWith("Bearer ")

        ) {
            return res.status(401).json({
                message:
                    "Authentication required"
            });
        }

        const token =
            header.substring(7);
            // "Bearer " contains seven characters, including the space.
            // substring(7) removes those first seven characters and leaves the actual JWT.

        if (!token) {
            return res.status(401).json({
                message:
                    "Authentication required"
            });
        }

        const payload =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );
            //jwt.verify() checks the token's signature using your backend's secret key, and also checks whether the token has expired if an expiry was set.

        const user =
            await User.findById(
                payload.id
            ).select("-password");
            //.select("-password") excludes the password field from the returned user document.

        if (!user) {
            return res.status(401).json({
                message:
                    "User no longer exists"
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.error(
            "AUTH ERROR:",
            error.message
        );

        return res.status(401).json({
            message:
                "Invalid or expired token"
        });
    }
}

function authorize(...roles) {
    //The ...roles syntax is called a rest parameter. It collects all the arguments into an array.
    return (
        req,
        res,
        next
    ) => {
        if (
            !req.user ||
            !roles.includes(
                req.user.role
            )
        ) {
            return res.status(403).json({
                message:
                    "Access denied"
            });
        }

        next();
    };
}

module.exports = {
    authenticate,
    authorize
};
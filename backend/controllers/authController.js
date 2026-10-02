const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const {
    admin,
    isFirebaseReady
} = require("../config/firebase");

function tokenFor(user) {
    if (!process.env.JWT_SECRET) {
        throw new Error(
            "JWT_SECRET is missing from backend/.env"
        );
    }

    return jwt.sign(
        //creates a jwt token with the user's id and role as payload
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        //It is used to sign the token so the server can later verify that the token hasn't been tampered with.
        {
            expiresIn: "30d"
        }
    );
}

function userResponse(user) {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
}

async function register(req, res) {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        const cleanName = name?.trim();
        const normalizedEmail =
            email?.trim().toLowerCase();

        if (
            !cleanName ||
            !normalizedEmail ||
            !password
        ) {
            return res.status(400).json({
                message:
                    "Name, email and password are required."
            });
        }

        const existingUser =
            await User.findOne({
                email: normalizedEmail
            });

        if (existingUser) {
            return res.status(409).json({
                message:
                    "Email already registered. Please sign in instead."
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        /*
         * MongoDB account is created first.
         */
        const user = await User.create({
            name: cleanName,
            email: normalizedEmail,
            password: hashedPassword,
            role: "user"
        });

        /*
         * Firebase is optional.
         * A Firebase failure must NEVER delete or invalidate the MongoDB account.
         */
        if (isFirebaseReady()) {
            try {
                const firebaseUser =
                    await admin.auth().createUser({
                        //Here, admin.auth().createUser() creates an account in Firebase Authentication.
                        email: normalizedEmail,
                        password,
                        displayName: cleanName
                    });

                user.firebaseUid =
                    firebaseUser.uid;

                await user.save();
                //.save() is needed because changing a property on a Mongoose document in memory doesn't automatically persist the change to the database.

            } catch (firebaseError) {
                console.warn(
                    "Firebase user creation skipped:",
                    firebaseError?.message
                );
            }
        }

        return res.status(201).json({
            message:
                "Account created successfully.",
            token: tokenFor(user),
            user: userResponse(user)
        });
    } catch (error) {
        console.error(
            "REGISTER ERROR:",
            error
        );

        /*
         * MongoDB duplicate-key protection.
         */
        if (error.code === 11000) {
            //MongoDB error code 11000 commonly indicates a duplicate-key violation.
            //For example, two registration requests might attempt to create the same email nearly simultaneously. The initial findOne() check alone cannot prevent
            //This handler converts that database error into a user-friendly 409 Conflict response.
            return res.status(409).json({
                message:
                    "Email already registered. Please sign in instead."
            });
        }

        return res.status(500).json({
            message:
                error.message ||
                "Unable to create account."
        });
    }
}

async function login(req, res) {
    try {
        const {
            email,
            password
        } = req.body;

        const normalizedEmail =
            email?.trim().toLowerCase();

        if (
            !normalizedEmail ||
            !password
        ) {
            return res.status(400).json({
                message:
                    "Email and password are required."
            });
        }

        const user =
            await User.findOne({
                email: normalizedEmail
            });

        if (!user) {
            return res.status(401).json({
                message:
                    "Invalid email or password."
            });
        }

        const passwordMatches =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!passwordMatches) {
            return res.status(401).json({
                message:
                    "Invalid email or password."
            });
        }

        return res.json({
            message:
                "Login successful.",
            token: tokenFor(user),
            user: userResponse(user)
        });
    } catch (error) {
        console.error(
            "LOGIN ERROR:",
            error
        );

        return res.status(500).json({
            message:
                error.message ||
                "Unable to sign in."
        });
    }
}

async function saveFcmToken(req, res) {
    try {
        req.user.fcmToken =
            req.body.token;

        await req.user.save();

        return res.json({
            message:
                "Notification token saved"
        });
    } catch (error) {
        return res.status(500).json({
            message:
                "Unable to save notification token."
        });
    }
}

module.exports = {
    register,
    login,
    saveFcmToken
};
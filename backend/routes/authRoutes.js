
const express = require("express");
const { body } = require("express-validator");
//body() lets you define validation rules for fields in the request body.

const {
    register,
    login,
    saveFcmToken
} = require("../controllers/authController");

const { authenticate } = require("../middleware/auth");

const validate = require("../middleware/validate");

const router = express.Router();

router.post(
    "/register",
    [
        body("name").trim().isLength({ min: 2 }),
        body("email").isEmail(),
        body("password").isLength({ min: 6 })
    ],
    validate,
    register
);

router.post(
    "/login",
    [
        body("email").isEmail(),
        body("password").notEmpty()
    ],
    validate,
    login
);

router.post(
    "/fcm-token",
    authenticate,
    [
        body("token").notEmpty()
    ],
    validate,
    saveFcmToken
);

module.exports = router;

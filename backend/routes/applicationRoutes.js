
const express = require("express");
const { body } = require("express-validator");
//body() lets you define validation rules for fields in the request body.

const {
    createApplication,
    listApplications,
    getApplication,
    updateStatus
} = require("../controllers/applicationController");

const {
    authenticate,
    authorize
} = require("../middleware/auth");

const validate = require("../middleware/validate");

const router = express.Router();

// Submit a new adoption application
router.post(
    "/",
    authenticate,
    [
        body("petId").isMongoId(),
        body("phone").notEmpty(),
        body("homeType").notEmpty(),
        body("experience").notEmpty(),
        body("reason").isLength({ min: 10 })
    ],
    validate,
    createApplication
);

// Get applications
router.get(
    "/",
    authenticate,
    listApplications
);

// Get a specific application
router.get(
    "/:id",
    authenticate,
    getApplication
);

// Update application status (admin only)
router.put(
    "/:id/status",
    authenticate,
    authorize("admin"),
    [
        body("status").isIn([
            "pending",
            "under_review",
            "approved",
            "rejected"
        ])
    ],
    validate,
    updateStatus
);

module.exports = router;

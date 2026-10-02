
const express = require("express");

const {
    listPets,
    getPet,
    createPet,
    updatePet,
    deletePet
} = require("../controllers/petController");

const {
    authenticate,
    authorize
} = require("../middleware/auth");

const router = express.Router();

router.get("/", listPets);

router.get("/:id", getPet);

router.post(
    "/",
    authenticate,
    authorize("admin"),
    createPet
);

router.put(
    "/:id",
    authenticate,
    authorize("admin"),
    updatePet
);

router.delete(
    "/:id",
    authenticate,
    authorize("admin"),
    deletePet
);

module.exports = router;

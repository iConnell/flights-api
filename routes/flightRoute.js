const express = require("express");

const router = express.Router();
const controller = require("../controllers/flightController");

router.post("/", controller.bookFlight);
router.get("/", controller.getFlights);
router.get("/:id", controller.getFlight);
router.patch("/:id", controller.updateFlight);
router.delete("/:id", controller.deleteFlight);

module.exports = router;

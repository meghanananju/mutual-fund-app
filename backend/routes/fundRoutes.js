const express = require("express");
const { fetchFunds } = require("../controllers/fundController");
const {authenticate }= require("../middleware/authMiddleware");

const router = express.Router();
router.get("/fetchFunds", authenticate, fetchFunds);

module.exports = router;

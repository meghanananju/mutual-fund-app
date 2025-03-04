const express = require("express");
const { fetchFunds, fetchFundFamilies } = require("../controllers/fundController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/fetchFunds", authenticate, fetchFunds);
router.get("/fetchFundFamilies", fetchFundFamilies)
module.exports = router;

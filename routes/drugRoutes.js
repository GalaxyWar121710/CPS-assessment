const express = require("express");
const {
  getDrugDetails,
  getProprietaryInfo,
} = require("../controllers/drugController");
const router = express.Router();

router.get("/:name", getDrugDetails);

router.get("/:rxcui/proprietary/:srclist/:rxaui", getProprietaryInfo);

module.exports = router;

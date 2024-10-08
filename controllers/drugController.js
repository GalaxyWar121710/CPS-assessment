const axios = require("axios");

const getDrugDetails = async (req, res) => {
  const drugName = req.params.name;

  if (!drugName) {
    return res.status(400).json({ error: "Drug name is required" });
  }

  const drugUrl = `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${encodeURIComponent(
    drugName
  )}`;

  try {
    const response = await axios.get(drugUrl);
    const data = response.data;

    // Extract necessary information
    if (data.drugGroup && data.drugGroup.conceptGroup) {
      const drugInfo = data.drugGroup.conceptGroup.flatMap(
        (group) => group.conceptProperties || []
      );
      res.json({ drugName, drugInfo });
    } else {
      res.status(404).json({ error: "No drug information found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching drug details" });
  }
};

const getProprietaryInfo = async (req, res) => {
  const { rxcui, srclist, rxaui } = req.params;

  if (!rxcui || !srclist || !rxaui) {
    return res
      .status(400)
      .json({ error: "RxCUI, source list, and RxAUI are required" });
  }

  const proprietaryUrl = `https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/proprietary.xml?srclist=${encodeURIComponent(
    srclist
  )}&rxaui=${rxaui}`;

  try {
    const response = await axios.get(proprietaryUrl);
    const xmlData = response.data;

    const xml2js = require("xml2js");
    const parser = new xml2js.Parser();

    parser.parseString(xmlData, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Error parsing XML data" });
      } else {
        res.json({ proprietaryInfo: result });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching proprietary information" });
  }
};

module.exports = { getDrugDetails, getProprietaryInfo };

const axios = require("axios");
const Fund = require("../models/fund");

exports.fetchFunds = async (req, res) => {
    // try {
    // const response = await axios.get("https://latest-mutual-fund-nav.p.rapidapi.com/latest", {
    //     headers: {
    //         // "Content-Type": "application/json",
    //         // "X-RapidAPI-Ua": "RapidAPI-Playground",
    //         "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
    //         "X-RapidAPI-Host": "latest-mutual-fund-nav.p.rapidapi.com"
    //     },
    //     params: { Scheme_Type: "Open" } 
    // });


    const options = {
        method: "GET",
        url: "https://latest-mutual-fund-nav.p.rapidapi.com/master",
        params: { RTA_Agent_Code: "CAMS" },
        headers: {
            "x-rapidapi-key": process.env.RAPIDAPI_KEY,
            "x-rapidapi-host": "latest-mutual-fund-nav.p.rapidapi.com"
        }
    };

    try {
        const response = await axios.request(options);
        const fundData = Object.values(response.data); // Convert object to an array

        for (const fund of fundData) {
            await Fund.create({
                fundFamily: fund.AMC_Code || "Unknown",
                schemeName: fund.Scheme_Name || "Unnamed Scheme",
                schemeCode: fund.Scheme_Code || "N/A",
                isin: fund.ISIN || null,
                currentValue: fund.Face_Value || 0.0, // Using Face_Value as placeholder for NAV
                purchaseAllowed: fund.Purchase_Allowed || false,
                redemptionAllowed: fund.Redemption_Allowed || false
            });
        }
        // console.log(funds);

        // await Fund.bulkCreate(funds);

        res.json({ message: "Funds fetched successfully", fundData });
    } catch (error) {
        console.error("Error fetching funds:", error);
        res.status(400).json({ message: "Error fetching funds", error: error.message });
    }
};

const axios = require("axios");
exports.fetchFunds = async (req, res) => {
    try {
        const fundFamily = req.body.fundFamily;


        if (!req.body.fundFamily) {
            return res.status(400).json({
                message: "Mutual Fund Family is required",
            });
        }

        const options = {
            method: "GET",
            url: "https://latest-mutual-fund-nav.p.rapidapi.com/latest",
            headers: {
                "Accept": "application/json",
                "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
                "X-RapidAPI-Host": "latest-mutual-fund-nav.p.rapidapi.com",
            },
        };

        const response = await axios.request(options);

        if (response.data && Array.isArray(response.data)) {
            // Filter funds that match the requested fund family
            const filteredFunds = response.data.filter(fund =>
                fund.Mutual_Fund_Family && fund.Mutual_Fund_Family.toLowerCase() === fundFamily.toLowerCase()
            );

            return res.status(200).json({
                funds: filteredFunds,
            });
        } else {
            res.status(400).json({ message: "No valid data received from API" });
        }
    } catch (error) {
        console.error("Error fetching fund data:", error);
        return res.status(500).json({
            message: "Failed to fetch fund data",
        });
    }
};


exports.fetchFundFamilies = async (req, res) => {
    try {
        const options = {
            method: "GET",
            url: "https://latest-mutual-fund-nav.p.rapidapi.com/latest",
            headers: {
                "Accept": "application/json",
                "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
                "X-RapidAPI-Host": "latest-mutual-fund-nav.p.rapidapi.com",
            },
        };

        const response = await axios.request(options);

        if (response.data && Array.isArray(response.data)) {
            // Extract unique Mutual_Fund_Family names
            const fundFamilies = response.data.map(fund => fund.Mutual_Fund_Family);
            const uniqueFundFamilies = [...new Set(fundFamilies)]; // Remove duplicates

            return res.status(200).json({
                fundFamilies: uniqueFundFamilies,
            });
        } else {
            res.status(400).json({ message: "Failed to fetch mutual fund families" })
        }
    } catch (error) {
        console.error("Error fetching fund families:", error.response);
        return res.status(500).json({
            message: "Failed to fetch fund families",
        });
    }
};

const axios = require("axios");

export const instance = axios.create({
    baseURL: "https://freecurrencyapi.net/api/v2",
    headers: {
      "Content-Type": "application/json",
    },
  
  });
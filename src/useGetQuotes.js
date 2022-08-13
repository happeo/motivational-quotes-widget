import axios from "axios";
import React, { useEffect, useState } from "react";

export const useGetQuotes = (apiHost, apiKey) => {
  const [quote, setQuote] = useState();
  useEffect(() => {
    if (apiHost && apiKey) {
      const options = {
        method: "POST",
        url: "https://motivational-quotes1.p.rapidapi.com/motivation",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": apiKey.trim(),
          "X-RapidAPI-Host": apiHost.trim(),
        },
      };
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setQuote(
            typeof response.data === "string" &&
              response.data.indexOf("null") !== -1
              ? response.data.replace("null", "Unknown")
              : response.data
          );
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [apiHost, apiKey]);

  return quote;
};

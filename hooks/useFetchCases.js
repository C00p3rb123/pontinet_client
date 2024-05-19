import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
// Custom hook to fetch cases from a given URL for Pontinet's case management system.
// Used to retrieve and manage new medical cases that have been sent from the Pontinet chatbot.
export const useFetchCases = (url) => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setrefresh] = useState(false);

  const { logout } = useAuth();
  //Function to fetch cases from the provided URL.
  //Sets the data and loading state based on the response.
  const getCases = async () => {
    try {
      const cases = await axios.get(url);
      setData(cases.data);
      setIsLoading(false);
      return cases;
    } catch (err) {
      if (err.response.status === 403) {
        logout();
      }
      return err.message;
    }
  };
  //Function to refresh the fetched cases.
  // Sets the refresh state, fetches the cases, and then resets the refresh state.
  const onRefresh = async () => {
    setrefresh(true);
    await getCases(); // Fetch cases on component mount
    setrefresh(false);
  };

  return { getCases, data, isLoading, refresh, onRefresh };
};

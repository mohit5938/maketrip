import axios from "axios";
import { server } from "../constants/constant.js";

/* ======================================
   Generate AI Itinerary & Guide
====================================== */
export const generateAIItineraryApi = async (destination, duration, vibe) => {
    try {
        const { data } = await axios.post(`${server}ai/generate-itinerary`, {
            destination,
            duration,
            vibe,
        });
        return data;
    } catch (error) {
        throw error.response?.data || { success: false, message: "Failed to generate AI itinerary." };
    }
};

/* ======================================
   Save Trip Itinerary
====================================== */
export const saveTripItineraryApi = async (tripId, itineraryDays) => {
    try {
        const { data } = await axios.post(
            `${server}ai/save-itinerary`,
            { tripId, itineraryDays },
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        throw error.response?.data || { success: false, message: "Failed to save itinerary." };
    }
};

/* ======================================
   Get Stored Trip Itinerary
====================================== */
export const getTripItineraryApi = async (tripId) => {
    try {
        const { data } = await axios.get(`${server}ai/itinerary/${tripId}`);
        return data;
    } catch (error) {
        return { success: false, itinerary: [] };
    }
};

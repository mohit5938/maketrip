import axios from "axios";
import { server } from "../constants/constant.js";

/* ======================================
   Check User Trip Access (Host / Joined Traveler)
====================================== */
export const checkTripAccessApi = async (tripId) => {
    try {
        const { data } = await axios.get(`${server}discussions/access/${tripId}`, {
            withCredentials: true,
        });
        return data;
    } catch (error) {
        return { success: false, hasAccess: false };
    }
};

/* ======================================
   Get Trip Discussions
====================================== */
export const getTripDiscussionsApi = async (tripId) => {
    try {
        const { data } = await axios.get(`${server}discussions/${tripId}`);
        return data;
    } catch (error) {
        return { success: false, discussions: [] };
    }
};

/* ======================================
   Post Discussion Message
====================================== */
export const postDiscussionMessageApi = async (tripId, message, isAnnouncement = false) => {
    try {
        const { data } = await axios.post(
            `${server}discussions`,
            { tripId, message, isAnnouncement },
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        throw error.response?.data || { success: false, message: "Failed to post message." };
    }
};

/* ======================================
   Delete Discussion Message
====================================== */
export const deleteDiscussionMessageApi = async (messageId) => {
    try {
        const { data } = await axios.delete(`${server}discussions/${messageId}`, {
            withCredentials: true,
        });
        return data;
    } catch (error) {
        throw error.response?.data || { success: false, message: "Failed to delete message." };
    }
};

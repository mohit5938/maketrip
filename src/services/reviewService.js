import axios from "axios";
import { server } from "../constants/constant.js";

/* ======================================
   Get Reviews for a Trip
====================================== */
export const getTripReviewsApi = async (tripId) => {
    try {
        const { data } = await axios.get(`${server}reviews/trip/${tripId}`);
        return data;
    } catch (error) {
        throw error.response?.data || { success: false, message: "Failed to fetch reviews." };
    }
};

/* ======================================
   Submit / Update a Review
====================================== */
export const createReviewApi = async (tripId, rating, comment) => {
    try {
        const { data } = await axios.post(
            `${server}reviews`,
            { tripId, trip_id: tripId, id: tripId, rating, comment },
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        throw error.response?.data || { success: false, message: "Failed to submit review." };
    }
};

/* ======================================
   Get User Reviewable Trips
====================================== */
export const getUserReviewableTripsApi = async () => {
    try {
        const { data } = await axios.get(`${server}reviews/reviewable`, {
            withCredentials: true,
        });
        return data;
    } catch (error) {
        throw error.response?.data || { success: false, message: "Failed to fetch reviewable trips." };
    }
};

import axios from "axios";
import { server } from "../constants/constant.js";

/* ======================================
   Toggle Trip Wishlist Status
====================================== */
export const toggleWishlistApi = async (tripId) => {
    try {
        const { data } = await axios.post(
            `${server}wishlist/toggle`,
            { tripId },
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        throw error.response?.data || { success: false, message: "Failed to update wishlist." };
    }
};

/* ======================================
   Get User's Saved Wishlist Trips
====================================== */
export const getUserWishlistApi = async () => {
    try {
        const { data } = await axios.get(`${server}wishlist`, {
            withCredentials: true,
        });
        return data;
    } catch (error) {
        throw error.response?.data || { success: false, message: "Failed to fetch wishlist." };
    }
};

/* ======================================
   Get User's Saved Wishlist Trip IDs
====================================== */
export const getUserWishlistIdsApi = async () => {
    try {
        const { data } = await axios.get(`${server}wishlist/ids`, {
            withCredentials: true,
        });
        return data;
    } catch (error) {
        return { success: false, wishlistIds: [] };
    }
};

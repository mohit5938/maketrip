import axios from "axios";
import { server } from "../constants/constant.js";

/* ======================================
   Get Host Verification Status
====================================== */
export const getHostStatus = async () => {
    try {
        const { data } = await axios.get(
            `${server}hosts/status`,
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        throw (
            error.response?.data || {
                success: false,
                message: "Failed to fetch host status.",
            }
        );
    }
};

/* ======================================
   Apply For Host
====================================== */
export const applyForHost = async (hostData) => {
    try {
        const { data } = await axios.post(
            `${server}hosts/apply`,
            hostData,
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        throw (
            error.response?.data || {
                success: false,
                message: "Failed to submit host application.",
            }
        );
    }
};

/* ======================================
   Get My Hosted Trips
====================================== */
export const getMyHostedTrips = async () => {
    try {
        const { data } = await axios.get(
            `${server}hosts/my-hosted-trips`,
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        throw (
            error.response?.data || {
                success: false,
                message: "Failed to fetch hosted trips.",
            }
        );
    }
};

/* ======================================
   Get Traveler Roster for a Trip
====================================== */
export const getTripTravelers = async (tripId) => {
    try {
        const { data } = await axios.get(
            `${server}hosts/trip-travelers/${tripId}`,
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        throw (
            error.response?.data || {
                success: false,
                message: "Failed to fetch trip travelers.",
            }
        );
    }
};

/* ======================================
   Update Hosted Trip Status
====================================== */
export const updateHostedTripStatus = async (tripId, status) => {
    try {
        const { data } = await axios.patch(
            `${server}hosts/update-trip-status/${tripId}`,
            { status },
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        throw (
            error.response?.data || {
                success: false,
                message: "Failed to update trip status.",
            }
        );
    }
};

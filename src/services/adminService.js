import axios from "axios";
import { server } from "../constants/constant.js";

/* ======================================
   Get Admin Stats Overview
====================================== */
export const getAdminStatsApi = async () => {
    try {
        const { data } = await axios.get(`${server}admin/stats`, {
            withCredentials: true,
        });
        return data;
    } catch (error) {
        throw error.response?.data || { success: false, message: "Failed to fetch admin stats." };
    }
};

/* ======================================
   Get Pending Host Applications
====================================== */
export const getPendingHostsApi = async (page = 1, limit = 10) => {
    try {
        const { data } = await axios.get(`${server}admin/pending-hosts?page=${page}&limit=${limit}`, {
            withCredentials: true,
        });
        return data;
    } catch (error) {
        throw error.response?.data || { success: false, message: "Failed to fetch pending hosts." };
    }
};

/* ======================================
   Update Host Application Status
====================================== */
export const updateHostStatusApi = async (userId, status) => {
    try {
        const { data } = await axios.patch(
            `${server}admin/hosts/${userId}/status`,
            { status },
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        throw error.response?.data || { success: false, message: "Failed to update host status." };
    }
};

/* ======================================
   Get Pending Trips for Approval
====================================== */
export const getPendingTripsApi = async (page = 1, limit = 10) => {
    try {
        const { data } = await axios.get(`${server}admin/pending-trips?page=${page}&limit=${limit}`, {
            withCredentials: true,
        });
        return data;
    } catch (error) {
        throw error.response?.data || { success: false, message: "Failed to fetch pending trips." };
    }
};

/* ======================================
   Update Trip Status (Approve/Reject)
====================================== */
export const updateTripStatusApi = async (tripId, status) => {
    try {
        const { data } = await axios.patch(
            `${server}admin/trips/${tripId}/status`,
            { status },
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        throw error.response?.data || { success: false, message: "Failed to update trip status." };
    }
};

/* ======================================
   Get All Users (Admin User Management)
====================================== */
export const getAllUsersApi = async (page = 1, limit = 10, search = "") => {
    try {
        const { data } = await axios.get(
            `${server}admin/users?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        throw error.response?.data || { success: false, message: "Failed to fetch users." };
    }
};

/* ======================================
   Get All Bookings (Admin Booking Oversight)
====================================== */
export const getAllBookingsApi = async (page = 1, limit = 10, search = "", status = "") => {
    try {
        const { data } = await axios.get(
            `${server}admin/bookings?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&status=${status}`,
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        throw error.response?.data || { success: false, message: "Failed to fetch bookings." };
    }
};

/* ======================================
   Get Admin Payment Logs & Revenue Stats
====================================== */
export const getAdminPaymentsApi = async (page = 1, limit = 10, search = "", status = "") => {
    try {
        const { data } = await axios.get(
            `${server}admin/payments?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&status=${status}`,
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        throw error.response?.data || { success: false, message: "Failed to fetch payment records." };
    }
};


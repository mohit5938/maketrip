import axios from "axios";
import { server } from "../constants/constant.js";

/* ======================================
   Get Trip Details For Booking
====================================== */

export const getBookingTripDetails = async (tripId) => {

    try {

        const { data } = await axios.get(

            `${server}trip/getTripById/${tripId}`,

            {
                withCredentials: true,
            }

        );

        return data;

    }

    catch (error) {

        throw (

            error.response?.data ||

            {

                success: false,

                message: "Failed to fetch trip details.",

            }

        );

    }

};



/* ======================================
   Join Trip
====================================== */

export const joinTrip = async (

    tripId,

    travelerData

) => {
    try {
        

        const { data } = await axios.post(

            `${server}booking/join/${tripId}`,

            travelerData,

            {

                withCredentials: true,

            }

        );

        return data;

    }

    catch (error) {
console.log(error)
        throw (

            error.response?.data ||

            {

                success: false,

                message: "Failed to join trip.",

            }

        );

    }

};




export const getBookingDetails = async (bookingId) => {

    const { data } = await axios.get(

        `${server}booking/${bookingId}`,

        {
            withCredentials: true
        }

    );

    return data;

};

/* ======================================
   Get My Bookings
====================================== */
export const getMyBookings = async () => {
    try {
        const { data } = await axios.get(
            `${server}booking/my-bookings`,
            {
                withCredentials: true,
            }
        );
        return data;
    } catch (error) {
        throw (
            error.response?.data || {
                success: false,
                message: "Failed to fetch bookings.",
            }
        );
    }
};

/* ======================================
   Cancel Booking
====================================== */
export const cancelBookingApi = async (bookingId, cancellationReason) => {
    try {
        const { data } = await axios.post(
            `${server}booking/cancel/${bookingId}`,
            { cancellationReason },
            {
                withCredentials: true,
            }
        );
        return data;
    } catch (error) {
        throw (
            error.response?.data || {
                success: false,
                message: "Failed to cancel booking.",
            }
        );
    }
};

/* ======================================
   Process Payment
====================================== */
export const processPaymentApi = async (bookingId, paymentData = {}) => {
    try {
        const { data } = await axios.post(
            `${server}booking/payment/${bookingId}`,
            paymentData,
            {
                withCredentials: true,
            }
        );
        return data;
    } catch (error) {
        throw (
            error.response?.data || {
                success: false,
                message: "Failed to process payment.",
            }
        );
    }
};

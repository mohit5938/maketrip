import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import HeroGallery from "../components/tripDetails/HeroGallery";
import TripHeader from "../components/tripDetails/TripHeader";
import HostCard from "../components/tripDetails/HostCard";
import QuickInfoCards from "../components/tripDetails/QuickInfoCards";
import AboutSection from "../components/tripDetails/AboutSection";
import HighlightsSection from "../components/tripDetails/HighlightsSection";
import IncludedExcluded from "../components/tripDetails/IncludedExcluded";
import AccommodationSection from "../components/tripDetails/AccommodationSection";
import JourneyTimeline from "../components/tripDetails/JourneyTimeline";
import BookingSidebar from "../components/tripDetails/BookingSidebar";
import ReviewsSection from "../components/tripDetails/ReviewsSection";
import TripDiscussionBoard from "../components/tripDetails/TripDiscussionBoard";
import MapSection from "../components/tripDetails/MapSection";
import SimilarTrips from "../components/tripDetails/SimilarTrips";
import MobileBookingBar from "../components/tripDetails/MobileBookingBar";

import { server } from "../constants/constant.js";

const TripDetails = () => {

  const { id } = useParams();

  const [trip, setTrip] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchTrip = async () => {

    try {

      const { data } = await axios.get(

        `${server}trip/getTripById/${id}`

      );

      setTrip(data.trip);

    }

    catch (error) {
      console.log(error);
    }

    finally {
      setLoading(false);
    }

  };

  useEffect(() => {

    fetchTrip();

  }, [id]);

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="w-14 h-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>

      </div>

    );

  }

  if (!trip) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h2 className="text-2xl font-bold">

          Trip Not Found

        </h2>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Hero Gallery */}

        <HeroGallery trip={trip} />

        {/* Header */}

        <TripHeader trip={trip} />

        {/* Host */}

        <HostCard trip={trip} />

        {/* Quick Info */}

        <QuickInfoCards trip={trip} />

        {/* Main Layout */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

          {/* Left Side */}

          <div className="lg:col-span-2 space-y-8">

            <AboutSection trip={trip} />

            <HighlightsSection trip={trip} />

            <IncludedExcluded trip={trip} />

            <AccommodationSection trip={trip} />

            <JourneyTimeline trip={trip} />

            <ReviewsSection trip={trip} />

            <TripDiscussionBoard trip={trip} />

            <MapSection trip={trip} />

          </div>

          {/* Right Side */}

          <BookingSidebar trip={trip} />

        </div>

        {/* Similar Trips */}

        <SimilarTrips
          currentTrip={trip}
        />

      </div>

      {/* Mobile Bottom Bar */}

      <MobileBookingBar trip={trip} />

    </div>

  );

};

export default TripDetails;
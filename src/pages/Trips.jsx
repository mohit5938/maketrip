import {
  ArrowLeft,
  ArrowRight,
  Filter as FilterIcon,
  Heart,
  Star,
  User,
  ChevronDown,
} from "lucide-react";
import axios from "axios";
import TripCardSkeleton from "../components/TripCardSkeleton.jsx"
import {server} from "../constants/constant.js"
import Pagination from "../components/Pagination.jsx"
import { useState , useEffect } from "react";
import { useSelector } from "react-redux";
import Filter from "../components/Filter.jsx"
import TripCard from "../components/TripCard.jsx"
import {
  useSearchParams,
} from "react-router-dom";
import { getUserWishlistIdsApi } from "../services/wishlistService.js";

const Trips = () => {
  const { user } = useSelector((state) => state.auth);
  const [trips, setTrips] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalTrips, setTotalTrips] = useState(0);
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (user) {
      getUserWishlistIdsApi().then((res) => {
        if (res.success) setWishlistIds(res.wishlistIds || []);
      });
    }
  }, [user]);
  const [filters, setFilters] = useState({
    destination: "",
    category: "",
    fromDate: "",
    toDate: "",
    travelers: "",
    budget: "",
    accommodation: [],
    sortBy: "Recommended",

  });



      const fetchTrips = async () => {
      try{
      setLoading(true);
      const { data } = await axios.get(
     `${server}trip/all-trips`,
    {

      params: {

        destination:
          filters.destination,

        category:
          filters.category,
        fromDate:
          filters.fromDate,
        toDate:
          filters.toDate,
        travelers:
          filters.travelers,

        budget:
          filters.budget,

        accommodation:
          filters.accommodation.join(","),

        sortBy:
          filters.sortBy,

        page,

        limit: 12,

       },

       }

        );

            setTrips(data.trips || []);
             setTotalPages(data.totalPages || 1);
           setTotalTrips(data.totalTrips || 0);  
        }
          catch(error){
             console.error(error);
        }
              finally{
                 setLoading(false);
              }
        };


  useEffect(() => {

    setFilters((prev) => ({

      ...prev,

      destination:
        searchParams.get("destination") || "",

      category:
        searchParams.get("category") || "",

      fromDate:
        searchParams.get("startDate") || "",

      travelers:
        Number(searchParams.get("travelers")) || 5,

    }));
    setPage(1);
  }, [searchParams]);

  
  const handleFilterSearch = () => {

    setShowFilter(false);

    if (page !== 1) {

      setPage(1);

    } else {

      fetchTrips();

    }

  };
  

 useEffect(() => {
    fetchTrips();
  }, 
  [
    
      page,

      filters.destination,

      filters.category,

     

      filters.fromDate,

      filters.toDate,

      filters.travelers,

      filters.budget,

      filters.sortBy,

      filters.accommodation
    
  ]) 




  
  return (

  
    <div className="min-h-screen bg-white">

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Breadcrumb */}

        <div className="flex items-center gap-2 text-gray-400">

          <span>
            Home
          </span>

          <span>
            ›
          </span>

          <span className="text-pink-500">
            All Trips
          </span>

        </div>

        {/* Heading */}

        <div
          className="
                    mt-6
                    flex
                    flex-col
                    lg:flex-row
                    justify-between
                    gap-8
                    "
        >

          <div>

            <h1
              className="
                        text-3xl
                        sm:text-4xl
                        lg:text-5xl
                        xl:text-6xl
                        font-bold
                         max-w-4xl
                         leading-tight
                            "
            >
              Find your next big trip
              adventure, hosted by
              experts
            </h1>

            <p
              className="
                            text-gray-500
                            mt-4
                            text-lg
                            "
            >
              Discover your next
              big adventure,
              hosted by experts
            </p>

          </div>

          {/* Arrow Buttons */}


        </div>

        {/* Filter Row */}

      
        <div
          className="mt-10 flex flex-col sm:flex-row sm:justify-end gap-4 relative"
        >

          {/* Filter Button */}

          <button
            onClick={() =>
              setShowFilter(true)
            }
            className="group w-full sm:w-auto px-5 
            sm:px-7 py-4 bg-white rounded-2xl  border border-slate-200 shadow-sm  hover:shadow-lg hover:border-pink-300
             transition-all duration-300 flex items-center justify-center gap-3"
          >

            <div
              className="
    w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center group-hover:bg-pink-500 transition
    "
            >

              <FilterIcon
                size={18}
                className=" text-pink-500 group-hover:text-white  "
              />

            </div>

            <span
              className="
    font-medium
    text-slate-700
    "
            >
              Filter Search
            </span>

          </button>

          <Filter
            isOpen={showFilter}
            onClose={() =>
              setShowFilter(false)
            }
            filters={filters}
            setFilters={setFilters}
            onApply={handleFilterSearch}
          />

        </div>
            
        

        <div
          className="  mt-16  grid  grid-cols-1  md:grid-cols-2  xl:grid-cols-4 gap-8 "
        >
          {
            loading ? 
              Array.from({ length: 8 }).map((_, index) => (

                <TripCardSkeleton
                  key={index}
                />

              ))
             : (
              trips.map((trip) => (
                <TripCard 
                  key={trip.id} 
                  trip={trip}
                  initialWishlistIds={wishlistIds}
                 />
              ))
            )
          }

        </div>

        <Pagination

          page={page}

          totalPages={totalPages}

          onChange={setPage}

        />

      </div>

    </div>

  );

};

export default Trips;
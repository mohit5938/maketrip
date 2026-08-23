
import {
    Search,
    MapPin,
    Calendar,
    Users,
} from "lucide-react";

import DestinationSection from "../components/DestinationSection.jsx"
import { useState } from "react";
import Navbar from "../components/Navbar.jsx"
import AdventureSection from "../components/AdventureSection.jsx"
import HowItWorks from "../components/HowItWorks.jsx"
import HomeAITravelPlanner from "../components/home/HomeAITravelPlanner.jsx"
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({

        destination: "",

        date: "",

        travelers: "",

    });
    const handleSearch = () => {

        const params =  new URLSearchParams();

        if (searchData.destination)
            params.append(
                "destination",
                searchData.destination
            );

        if (searchData.date)
            params.append(
                "startDate",
                searchData.date
            );

        if (searchData.travelers)
            params.append(
                "travelers",
                searchData.travelers
            );

        navigate(
            `/trips?${params.toString()}`
        );

    };
    return (
        <div className="bg-slate-50 min-h-screen">
            <Navbar />
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 py-8">
                <div
                    className="relative overflow-hidden rounded-[40px] min-h-[750px] bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070')",
                    }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-transparent"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 py-16">
                        {/* Left Content */}
                        <div className="max-w-2xl">
                            <span className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-medium">
                                🌍 Explore The World Together
                            </span>

                            <h1 className="mt-6 text-5xl md:text-7xl font-black leading-tight">
                                Discover
                                <br />
                                <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                                    Group Adventures
                                </span>
                                <br />
                                Near You
                            </h1>

                            <p className="mt-6 text-lg text-slate-600 max-w-xl">
                                Join exciting trips hosted by passionate
                                travelers. Meet new people, share
                                experiences, split expenses and create
                                unforgettable memories.
                            </p>

                            {/* Features */}
                            <div className="flex flex-wrap gap-4 mt-8">
                                <div className="bg-white/80 backdrop-blur-md px-4 py-3 rounded-xl shadow">
                                    🤝 Meet Travelers
                                </div>

                                <div className="bg-white/80 backdrop-blur-md px-4 py-3 rounded-xl shadow">
                                    💸 Shared Expenses
                                </div>

                                <div className="bg-white/80 backdrop-blur-md px-4 py-3 rounded-xl shadow">
                                    ✈️ Verified Hosts
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="flex flex-wrap gap-4 mt-10">
                                <button 
                                onClick={() => navigate('/trips')}
                                
                                className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition">
                                    Explore Trips
                                </button>

                                <button className="px-8 py-4 rounded-xl bg-white border border-slate-200 font-semibold hover:bg-slate-100">
                                    Become Host
                                </button>
                            </div>
                        </div>

                       
                    </div>

                    {/* Search Box */}
                    <div className="relative z-20 px-4 mb-2 lg:px-0">
                        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-4 lg:p-6 lg:-mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Destination */}
                                <div className="flex items-center gap-3 border rounded-xl p-4">
                                    <MapPin className="text-violet-600" />
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Destination
                                        </p>
                                        <input
                                            type="text"
                                            placeholder="Goa, Manali..."
                                            className="outline-none w-full"
                                            value={searchData.destination}
                                            onChange={(e) =>
                                                setSearchData(prev => ({

                                                    ...prev,

                                                    destination: e.target.value,

                                                }))
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="flex items-center gap-3 border rounded-xl p-4">
                                    <Calendar className="text-pink-500" />
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Date
                                        </p>
                                        <input
                                            type="date"
                                            className="outline-none w-full"
                                            value={searchData.date}
                                            onChange={(e) =>
                                                setSearchData(prev => ({

                                                    ...prev,

                                                    date: e.target.value,

                                                }))
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Travelers */}
                                <div className="flex items-center gap-3 border rounded-xl p-4">
                                    <Users className="text-orange-500" />
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Travelers
                                        </p>
                                        <select 
                                            value={searchData.travelers}
                                            onChange={(e) =>
                                                setSearchData(prev => ({

                                                    ...prev,

                                                    travelers: e.target.value,

                                                }))
                                            }
                                        className="outline-none w-full bg-transparent">
                                            <option>Any</option>
                                            <option>1-5</option>
                                            <option>5-10</option>
                                            <option>10+</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Search Button */}
                                <button 
                                    onClick={handleSearch}
                                className="bg-gradient-to-r from-violet-600 to-pink-500 text-white rounded-xl flex items-center justify-center gap-2 font-semibold hover:scale-105 transition">
                                    <Search size={20} />
                                    Search Trips
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <AdventureSection />
            </section>
            <section>
                <HomeAITravelPlanner />
            </section>
            <section>
                <DestinationSection />
            </section>
            <section>
                <HowItWorks />
            </section>
        </div>
    );
};

export default Home;
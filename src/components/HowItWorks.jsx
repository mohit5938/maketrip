import { useNavigate } from "react-router-dom";

const steps = [
    {
        id: 1,
        title: "Find A Trip",
        description:
            "Discover exciting trips across Goa, Ladakh, Manali, Kerala and more hosted by verified travelers.",
        image:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200",
    },

    {
        id: 2,
        title: "Join The Group",
        description:
            "Connect with like-minded travelers, reserve your seat and get ready for an unforgettable journey.",
        image:
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200",
    },

    {
        id: 3,
        title: "Explore India Together",
        description:
            "Travel together, share experiences, make new friends and create lifelong memories.",
        image:
            "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1200",
    },
];

const HowItWorks = () => {

    const navigate = useNavigate();

    return (

        <section className="py-16 md:py-24 bg-slate-50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}

                <div className="text-center mb-12 md:mb-16">

                    <p className="text-pink-500 text-base md:text-lg font-medium">
                        How JoinTrip Works
                    </p>

                    <h2
                        className="
                        mt-4
                        text-3xl
                        sm:text-4xl
                        md:text-5xl
                        lg:text-6xl
                        font-black
                        leading-tight
                        "
                    >
                        3 Steps To Start
                        <br />
                        Your Next Adventure
                    </h2>

                </div>

                {/* Cards */}

                <div
                    className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-8
                    lg:gap-10
                    "
                >

                    {steps.map((step) => (

                        <div
                            key={step.id}
                            className="group"
                        >

                            {/* Image */}

                            <div className="flex justify-center mb-6">

                                <img
                                    src={step.image}
                                    alt={step.title}
                                    className="
                                    w-full
                                    h-56
                                    sm:h-64
                                    md:h-72
                                    object-cover
                                    rounded-3xl
                                    shadow-xl
                                    group-hover:scale-105
                                    transition
                                    duration-500
                                    "
                                />

                            </div>

                            {/* Content Card */}

                            <div
                                className="
                                bg-white
                                rounded-3xl
                                shadow-lg
                                p-6
                                md:p-8
                                min-h-[220px]
                                relative
                                overflow-hidden
                                "
                            >

                                {/* Big Number */}

                                <span
                                    className="
                                    absolute
                                    left-4
                                    top-2
                                    text-6xl
                                    md:text-8xl
                                    font-black
                                    text-gray-100
                                    "
                                >
                                    {step.id}
                                </span>

                                <div className="relative z-10">

                                    <h3
                                        className="
                                        text-xl
                                        md:text-2xl
                                        font-bold
                                        mb-3
                                        "
                                    >
                                        {step.title}
                                    </h3>

                                    <p
                                        className="
                                        text-gray-600
                                        text-base
                                        md:text-lg
                                        leading-relaxed
                                        "
                                    >
                                        {step.description}
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* CTA */}

                <div className="flex justify-center mt-12 md:mt-16">

                    <button
                        onClick={() => navigate("/trips")}
                        className="
                        w-full
                        sm:w-auto
                        px-8
                        md:px-12
                        py-4
                        md:py-5
                        rounded-full
                        bg-gradient-to-r
                        from-pink-500
                        to-rose-500
                        text-white
                        font-bold
                        text-base
                        md:text-lg
                        shadow-lg
                        hover:scale-105
                        transition
                        duration-300
                        "
                    >
                        Start Your Next Adventure
                    </button>

                </div>

            </div>

        </section>

    );

};

export default HowItWorks;
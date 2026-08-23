import { useNavigate } from "react-router-dom";

const AdventureSection = () => {

    const adventureCategories = [

        {
            name: "Food",
            icon: "🍱",
            slug: "food"
        },

        {
            name: "Wellness",
            icon: "🧘‍♀️",
            slug: "wellness"
        },

        {
            name: "Beach",
            icon: "🏝️",
            slug: "beach"
        },

        {
            name: "Culture",
            icon: "🏛️",
            slug: "culture"
        },

        {
            name: "Party",
            icon: "🕺",
            slug: "party"
        },

        {
            name: "Adventure",
            icon: "🏂",
            slug: "adventure"
        },

        {
            name: "Nature",
            icon: "⛰️",
            slug: "nature"
        },

        {
            name: "City",
            icon: "🗽",
            slug: "city"
        },

        {
            name: "Backpacking",
            icon: "🎒",
            slug: "backpacking"
        },

        {
            name: "Female Only",
            icon: "🙋‍♀️",
            slug: "female_only"
        }

    ];

    const navigate = useNavigate();

    const handleCategoryClick = (slug) => {

            navigate(

                `/trips?category=${slug}`

            );

        };

    return (

        <section
            className="
            max-w-7xl
            mx-auto
            px-4
            py-24
            "
        >

            <div
                className="
                text-center
                mb-16
                "
            >

                <p
                    className="
                    text-pink-500
                    text-xl
                    "
                >
                    Explore something special
                </p>

                <h2
                    className="
                    text-5xl
                    font-bold
                    mt-4
                    "
                >
                    Find your next adventure
                </h2>

            </div>

            <div
                className="
                grid
                grid-cols-2
                md:grid-cols-3
                lg:grid-cols-5
                gap-8
                "
            >

                {
                    adventureCategories.map(

                        (item) => (

                            <div

                                key={
                                    item.slug
                                }

                                onClick={() =>
                                    handleCategoryClick(
                                        item.slug
                                    )
                                }

                                className="
                                bg-white
                                rounded-3xl
                                shadow-md
                                border
                                p-8
                                text-center
                                cursor-pointer
                                hover:shadow-xl
                                hover:-translate-y-2
                                transition
                                duration-300
                                "
                            >

                                <div
                                    className="
                                    text-6xl
                                    mb-5
                                    "
                                >
                                    {
                                        item.icon
                                    }
                                </div>

                                <h3
                                    className="
                                    font-semibold
                                    text-xl
                                    "
                                >
                                    {
                                        item.name
                                    }
                                </h3>

                            </div>

                        )

                    )
                }

            </div>

        </section>

    );

};

export default AdventureSection;
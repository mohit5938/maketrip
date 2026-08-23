import {
    CalendarDays,
    Users,
    Wallet,
    Clock3,
  
    Mountain,
} from "lucide-react";

const QuickInfoCards = ({ trip }) => {

    const formatDate = (date) => {

        return new Date(date).toLocaleDateString(

            "en-IN",

            {

                day: "numeric",

                month: "short",

                year: "numeric",

            }

        );

    };

    const totalDays =
        Math.max(
            1,
            Math.ceil(
                (
                    new Date(trip?.end_date) -
                    new Date(trip?.start_date)
                ) /
                (1000 * 60 * 60 * 24)
            ) + 1
        );
        
    const seatsLeft = Math.max(
        (trip?.travelers_limit ?? 0) -
        (trip?.current_bookings ?? 0),
        0
    );

    const cards = [

        {

            icon: CalendarDays,

            title: "Trip Dates",

            value:

                `${formatDate(

                    trip?.start_date

                )} - ${formatDate(

                    trip?.end_date

                )}`,

            color:

                "text-pink-500",

            bg:

                "bg-pink-100",

        },

        {

            icon: Users,

            title: "Seats Left",

            value:

                `${seatsLeft}/${trip?.travelers_limit}`,

            color:

                "text-blue-600",

            bg:

                "bg-blue-100",

        },

        {

            icon: Wallet,

            title: "Price",

            value:

                `₹${trip?.price_per_person}/Person`,

            color:

                "text-green-600",

            bg:

                "bg-green-100",

        },

        {

            icon: Clock3,

            title: "Duration",

            value:

                `${totalDays} Days`,

            color:

                "text-orange-500",

            bg:

                "bg-orange-100",

        },

      

        {

            icon: Mountain,

            title: "Category",

            value:

                trip?.category,

            color:

                "text-rose-600",

            bg:

                "bg-rose-100",

        },

    ];

    return (

        <section className="mt-10">

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                {

                    cards.map(

                        (

                            item,

                            index

                        ) => (

                            <div

                                key={index}

                                className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition"

                            >

                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg}`}>

                                    <item.icon

                                        size={26}

                                        className={item.color}

                                    />

                                </div>

                                <p className="mt-6 text-gray-500 text-sm">

                                    {item.title}

                                </p>

                                <h3 className="mt-2 text-xl font-bold break-words">

                                    {item.value}

                                </h3>

                            </div>

                        ) ) }
            </div>
        </section>

    );
};

export default QuickInfoCards;
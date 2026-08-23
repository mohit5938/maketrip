import {
    X,
    LayoutDashboard,
    Map,
    Users,
    CalendarDays,
    CreditCard,
    Settings,
    UserCheck
} from "lucide-react";

import {
    NavLink
} from "react-router-dom";

const AdminSidebar = ({
    sidebarOpen,
    setSidebarOpen,
}) => {

    const menu = [

        {
            name: "Dashboard",
            path: "/admin",
            icon: LayoutDashboard,
        },

        {
            name: "Pending Trips",
            path:
                "/admin/pending-trips",
            icon: Map,
        },

        {
            name: "Pending Hosts",
            path: "/admin/pending-hosts",
            icon: UserCheck,
        },

        {
            name: "Users",
            path:
                "/admin/users",
            icon: Users,
        },

        {
            name: "Bookings",
            path:
                "/admin/bookings",
            icon: CalendarDays,
        },

        {
            name: "Payments",
            path:
                "/admin/payments",
            icon: CreditCard,
        },

        {
            name: "Settings",
            path:
                "/admin/settings",
            icon: Settings,
        },

    ];

    return (

        <>

            {/* Overlay */}

            {sidebarOpen && (

                <div
                    onClick={() =>
                        setSidebarOpen(
                            false
                        )
                    }
                    className="
          fixed
          inset-0
          bg-black/40
          z-40
          lg:hidden
        "
                />

            )}

            {/* Sidebar */}

            <aside

                className={`
        fixed
        top-0
        left-0
        h-full
        w-72
        bg-white
        border-r
        z-50
        transition-transform
        duration-300

        ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }

        lg:translate-x-0
      `}

            >

                <div
                    className="
          flex
          justify-between
          items-center
          p-5
          border-b
        "
                >

                    <NavLink
                        to="/"
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center gap-2"
                    >
                        <h2
                            className="
            text-2xl
            font-bold
            text-pink-500
            hover:text-pink-600
            transition-colors
        "
                        >
                            JoinTrip
                        </h2>
                    </NavLink>

                    <button
                        onClick={() =>
                            setSidebarOpen(
                                false
                            )
                        }
                        className="
            lg:hidden
          "
                    >

                        <X size={22} />

                    </button>

                </div>

                <nav className="p-4 space-y-1">
                    {menu.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/admin"}
                                onClick={() => setSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                                        isActive
                                            ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                                            : "text-slate-600 hover:bg-purple-50 hover:text-purple-700"
                                    }`
                                }
                            >
                                <Icon size={20} />
                                <span>{item.name}</span>
                            </NavLink>
                        );
                    })}
                </nav>

            </aside>

        </>

    );

};

export default AdminSidebar;
import { Menu } from "lucide-react";

const AdminHeader = ({
    setSidebarOpen,
}) => {

    return (

        <header
            className="
      bg-white
      border-b
      px-4
      py-4
      flex
      items-center
      justify-between
    "
        >

            <button
                onClick={() =>
                    setSidebarOpen(
                        true
                    )
                }
                className="
        lg:hidden
        block
      "
            >

                <Menu size={26} />

            </button>

            <h1
                className="
        text-xl
        font-bold
      "
            >
                Admin Panel
            </h1>

        </header>

    );

};

export default AdminHeader;
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Pagination = ({
  page,
  totalPages,
  onChange,
}) => {

  const getPages = () => {

    const pages = [];

    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);

    if (page <= 3) {
      end = Math.min(5, totalPages);
    }

    if (page >= totalPages - 2) {
      start = Math.max(1, totalPages - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;

  };

  return (

    <div className="mt-14 flex flex-col items-center gap-5">

      {/* Page Info */}

      <p className="text-sm text-gray-500">

        Page

        <span className="font-semibold text-pink-500">
          {" "}{page}{" "}
        </span>

        of

        <span className="font-semibold text-pink-500">
          {" "}{totalPages}
        </span>

      </p>

      {/* Pagination */}

      <div
        className="
                flex
                items-center
                justify-center
                gap-2

                flex-wrap
                "
      >

        {/* Previous */}

        <button

          onClick={() =>
            onChange(page - 1)
          }

          disabled={page === 1}

          className="
                    flex
                    items-center
                    justify-center
                    gap-2

                    h-10
                    sm:h-11

                    px-3
                    sm:px-5

                    rounded-xl

                    border

                    border-slate-200

                    bg-white

                    shadow-sm

                    hover:bg-pink-500
                    hover:text-white
                    hover:border-pink-500

                    transition-all

                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    "
        >

          <ChevronLeft size={18} />

          <span className="hidden sm:block">
            Prev
          </span>

        </button>

        {/* Numbers */}

        {

          getPages().map((number) => (

            <button

              key={number}

              onClick={() =>
                onChange(number)
              }

              className={`
                            w-10
                            h-10

                            sm:w-11
                            sm:h-11

                            rounded-xl

                            text-sm
                            sm:text-base

                            font-semibold

                            transition-all

                            ${page === number

                  ?

                  "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"

                  :

                  "bg-white border border-slate-200 hover:bg-pink-50 hover:border-pink-400"
                }
                            `}
            >

              {number}

            </button>

          ))

        }

        {/* Next */}

        <button

          onClick={() =>
            onChange(page + 1)
          }

          disabled={page === totalPages}

          className="
                    flex
                    items-center
                    justify-center
                    gap-2

                    h-10
                    sm:h-11

                    px-3
                    sm:px-5

                    rounded-xl

                    border

                    border-slate-200

                    bg-white

                    shadow-sm

                    hover:bg-pink-500
                    hover:text-white
                    hover:border-pink-500

                    transition-all

                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    "
        >

          <span className="hidden sm:block">
            Next
          </span>

          <ChevronRight size={18} />

        </button>

      </div>

    </div>

  );

};

export default Pagination;
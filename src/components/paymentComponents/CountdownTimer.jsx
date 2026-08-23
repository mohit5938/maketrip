import { useEffect, useMemo, useState } from "react";
import { Clock3 } from "lucide-react";

const CountdownTimer = ({ expiresAt, onExpire }) => {

    const calculateTimeLeft = () => {

        const difference = new Date(expiresAt).getTime() - Date.now();

        if (difference <= 0) {

            return 0;

        }

        return difference;

    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {

        const interval = setInterval(() => {

            const remaining = calculateTimeLeft();

            setTimeLeft(remaining);

            if (remaining <= 0) {

                clearInterval(interval);

                onExpire?.();

            }

        }, 1000);

        return () => clearInterval(interval);

    }, [expiresAt]);

    const { minutes, seconds } = useMemo(() => {

        const totalSeconds = Math.floor(timeLeft / 1000);

        return {

            minutes: Math.floor(totalSeconds / 60),

            seconds: totalSeconds % 60,

        };

    }, [timeLeft]);

    const isExpired = timeLeft <= 0;

    const isWarning = timeLeft > 0 && timeLeft <= 5 * 60 * 1000;

    if (isExpired) {

        return (

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-100 text-red-600 font-semibold">

                <Clock3 size={18} />

                Expired

            </div>

        );

    }

    return (

        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl font-semibold ${isWarning ? "bg-red-100 text-red-600 animate-pulse" : "bg-green-100 text-green-700"}`}>

            <Clock3 size={18} />

            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}

        </div>

    );

};

export default CountdownTimer;
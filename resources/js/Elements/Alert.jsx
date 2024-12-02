import { useEffect, useState } from "react";

export default function Alert({ type, message }) {
    const [visible, setVisible] = useState(true);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const fadeOutTimer = setTimeout(() => {
            setOpacity(0); // Start fade-out animation
        }, 2700); // Fade out shortly before the 3-second mark

        const hideTimer = setTimeout(() => {
            setVisible(false); // Remove alert after fade-out
        }, 3000);

        return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    if (!visible) return null;

    // Dynamic styles and icons
    const typeConfig = {
        success: {
            bgColor: "bg-green-400",
            textColor: "text-white",
            icon: "/assets/images/check.png",
        },
        error: {
            bgColor: "bg-red-400",
            textColor: "text-white",
            icon: "/assets/images/cross.png",
        },
        neutral: {
            bgColor: "bg-gray-400",
            textColor: "text-white",
            icon: "",
        },
    };

    const { bgColor, textColor, icon } = typeConfig[type] || typeConfig.neutral;

    return (
        <div
            className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 pr-5 max-w-[300px] pl-3 py-2 rounded shadow-md flex items-center space-x-2 ${bgColor} transition-opacity duration-300`}
            fixed
            style={{ opacity }}
        >
            {icon && (
                <span className={`font-bold ${textColor}`}>
                    <img src={icon} alt={icon} className="h-full w-auto" />
                </span>
            )}
            <p className={textColor}>{message}</p>
        </div>
    );
}

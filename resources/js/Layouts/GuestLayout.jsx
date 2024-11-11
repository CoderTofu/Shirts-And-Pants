import { Link } from "@inertiajs/react";
import Navbar from "../Elements/Navbar";

export default function GuestLayout({ children }) {
    return (
        <>
            <Navbar />
            <div className="flex h-5/6 flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
                <div className="w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                    {children}
                </div>
            </div>
        </>
    );
}

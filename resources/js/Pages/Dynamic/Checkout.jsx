import Navbar from "../../Elements/Navbar";
import { Head } from "@inertiajs/react";

const order = [
    {
        name: "PRODUCT NAME 1",
        size: "XS",
        image: "/placeholder.svg",
        quantity: 1,
    },
    {
        name: "PRODUCT NAME 2",
        size: "XS",
        image: "/placeholder.svg",
        quantity: 2,
    },
    {
        name: "PRODUCT NAME 3",
        size: "XS",
        image: "/placeholder.svg",
        quantity: 3,
    },
    {
        name: "PRODUCT NAME 4",
        size: "XS",
        image: "/placeholder.svg",
        quantity: 4,
    },
];

export default function Checkout({ order }) {
    return (
        <>
            <Head title="Checkout" />
            <Navbar />
            <main className="py-[50px] px-[100px]">
                <div className="w-full flex flex-col justify-center items-center">
                    <h1 className="albert-sans text-3xl font-bold">
                        Order Checkout
                    </h1>
                </div>

                {/* Address */}
                <div></div>

                {/* Products */}
                <div></div>

                {/* Info and confirm button */}
                <div></div>
            </main>
        </>
    );
}

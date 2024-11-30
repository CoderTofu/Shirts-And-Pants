import Navbar from "../../Elements/Navbar";
import { Head } from "@inertiajs/react";

const tempOrder = [
    {
        name: "PRODUCT NAME 1",
        size: "XS",
        image: "/placeholder.svg",
        quantity: 1,
        price: 100,
    },
    {
        name: "PRODUCT NAME 2",
        size: "XS",
        image: "/placeholder.svg",
        quantity: 2,
        price: 300,
    },
    {
        name: "PRODUCT NAME 3",
        size: "XS",
        image: "/assets/products/SAP Angel Sweatshirt.png",
        quantity: 3,
        price: 500,
    },
    {
        name: "PRODUCT NAME 4",
        size: "XS",
        image: "/placeholder.svg",
        quantity: 4,
        price: 800,
    },
];

const user = {
    address:
        "Gen. Luna corner Muralla St., Intramuros Manila, Philippines 1002",
};

export default function Checkout({ order }) {
    const shippingFee = 50;

    const estimatedDeliveryDate = new Date();
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 3);
    const deliveryStart = estimatedDeliveryDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
    });

    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 4);
    const deliveryEnd = estimatedDeliveryDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
    });

    return (
        <>
            <Head title="Checkout" />
            <Navbar />
            <main className="py-[50px] px-[100px] albert-sans">
                <div className="w-full flex flex-col justify-center items-center">
                    <h1 className="albert-sans text-3xl font-bold">
                        Order Checkout
                    </h1>
                </div>

                {/* Address */}
                <div className="bg-customGray border border-black py-7 px-12 mt-10">
                    <h2 className="text-2xl font-bold">Delivery Address</h2>
                    <h3 className="text-lg font-light">{user.address}</h3>
                </div>

                {/* Products */}
                <div className="mt-10">
                    <div className="grid grid-cols-5 border-b border-black pb-5">
                        <div className="col-span-2"></div>
                        <div className="text-center text-xl text-gray-500">
                            Quantity
                        </div>
                        <div className="text-center text-xl text-gray-500">
                            Unit Price
                        </div>
                        <div className="text-center text-xl text-gray-500">
                            Total
                        </div>
                    </div>
                    <div>
                        {tempOrder.map((product) => (
                            <div className="grid grid-cols-5 items-center border-b border-black">
                                <div className="col-span-2 flex items-center py-4 px-10">
                                    <img
                                        src={product.image}
                                        alt="Product Image"
                                        className="w-[200px] h-[200px] object-cover mr-5"
                                    />
                                    <div>
                                        <h3 className="text-xl font-bold">
                                            {product.name}
                                        </h3>
                                        <h4 className="text-gray-500 text-sm font-base">
                                            {product.size}
                                        </h4>
                                    </div>
                                </div>
                                <div className="text-center">
                                    {product.quantity}
                                </div>
                                <div className="text-center">
                                    P {product.price.toFixed(2)}
                                </div>
                                <div className="text-center">
                                    P{" "}
                                    {(product.quantity * product.price).toFixed(
                                        2
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info and confirm button */}
                <div className="">
                    <div></div>

                    <div className="flex items-center">
                        <h3 className="text-3xl font-bold mr-2">
                            Estimated Delivery:
                        </h3>
                        <h4 className="text-2xl text-gray-500">
                            {deliveryStart} - {deliveryEnd}
                        </h4>
                    </div>

                    <div>
                        <div className="flex items-center ">
                            <h3 className="text-3xl font-bold mr-2">
                                Merchandise Subtotal:
                            </h3>
                            <h4 className="text-2xl text-gray-500">
                                P{" "}
                                {tempOrder
                                    .reduce(
                                        (total, product) =>
                                            total +
                                            product.quantity * product.price,
                                        0
                                    )
                                    .toFixed(2)}
                            </h4>
                        </div>
                        <div className="flex items-center ">
                            <h3 className="text-3xl font-bold mr-2">
                                Shipping Subtotal:
                            </h3>
                            <h4 className="text-2xl text-gray-500">
                                P {shippingFee.toFixed(2)}
                            </h4>
                        </div>
                    </div>

                    <div className="flex justify-between mt-10 mx-20">
                        <div className="flex items-center ">
                            <h3 className="text-3xl font-bold mr-2">
                                Total Payment:
                            </h3>
                            <h4 className="text-2xl text-gray-500">
                                P{" "}
                                {(
                                    tempOrder.reduce(
                                        (total, product) =>
                                            total +
                                            product.quantity * product.price,
                                        0
                                    ) + shippingFee
                                ).toFixed(2)}
                            </h4>
                        </div>
                        <button className="bg-black text-white px-5 py-2 rounded-lg">
                            Confirm Order
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}

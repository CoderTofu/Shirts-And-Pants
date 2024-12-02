import Navbar from "../../Elements/Navbar";
import { Head, usePage, useForm } from "@inertiajs/react";

export default function Checkout({ orders }) {
    console.log(orders);
    const items = orders.selected_items;
    const shippingFee = 50;
    const user = usePage().props.auth.user;
    const total_price = Number(orders.total_price);
    const { data, setData, post, processing } = useForm({
        selected_items: items,
        total_price: total_price + shippingFee,
    });

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
            <main className="py-[50px] px-[200px] albert-sans">
                <div className="w-full flex flex-col justify-center items-center">
                    <h1 className="albert-sans text-5xl font-bold">
                        Order Checkout
                    </h1>
                </div>

                {/* Address */}
                <div className="bg-customGray border border-black py-7 px-12 mt-10">
                    <h2 className="text-xl font-bold text-customGray">
                        Delivery Address
                    </h2>
                    <h3 className="text-lg ">{user.address}</h3>
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
                        {items.map((item) => (
                            <div className="grid grid-cols-5 items-center border-b border-black">
                                <div className="col-span-2 flex items-center py-4 px-10">
                                    <img
                                        src={`/assets/products/${item.display_image}`}
                                        alt="Product Image"
                                        className="w-[200px] h-[200px] object-cover mr-5"
                                    />
                                    <div>
                                        <h3 className="text-xl font-bold">
                                            {item.product.name}
                                        </h3>
                                        <h4 className="text-gray-500 text-sm font-base">
                                            {item.product.sizes.find(
                                                (size) =>
                                                    size.size ===
                                                    item.product
                                                        .variant_id_on_cart
                                            )}
                                        </h4>
                                    </div>
                                </div>
                                <div className="text-center">
                                    {item.quantity}
                                </div>
                                <div className="text-center">
                                    P {Number(item.product.price).toFixed(2)}
                                </div>
                                <div className="text-center">
                                    P{" "}
                                    {(
                                        Number(item.quantity) *
                                        Number(item.product.price)
                                    ).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col w-full mt-10">
                    <h3 className="text-3xl font-bold mr-2 text-customGray">
                        Shipping Details: Standard Local
                    </h3>
                    <h4 className="text-lg text-gray-500 ">
                        Guaranteed to get by {deliveryStart} - {deliveryEnd}
                    </h4>
                </div>

                <div className="flex justify-center">
                    <div className="grid grid-cols-3 w-[70vw] p-10 m-10 border border-black gap-1">
                        {/* Merchandise Subtotal */}
                        <div className="col-span-2 ">
                            <h3 className="text-2xl mr-2 ">
                                Merchandise Subtotal:
                            </h3>
                        </div>
                        <div className="col-span-1 text-center">
                            <h4 className="text-2xl text-gray-500">
                                P {total_price.toFixed(2)}
                            </h4>
                        </div>

                        {/* Shipping Subtotal */}
                        <div className="col-span-2 ">
                            <h3 className="text-2xl mr-2">
                                Shipping Subtotal:
                            </h3>
                        </div>
                        <div className="col-span-1 text-center">
                            <h4 className="text-2xl text-gray-500">
                                P {shippingFee.toFixed(2)}
                            </h4>
                        </div>

                        <div className="border-b border-black w-full col-span-3 my-3"></div>

                        {/* Total */}
                        <div className="col-span-2 mt-">
                            <h3 className="text-2xl  mr-2">Total Payment:</h3>
                        </div>
                        <div className="col-span-1 text-center">
                            <h4 className="text-2xl text-gray-500">
                                P {(total_price + shippingFee).toFixed(2)}
                            </h4>
                        </div>

                        {/* Place Order */}
                        <div className="col-span-2 "></div>
                        <div className="col-span-1 rounded-xl flex justify-center mt-2 bg-gray-700 transition-all hover:bg-gray-900">
                            <button
                                className="w-full text-white px-12 py-2 rounded-lg text-xl "
                                onClick={() => post("/shopping-cart/confirm")}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

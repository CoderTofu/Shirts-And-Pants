import { Head, useForm } from "@inertiajs/react";
import Navbar from "@/Elements/Navbar";
import ShoppingCartItem from "./ShoppingCartItem";
import PrimaryButton from "@/Elements/PrimaryButton";
import { useEffect, useState } from "react";
import Order from "./Order";

/* 
    Cart = {
        cart_id: number
        cart_items: CartItem[],
        total_price: number
    }

    CartItem = {
        product: Product
        variant_id_on_cart: number
        quantity: number
        stock: number
    }

   Product = {
        id: number
        name: string
        description: string
        display_image: Image
        price: number
        gender: enum ('M', 'F', 'Unisex')
        type: enum ('shirt', 'pants')
        sizes: Variant[]
        images: string[]
    }

    Variant = {
        variant_id: number
        size: string
        stock: number
    }
*/

const dummyUser = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "081234567890",
    address: "1234 Main St, Suburb, City",
};

const orders = [
    {
        id: "XXXX",
        date: "29 Sep, 2024 at 8:19 PM",
        customer: "John Doe",
        products: [
            {
                name: "PRODUCT NAME",
                size: "XS",
                image: "/placeholder.svg",
                quantity: 1,
            },
        ],
        total: 200,
        courier: "J&T Express",
        status: "Cancelled",
    },
    {
        id: "XXXX",
        date: "11 Nov, 2024 at 3:24 PM",
        customer: "John Doe",
        products: [
            {
                name: "PRODUCT NAME",
                size: "XS",
                image: "/placeholder.svg",
                quantity: 2,
            },
        ],
        total: 600,
        courier: "J&T Express",
        status: "To ship",
    },
    {
        id: "XXXX",
        date: "07 Nov, 2024 at 10:39 AM",
        customer: "John Doe",
        products: [
            {
                name: "PRODUCT NAME",
                size: "XS",
                image: "/placeholder.svg",
                quantity: 2,
            },
        ],
        total: 400,
        courier: "J&T Express",
        status: "Completed",
    },
];

export default function ShoppingCart({ cart }) {
    let [tab, setTab] = useState("Cart");

    let [selected, setSelected] = useState([]);
    let [total_price, setTotal] = useState(0);
    const { data, setData, post, processing } = useForm({
        id: cart.id,
        total_price: total_price,
    }); // for checkout
    const [visibleOrder, setVisibleOrder] = useState(null);

    const toggleDetails = (index) => {
        setVisibleOrder(visibleOrder === index ? null : index);
    };
    useEffect(() => {
        let newTotal = 0;
        for (const item of selected) {
            newTotal += parseFloat(item.product.price * item.quantity);
        }
        setTotal(newTotal);
    }, [selected]);

    return (
        <>
            <Head title="Shopping Cart" />
            <Navbar />
            {/* Top Part */}
            <main className="py-[50px] px-[100px]">
                <div className="w-full flex flex-col justify-center items-center">
                    <h1 className="albert-sans text-3xl font-bold">
                        Your Shopping Cart
                    </h1>
                    <h4 className="albert-sans text-base font-light mt-1">
                        Total Items: ({cart.cart_items.length})
                    </h4>
                </div>

                {/* Content */}
                <div className="flex mt-5 albert-sans">
                    <div className="flex-1 ">
                        <div className="flex bg-white border-2 border-gray-300 rounded-lg mb-2">
                            <button
                                onClick={() => {
                                    setTab("Cart");
                                }}
                                className="flex-1 py-2 px-5 hover:bg-slate-100 transition-colors duration-300"
                            >
                                Your Cart
                            </button>
                            <button
                                onClick={() => {
                                    setTab("Order");
                                }}
                                className="flex-1 py-2 px-5 hover:bg-slate-100 transition-colors duration-300"
                            >
                                Orders
                            </button>
                        </div>
                        {tab === "Cart" ? (
                            <div className="flex flex-1 flex-col ">
                                {cart.cart_items.map((item, index) => (
                                    <div key={index}>
                                        <ShoppingCartItem
                                            item={item}
                                            selected={selected}
                                            setSelected={setSelected}
                                        />
                                    </div>
                                ))}
                                {/* Price of selected items and action buttons */}
                                <div className="flex justify-between items-center mt-5">
                                    <p className="text-2xl font-bold">
                                        Total: P {total_price.toFixed(2)}
                                    </p>
                                    <PrimaryButton>
                                        <p className="albert-sans text-lg font-bold">
                                            Checkout
                                        </p>
                                    </PrimaryButton>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {orders.map((order, index) => (
                                    <div
                                        key={index}
                                        className="border-[2px] border-gray-200 rounded-lg p-4 bg-white mb-0"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-bold text-lg">
                                                    Order #{order.id}
                                                </h3>
                                                <p className="text-gray-500 text-sm">
                                                    {order.date}
                                                </p>
                                                <p className="font-semibold text-xl text-gray-700">
                                                    P {order.total}
                                                </p>
                                            </div>
                                            <div className="flex justify-start items-center space-x-2">
                                                <p
                                                    className={`text-sm font-semibold  text-white py-2 px-3 rounded-lg ${
                                                        order.status ===
                                                        "Completed"
                                                            ? "bg-green-500"
                                                            : order.status ===
                                                              "Cancelled"
                                                            ? "bg-red-500"
                                                            : "bg-yellow-500"
                                                    }`}
                                                >
                                                    {order.status}
                                                </p>
                                                <button
                                                    onClick={() =>
                                                        toggleDetails(index)
                                                    }
                                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none"
                                                >
                                                    {visibleOrder === index
                                                        ? "Hide Details"
                                                        : "View Details"}
                                                </button>
                                            </div>
                                        </div>
                                        {visibleOrder === index && (
                                            <div className="mt-4">
                                                {order.products.map(
                                                    (product, productIndex) => (
                                                        <div
                                                            key={productIndex}
                                                            className="flex items-center space-x-4 border-[2px] border-gray-200 p-2 rounded-lg mb-2"
                                                        >
                                                            <img
                                                                src={
                                                                    product.image
                                                                }
                                                                alt={
                                                                    product.name
                                                                }
                                                                className="w-16 h-16 object-cover rounded-lg border"
                                                            />
                                                            <div>
                                                                <h4 className="font-semibold text-lg">
                                                                    {
                                                                        product.name
                                                                    }
                                                                </h4>
                                                                <p className="text-gray-500 text-sm">
                                                                    Size:{" "}
                                                                    {
                                                                        product.size
                                                                    }
                                                                </p>
                                                                <p className="text-gray-500 text-sm">
                                                                    Quantity:{" "}
                                                                    {
                                                                        product.quantity
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="ml-2 py-4 px-7 min-w-[20vw] h-fit bg-white">
                        <div className="text-2xl mb-3">
                            <h2>Customer Info</h2>
                        </div>
                        <div>
                            <div className="mb-2">
                                <h4 className="text-sm text-customGray">
                                    Name
                                </h4>
                                <h3 className="text-lg">{dummyUser.name}</h3>
                            </div>
                            <div className="mb-2">
                                <h4 className="text-sm text-customGray">
                                    Email
                                </h4>
                                <h3 className="text-lg">{dummyUser.email}</h3>
                            </div>
                            <div className="mb-2">
                                <h4 className="text-sm text-customGray">
                                    Phone
                                </h4>
                                <h3 className="text-lg">{dummyUser.phone}</h3>
                            </div>
                            <div className="mb-2">
                                <h4 className="text-sm text-customGray">
                                    Shipping Address
                                </h4>
                                <h3 className="text-lg">{dummyUser.address}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

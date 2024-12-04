import { Head, useForm, usePage } from "@inertiajs/react";
import Navbar from "@/Elements/Navbar";
import ShoppingCartItem from "./ShoppingCartItem";
import PrimaryButton from "@/Elements/PrimaryButton";
import { useEffect, useState } from "react";
import { Dialog } from "../../Elements/Dialog";
import Alert from "../../Elements/Alert";

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

export default function ShoppingCart({ cart, orders }) {
    const user = usePage().props.auth.user;
    let [tab, setTab] = useState("Cart");
    let [selected, setSelected] = useState([]);
    let [total_price, setTotal] = useState(0);

    const [isDeleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [deleteDialogResponse, setDeleteDialogResult] = useState(null);

    const [showAlert, setShowAlert] = useState(false);

    const {
        data,
        setData,
        post,
        delete: destroy,
        processing,
    } = useForm({
        selected_items: [],
        total_price: total_price,
    }); // for checkout
    const [visibleOrder, setVisibleOrder] = useState(null);
    const getTotalItems = () => {
        let total = 0;
        for (let item of cart.cart_items) {
            total += item.quantity;
        }
        return total;
    };
    const toggleDetails = (index) => {
        setVisibleOrder(visibleOrder === index ? null : index);
    };

    const handleDeleteDialog = (result) => {
        setDeleteDialogVisible(false); // Hide the dialog
        setDeleteDialogResult(result); // Capture the result (true for confirm, false for cancel)
        if (result) {
            // Perform confirm-related actions here
            destroy("/shopping-cart");
            window.location.reload();
        } else {
            console.log("User canceled!");
            // Perform cancel-related actions here
        }
    };

    useEffect(() => {
        let newTotal = 0;
        selected.forEach((item) => {
            newTotal += parseFloat(item.product.price * item.quantity);
        });
        setTotal(newTotal); // Update total price based on selected items
        setData({ ...data, selected_items: selected, total_price: newTotal });
    }, [selected]); // Run this effect whenever 'selected' changes

    const checkout = (e) => {
        e.preventDefault();
        if (
            user.address === "" ||
            user.address === null ||
            user.phone === "" ||
            user.phone === null
        ) {
            setShowAlert(true); // Show alert
            setTimeout(() => setShowAlert(false), 3000); // Hide after 3 seconds
            return;
        } else {
            post("/shopping-cart/checkout");
        }
    };

    return (
        <>
            <Head title="Shopping Cart" />
            <Navbar />
            {isDeleteDialogVisible && (
                <Dialog
                    onClose={handleDeleteDialog}
                    message={"Do you want to remove selected item/s?"}
                />
            )}

            {showAlert && (
                <Alert
                    type="error"
                    message={`Please update your address and phone number.`}
                />
            )}
            {/* Top Part */}
            <main className="py-[50px] px-[100px]">
                <div className="w-full flex flex-col justify-center items-center">
                    <h1 className="albert-sans text-3xl font-bold">
                        Your Shopping Cart
                    </h1>
                    <h4 className="albert-sans text-base font-light mt-1">
                        Total Items: ({getTotalItems()})
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
                                {cart.cart_items.length === 0 ? (
                                    <div className="w-full flex items-center flex-col my-16">
                                        <img
                                            src="/assets/images/sad_face.png"
                                            alt="No Items in the cart"
                                        />
                                        <p className="albert-sans mt-2 text-base">
                                            You have no items in your cart.
                                        </p>
                                    </div>
                                ) : (
                                    cart.cart_items.map((item, index) => (
                                        <div key={index}>
                                            <ShoppingCartItem
                                                item={item}
                                                selected={selected}
                                                setSelected={setSelected}
                                            />
                                        </div>
                                    ))
                                )}

                                {/* Price of selected items and action buttons */}
                                <div className="flex justify-between items-center mt-5">
                                    <p className="text-2xl font-bold">
                                        Total: P {total_price.toFixed(2)}
                                    </p>
                                    <div className="flex space-x-5">
                                        <button
                                            disabled={selected.length === 0}
                                            className={`px-10 py-2 font-semibold rounded-md transition-colors duration-300 ${
                                                selected.length === 0
                                                    ? "bg-red-600 text-white opacity-20 cursor-not-allowed"
                                                    : "bg-red-600 text-white hover:bg-red-700"
                                            }`}
                                            onClick={() =>
                                                setDeleteDialogVisible(true)
                                            }
                                        >
                                            Delete
                                        </button>
                                        <button
                                            disabled={selected.length === 0}
                                            className={`albert-sans text-lg font-semibold border border-black px-10 py-2 rounded-md transition-colors duration-300 ${
                                                selected.length === 0
                                                    ? "opacity-20 cursor-not-allowed"
                                                    : "hover:bg-black hover:text-white"
                                            }`}
                                            onClick={checkout}
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {orders.length === 0 ? (
                                    <div className="w-full flex items-center flex-col my-16">
                                        <img
                                            src="/assets/images/sad_face.png"
                                            alt="No orders"
                                        />
                                        <p className="albert-sans mt-2 text-base">
                                            You have no orders.
                                        </p>
                                    </div>
                                ) : (
                                    orders.map((order, index) => (
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
                                                        {new Date(
                                                            order.date
                                                        ).toUTCString()}
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
                                                        (
                                                            product,
                                                            productIndex
                                                        ) => (
                                                            <div
                                                                key={
                                                                    productIndex
                                                                }
                                                                className="flex items-center space-x-4 border-[2px] border-gray-200 p-2 rounded-lg mb-2"
                                                            >
                                                                <img
                                                                    src={
                                                                        "assets/products/" +
                                                                        product
                                                                            .product
                                                                            .display_image
                                                                    }
                                                                    alt={
                                                                        product
                                                                            .product
                                                                            .name
                                                                    }
                                                                    className="w-16 h-16 object-cover bg-gray-400 rounded-sm border"
                                                                />
                                                                <div>
                                                                    <h4 className="font-semibold text-lg">
                                                                        {
                                                                            product
                                                                                .product
                                                                                .name
                                                                        }
                                                                    </h4>
                                                                    <p className="text-gray-500 text-sm">
                                                                        Size:{" "}
                                                                        {
                                                                            product
                                                                                .variant
                                                                                .size
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
                                    ))
                                )}
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
                                <h3 className="text-lg">{user.name}</h3>
                            </div>
                            <div className="mb-2">
                                <h4 className="text-sm text-customGray">
                                    Email
                                </h4>
                                <h3 className="text-lg">{user.email}</h3>
                            </div>
                            {user.phone ? (
                                <div className="mb-2">
                                    <h4 className="text-sm text-customGray">
                                        Phone
                                    </h4>
                                    <h3 className="text-lg">{user.phone}</h3>
                                </div>
                            ) : (
                                ""
                            )}
                            {user.address ? (
                                <div className="mb-2">
                                    <h4 className="text-sm text-customGray">
                                        Shipping Address
                                    </h4>
                                    <h3 className="text-lg">{user.address}</h3>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

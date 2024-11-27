import { Head, useForm } from "@inertiajs/react";
import Navbar from "@/Elements/Navbar";
import ShoppingCartItem from "./ShoppingCartItem";
import PrimaryButton from "@/Elements/PrimaryButton";
import { useEffect, useState } from "react";

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

export default function ShoppingCart({ cart }) {
    let [selected, setSelected] = useState([]);
    let [total_price, setTotal] = useState(0);
    const { data, setData, post, processing } = useForm({
        id: cart.id,
        total_price: total_price,
    }); // for checkout

    useEffect(() => {
        setTotal(0);
        for (const item of selected) {
            setTotal(
                total_price + parseFloat(item.product.price * item.quantity)
            );
        }
    }, [selected, setSelected, data]);

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

                {/* List */}
                <div className="flex mt-5">
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

                    <div className="bg-white border-2 border-gray-300 rounded-lg ml-2 py-4 px-7 min-w-[20vw] h-fit">
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

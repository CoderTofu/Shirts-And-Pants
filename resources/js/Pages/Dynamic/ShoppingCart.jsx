import { Head, useForm } from "@inertiajs/react";
import Navbar from "@/Elements/Navbar";
import ShoppingCartItem from "./ShoppingCartItem";

export default function ShoppingCart({ cart }) {
    return (
        <>
            <Head title="Shopping Cart" />
            <Navbar />
            <p>Cart</p>
            <div className="m-12 flex flex-col justify-center space-y-20">
                {cart.items.map((item, index) => (
                    <ShoppingCartItem key={index} item={item} />
                ))}
            </div>
        </>
    );
}

import { Head, useForm } from "@inertiajs/react";
import Navbar from "@/Elements/Navbar";
import ShoppingCartItem from "./ShoppingCartItem";
import PrimaryButton from "@/Elements/PrimaryButton";
import Footer from "../../Elements/Footer";

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

export default function ShoppingCart({ cart }) {
    console.log(cart);
    let total_price = 0;
    for (const item of cart.cart_items) {
        total_price += parseFloat(item.product.price * item.quantity);
    }
    const { data, setData, post, processing } = useForm({
        id: cart.id,
        total_price: total_price,
    }); // for checkout
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
                <div className="flex flex-col gap-4 mt-8">
                    {cart.cart_items.map((item, index) => (
                        <div key={index}>
                            <ShoppingCartItem item={item} />
                        </div>
                    ))}
                </div>
                {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {cart.cart_items.map((item, index) => (
                        c
                    ))}
                </div> */}

                {/* Price of selected items and action buttons */}
                <p>Total: P {total_price.toFixed(2)}</p>
                <PrimaryButton>Checkout</PrimaryButton>
            </main>
        </>
    );
}

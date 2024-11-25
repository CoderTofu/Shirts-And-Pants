import { Head, useForm } from "@inertiajs/react";
import Navbar from "@/Elements/Navbar";
import ShoppingCartItem from "./ShoppingCartItem";
import PrimaryButton from "@/Elements/PrimaryButton";

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
            <p>Cart</p>
            <div className="m-12 flex flex-col justify-center space-y-20 items-center">
                {cart.cart_items.map((item, index) => (
                    <ShoppingCartItem key={index} item={item} />
                ))}
                <p>Total: {total_price.toFixed(2)}</p>
                <PrimaryButton>Checkout</PrimaryButton>
            </div>
        </>
    );
}

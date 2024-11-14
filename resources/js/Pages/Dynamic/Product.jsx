import { Head, useForm, router } from "@inertiajs/react";

import Navbar from "@/Elements/Navbar";
import PrimaryButton from "@/Elements/PrimaryButton";

export default function Product({ product }) {
    const images = product.variations
        .map((variation) => variation.images)
        .flat();

    const { data, setData, post, processing, errors, reset } = useForm({
        quantity: 1,
        product_id: product.id,
        variation_id: product.variations[0].id,
        price: product.price,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("shopping-cart.add"), {
            onSuccess: () => {
                alert("Item added to cart!");
            },
            onError: (error) => {
                alert("error");
            },
        });
    };
    return (
        <>
            <Head title={product.name} />
            <Navbar />
            <div className="">{product.name}</div>
            <PrimaryButton onClick={submit}>Add to cart</PrimaryButton>
        </>
    );
}

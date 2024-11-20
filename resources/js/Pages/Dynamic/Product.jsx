import { Head, useForm, router } from "@inertiajs/react";

import Navbar from "@/Elements/Navbar";
import PrimaryButton from "@/Elements/PrimaryButton";
import { useEffect, useState } from "react";

/*
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

export default function Product({ product }) {
    const images = product.images;
    const [selectedImage, setSelectedImage] = useState(product.display_image);
    const { data, setData, post, processing } = useForm({
        product_id: product.id,
        variant_id: product.sizes[0].variant_id,
        quantity: 1,
        price: product.price,
        size: product.sizes[0].size,
    });

    const setImage = (index) => {
        setSelectedImage(images[index]);
    };

    const changeSize = (e) => {
        e.preventDefault();
        const size = product.sizes.find((size) => size.size === e.target.value);
        setData({
            ...data,
            quantity: 1,
            size: size.size,
            variant_id: size.variant_id,
        });
    };

    const changeQty = (e) => {
        e.preventDefault();
        const newQuantity = e.target.value;
        const stock = product.sizes.find(
            (size) => size.size === data.size
        ).stock;
        if (newQuantity != 0 && stock - newQuantity >= 0) {
            setData({ ...data, quantity: Number(newQuantity) });
        }
    };
    const submit = (e) => {
        e.preventDefault();
        post(`/shopping-cart/add-to-cart`);
    };

    return (
        <>
            <Head title={product.name} />
            <Navbar />
            <div className="flex flex-col justify-center mt-[15vh] overflow-y-auto items-center">
                <div className="flex flex-row space-x-[15vw]">
                    <div className="flex flex-col space-y-5">
                        <div className="max-w-[22vw]">
                            <img
                                className="w-max"
                                src={`/assets/products/${selectedImage}`}
                            />
                        </div>
                        <div className="flex flex-row space-x-2 max-w-[2.5vw]">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    className="cursor-pointer hover:border "
                                    onClick={() => setImage(index)}
                                    src={`/assets/products/${image}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                        <div className="items-center mt-5 space-y-2">
                            <div className="flex flex-row space-x-5">
                                <select
                                    value={data.size}
                                    onChange={changeSize}
                                    className="cursor-pointer"
                                >
                                    {product.sizes.map((size, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={size.size}
                                            >
                                                {size.size}
                                            </option>
                                        );
                                    })}
                                </select>
                                <input
                                    type="number"
                                    min="1"
                                    value={Number(data.quantity)}
                                    onChange={changeQty}
                                    className="max-w-20 cursor-pointer"
                                />
                            </div>
                            <PrimaryButton onClick={submit}>
                                Add to cart
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

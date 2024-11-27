import { Head, useForm, router } from "@inertiajs/react";

import Navbar from "@/Elements/Navbar";
import PrimaryButton from "@/Elements/PrimaryButton";
import { useEffect, useState } from "react";
import Footer from "./../../Elements/Footer";

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
    console.log(product);
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

    const getStock = () => {
        return product.sizes.find((size) => size.size == data.size).stock;
    };

    const buy = (e) => {
        e.preventDefault();
        post(`/shopping-cart/add-to-cart`);
    };

    return (
        <>
            <Head title={product.name} />
            <Navbar />
            <div className="flex flex-col justify-start pt-[10vh] pb-[20vh] overflow-y-auto items-center">
                <div className="pl-[200px] flex flex-row justify-start  w-full">
                    <div className="flex flex-col space-y-5 ">
                        <div className="max-w-[22vw]">
                            <img
                                className="w-auto h-[60vh] object-cover border-black border-solid border"
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
                    <div className="pl-[50px] flex flex-col justify-center">
                        <p className="albert-sans text-2xl font-thin">
                            SHIRTS & PANTS
                        </p>
                        <h1 className="albert-sans font-bold text-5xl">
                            {product.name}
                        </h1>
                        <h4 className="albert-sans font-light text-base">
                            P {product.price}
                        </h4>
                        <p className="albert-sans p-5 pl-0">
                            {product.description}
                        </p>
                        <div className="items-center ">
                            <div className="flex flex-col space-y-5">
                                <div>
                                    <h4 className="albert-sans text-base font-light pb-1">
                                        Size:
                                    </h4>
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
                                </div>
                                <div>
                                    <h4 className="albert-sans text-base font-light pb-1">
                                        Quantity:
                                    </h4>
                                    <input
                                        type="number"
                                        min="1"
                                        value={Number(data.quantity)}
                                        onChange={changeQty}
                                        className="max-w-20 cursor-pointer"
                                    />
                                </div>
                            </div>
                            <PrimaryButton
                                onClick={submit}
                                disabled={getStock() === 0}
                                className="mt-[20px] mr-3"
                            >
                                Add to cart
                            </PrimaryButton>

                            <PrimaryButton
                                disabled={getStock() === 0}
                                onClick={buy}
                                className="mt-[20px]"
                            >
                                Buy now
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

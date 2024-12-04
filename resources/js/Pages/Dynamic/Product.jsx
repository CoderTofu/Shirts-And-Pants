import { Head, useForm } from "@inertiajs/react";
import Navbar from "@/Elements/Navbar";
import PrimaryButton from "@/Elements/PrimaryButton";
import { useEffect, useState } from "react";
import Footer from "./../../Elements/Footer";
import Alert from "../../Elements/Alert";

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

    const [showAlert, setShowAlert] = useState(false);

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
        post(`/shopping-cart/add-to-cart`, {
            onSuccess: () => {
                setShowAlert(true); // Show alert when the item is added
                setTimeout(() => setShowAlert(false), 3000); // Hide after 3 seconds
            },
        });
    };

    const getStock = () => {
        return product.sizes.find((size) => size.size == data.size).stock;
    };

    const buy = (e) => {
        e.preventDefault();
        post(`/shopping-cart/buy`);
    };

    return (
        <>
            <Head title={product.name} />
            <Navbar />
            {showAlert && <Alert type="success" message="Added to cart!" />}
            <div className="flex flex-col justify-start pt-[10vh] pb-[20vh] overflow-y-auto items-center albert-sans">
                <div className="pl-[200px] flex flex-row justify-start w-full">
                    <div className="flex flex-col space-y-5 ">
                        <div className="border-black border-solid border w-[30vw] h-[600px] flex items-center bg-products">
                            <img
                                className="w-[600px] h-auto object-cover "
                                src={`/assets/products/${selectedImage}`}
                            />
                        </div>
                        <div className="flex flex-row space-x-2 max-w-[2.5vw] ">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    className="cursor-pointer hover:scale-105 hover:opacity-80 transition-all bg-products border-black border-solid border "
                                    onClick={() => setImage(index)}
                                    src={`/assets/products/${image}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="pl-[50px] flex flex-col justify-center">
                        <p className="albert-sans text-2xl font-light">
                            SHIRTS & PANTS
                        </p>
                        <h1 className="albert-sans font-bold text-5xl">
                            {product.name}
                        </h1>
                        <h4 className="albert-sans font-light text-base">
                            P {product.price}
                        </h4>
                        <p className="albert-sans p-5 pl-0 max-w-[700px]">
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
                                        className="cursor-pointer bg-clearBlack focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
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
                                        className="max-w-20 cursor-pointer bg-clearBlack focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 "
                                    />
                                </div>
                            </div>
                            <div className="mt-10">
                                <PrimaryButton
                                    onClick={submit}
                                    disabled={getStock() === 0}
                                    className="mt-[20px] mr-3 bg-products text-white hover:text-black transition-all"
                                >
                                    <p className="text-lg font-bold">
                                        Add to cart
                                    </p>
                                </PrimaryButton>

                                <PrimaryButton
                                    disabled={getStock() === 0}
                                    onClick={buy}
                                    className="mt-[20px] bg-products text-white hover:text-black transition-all"
                                >
                                    <p className="text-lg font-bold">Buy now</p>
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

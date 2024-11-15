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
    variants: Variant[]
 }

 Variant = {
    color: string
    sizes: Size[]
    images: Image[]
 }

  Size = {
    variant_id: number
    size_name: string
    stock: number
  }

  Image = {
    image: string
  }
*/

export default function Product({ product }) {
    const images = product.variants.map((variant) => variant.images).flat();
    const [selectedImage, setSelectedImage] = useState(product.display_image);
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const { data, setData, post, processing } = useForm({
        product_id: product.id,
        variant_id: product.variants[0].sizes[0].variant_id,
        quantity: 1,
        price: product.price,
    });

    const submit = (e) => {
        console.log(data);
        e.preventDefault();
        post(route("shopping-cart.add"), {
            // onSuccess: () => {
            //     alert("Item added to cart!");
            // },
            // onError: (error) => {
            //     alert("error");
            // },
        });
    };

    const setImage = (index) => {
        setSelectedImage(images[index].image);
        setSelectedColorIndex(index);
        updateVariant();
    };

    const changeSize = (e) => {
        e.preventDefault();
        setSelectedSizeIndex(e.target.value);
        updateVariant();
    };

    const changeColor = (e) => {
        e.preventDefault();
        setSelectedColorIndex(e.target.value);
        setSelectedImage(images[e.target.value].image);
        updateVariant();
    };

    const updateVariant = () => {
        setData(
            "variant_id",
            product.variants[selectedColorIndex].sizes[selectedSizeIndex]
                .variant_id
        );
        setQuantity(1);
    };

    const changeQty = (e) => {
        e.preventDefault();
        const quantity = Number(e.target.value);
        if (
            quantity != 0 &&
            product.variants[selectedColorIndex].sizes[selectedSizeIndex]
                .stock -
                quantity >=
                0
        ) {
            setQuantity(quantity);
            setData("quantity", quantity);
        }
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
                                    src={`/assets/products/${image.image}`}
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
                                    value={selectedColorIndex}
                                    onChange={changeColor}
                                >
                                    {product.variants.map((variant, index) => {
                                        return (
                                            <option key={index} value={index}>
                                                {variant.color[0].toUpperCase() +
                                                    variant.color.slice(1)}
                                            </option>
                                        );
                                    })}
                                </select>
                                <select
                                    value={selectedSizeIndex}
                                    onChange={changeSize}
                                >
                                    {product.variants[
                                        selectedColorIndex
                                    ].sizes.map((size, index) => {
                                        return (
                                            <option key={index} value={index}>
                                                {size.size}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={changeQty}
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

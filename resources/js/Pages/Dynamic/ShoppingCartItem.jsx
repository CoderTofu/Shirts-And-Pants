import { useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function ShoppingCartItem({ item }) {
    // console.log(item);
    const sizes = item.product.sizes.map((size) => size.size);
    const { data, setData, patch, processing } = useForm({
        id: item.id,
        quantity: item.quantity,
        variant_id: item.variant_id_on_cart,
    });

    const [currentSize, setCurrentSize] = useState(
        item.product.sizes.find((size) => size.variant_id === data.variant_id)
            .size
    );
    const initialRenderRef = useRef(true);

    useEffect(() => {
        console.log(data);
        if (initialRenderRef.current) {
            initialRenderRef.current = false;
            return;
        }
        update();
    }, [data]);

    const handleQtyChange = (e) => {
        let value = parseInt(e.target.value, 10);
        const variant = item.product.sizes.find(
            (size) => size.variant_id === data.variant_id
        );

        if (value >= variant.stock) {
            setData({ ...data, quantity: variant.stock });
        } else if (value) {
            setData({ ...data, quantity: value });
        }
    };

    const handleSizeChange = (e) => {
        const variant = item.product.sizes.find(
            (size) => size.size === e.target.value
        );
        setData({
            ...data,
            quantity: 1,
            variant_id: variant.variant_id,
        });
        setCurrentSize(e.target.value);
    };

    const update = () => {
        patch(route("shopping-cart.update"), {
            preserveScroll: true, // Ensures the page scroll position remains the same
            onSuccess: () => {
                console.log("Cart updated successfully!"); // Optional: add any feedback
            },
            onError: (errors) => {
                console.error("Failed to update cart:", errors); // Handle errors if necessary
            },
        });
    };

    return (
        <div className="w-full  p-4 rounded-lg shadow-md">
            <div className="flex flex-row items-center justify-between">
                {/* Checkbox and thumb */}
                <div className="flex justify-center items-center">
                    <input type="checkbox" className="mr-4" />
                    <img
                        className="h-[200px] w-auto object-cover rounded-md"
                        src={`/assets/products/${item.display_image}`}
                        alt={item.product.name}
                    />
                </div>

                {/* Product Details */}
                <div className="flex flex-col items-start mx-4 flex-grow">
                    <p className="font-bold text-lg">{item.product.name}</p>
                    <p className="text-gray-600 mt-2">
                        Price: P {item.product.price}
                    </p>
                </div>

                <div className="flex items-center justify-center">
                    <select
                        name="size"
                        value={currentSize}
                        onChange={handleSizeChange}
                        className="border text-left rounded w-24 py-1 "
                    >
                        {sizes.map((size, index) => (
                            <option key={index} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>

                    {/* Quantity Input */}
                    <input
                        className="w-16 border rounded text-center px-2 py-1"
                        type="number"
                        name="quantity"
                        onChange={handleQtyChange}
                        value={data.quantity}
                        min="1"
                    />

                    {/* Total Price */}
                    <p className="ml-4 font-bold">
                        P{" "}
                        {(
                            Number(item.product.price) * Number(item.quantity)
                        ).toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
}

import { useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function ShoppingCartItem({
    item,
    selected,
    setSelected,
    checked,
}) {
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
        if (initialRenderRef.current) {
            initialRenderRef.current = false;
            return;
        }
        update();
    }, [data]);

    const handleSelect = (e) => {
        if (!selected.some((selectedItem) => selectedItem.id === item.id)) {
            // If item is not in selected array
            setSelected([...selected, item]);
        } else {
            // If item is in selected array
            setSelected(
                selected.filter((selectedItem) => selectedItem.id !== item.id)
            );
        }
    };

    const handleQtyChange = (e) => {
        let value = parseInt(e.target.value, 10);
        const variant = item.product.sizes.find(
            (size) => size.variant_id === data.variant_id
        );

        if (value >= variant.stock) {
            value = variant.stock;
        } else if (!value || value < 1) {
            value = 1;
        }

        setData({ ...data, quantity: value });

        // Update the selected item quantity in the parent state
        setSelected((prevSelected) =>
            prevSelected.map((selectedItem) =>
                selectedItem.id === item.id
                    ? { ...selectedItem, quantity: value }
                    : selectedItem
            )
        );
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
                window.location.reload();
            },
            onError: (errors) => {
                console.error("Failed to update cart:", errors); // Handle errors if necessary
            },
        });
    };

    return (
        <div className="w-full p-4 rounded-lg border-2 bg-white border-gray-300">
            <div className="flex flex-row items-center justify-between">
                {/* Checkbox and thumb */}
                <div className="flex justify-center items-center">
                    <input
                        type="checkbox"
                        checked={checked}
                        className="mr-4 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                        onChange={handleSelect}
                    />
                    <img
                        className="h-[200px] w-auto object-cover rounded-md bg-products"
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
                    <div className="flex justify-center items-center">
                        <p className="albert-sans text-sm mr-2">Size:</p>
                        <select
                            className="cursor-pointer rounded px-2 pr-10 py-1 bg-clearBlack focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                            value={currentSize}
                            onChange={handleSizeChange}
                        >
                            {sizes.map((size, index) => (
                                <option key={index} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Quantity Input */}
                    <div className=" ml-10 flex justify-center items-center">
                        <p className="albert-sans text-sm mr-2">Quantity:</p>
                        <input
                            className="w-16 border rounded px-3 py-1 bg-clearBlack focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                            type="number"
                            name="quantity"
                            onChange={handleQtyChange}
                            value={data.quantity}
                            min="1"
                        />
                    </div>

                    {/* Total Price */}
                    <p className="ml-10 font-bold">
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

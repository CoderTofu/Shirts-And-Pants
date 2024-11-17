import { useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function ShoppingCartItem({ key, item }) {
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
            onSuccess: () => window.location.reload(),
        });
    };

    return (
        <div className="w-full justify-center items-center" key={key}>
            <div className="flex flex-row justify-between items-center">
                <input type="checkbox" />
                <img
                    className="w-52"
                    src={`/assets/products/${item.display_image}`}
                />
                <div className="flex flex-col justify-center items-center">
                    <p>{item.product_name}</p>
                    <select
                        name="size"
                        value={currentSize}
                        onChange={handleSizeChange}
                    >
                        {sizes.map((size, index) => (
                            <option key={index} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                    <p>{item.price}</p>
                </div>
                <input
                    className="max-w-20"
                    type="number"
                    name="quantity"
                    onChange={handleQtyChange}
                    value={data.quantity}
                    min="1"
                />
                <p>
                    {(
                        Number(item.product.price) * Number(item.quantity)
                    ).toFixed(2)}
                </p>
            </div>
        </div>
    );
}

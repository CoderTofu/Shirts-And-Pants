import Dropdown from "@/Elements/Dropdown";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function ShoppingCartItem({ key, item }) {
    const { data, setData, patch, processing } = useForm({
        id: item.id,
        product_id: item.product_id,
        color: item.variation.color,
        quantity: item.quantity,
        size: item.variation.size,
    });
    const [availableSizes, setAvailableSizes] = useState([item.variation.size]);

    useEffect(() => {
        axios
            .get(`/product-variations/product/${item.product_id}`)
            .then((response) => {
                const set = new Set();
                response.data.variations.map((variation) => {
                    if (variation.stock > 0) set.add(variation.size);
                });
                setAvailableSizes([...set]);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        console.log(data);
        update();
    }, [data]);

    const handleQtyChange = (e) => {
        let value = parseInt(e.target.value, 10);
        if (value > item.variation.stock) {
            value = item.variation.stock;
        }
        setData("quantity", value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const update = () => {
        patch(route("shopping-cart.update"));
    };

    return (
        <div className="w-full justify-center items-center" key={key}>
            <div className="flex flex-row justify-between items-center">
                <input type="checkbox" />
                <img
                    src={`/assets/products/${item.variation.images[0].image}`}
                />
                <div className="flex flex-col justify-center items-center">
                    <p>{item.product.name}</p>
                    {/* <p>{item.variation.color}</p> */}
                    <select
                        name="size"
                        value={data.size}
                        onChange={handleChange}
                    >
                        {availableSizes.map((size, index) => (
                            <option key={index} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                    <p>{item.product.price}</p>
                </div>
                <input
                    type="number"
                    name="quantity"
                    onChange={handleQtyChange}
                    value={data.quantity}
                    min="1"
                />
                <p>{item.product.price * item.quantity}</p>
            </div>
        </div>
    );
}

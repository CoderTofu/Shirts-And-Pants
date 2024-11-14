import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function ShoppingCartItem({ key, item }) {
    // console.log(item);
    const { data, setData, patch, processing } = useForm({
        id: item.id,
        product_id: item.product_id,
        color: item.color,
        quantity: item.quantity,
        size: item.size,
    });
    const [availableSizes, setAvailableSizes] = useState([item.size]);

    useEffect(() => {
        axios
            .get(`/api/v1/products/${item.product_id}`)
            .then((response) => {
                const product = response.data;
                console.log(product);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        console.log(data);
        update();
    }, [data]);

    const handleQtyChange = (e) => {
        let value = parseInt(e.target.value, 10);
        if (value > item.stock) {
            value = item.stock;
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
                    className="w-52"
                    src={`/assets/products/${item.display_image}`}
                />
                <div className="flex flex-col justify-center items-center">
                    <p>{item.product_name}</p>
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
                    <p>{item.price}</p>
                </div>
                <input
                    type="number"
                    name="quantity"
                    onChange={handleQtyChange}
                    value={data.quantity}
                    min="1"
                />
                <p>{Number(item.price) * Number(item.quantity)}</p>
            </div>
        </div>
    );
}

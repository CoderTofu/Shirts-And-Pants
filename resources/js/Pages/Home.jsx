import { Head } from "@inertiajs/react";
import Navbar from "../Elements/Navbar";
import Footer from "../Elements/Footer";

import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const carouselItems = [
        "/assets/images/banners/banner_1.png",
        "/assets/images/banners/banner_2.png",
        "/assets/images/banners/banner_3.png",
        "/assets/images/banners/banner_4.png",
        "/assets/images/banners/banner_5.png",
        "/assets/images/banners/banner_6.png",
        "/assets/images/banners/banner_7.png",
    ];

    // Randomize and select up to 5 items from carouselItems
    const shuffledItems = carouselItems
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

    return (
        <>
            <Head title="Home" />
            <Navbar auth />
            <Carousel
                opts={{ loop: true }}
                plugins={[
                    Autoplay({
                        delay: 7000,
                    }),
                ]}
                className="w-full flex justify-between items-center bg-gray-700 p-5"
            >
                <CarouselPrevious className="absolute left-5 z-20 border-none bg-white rounded cursor-pointer transition-all opacity-15 hover:opacity-100" />

                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <p className="text-white text-5xl font-bold">
                        Discover the Latest in Streetwear Fashion
                    </p>
                </div>

                <CarouselContent className="z-0">
                    {shuffledItems.map((item, index) => (
                        <CarouselItem key={index}>
                            <div className="w-full h-full max-h-[80vh]">
                                <Card className="w-full h-full max-h-[100%] border-none">
                                    <CardContent className="flex items-center justify-center w-full h-full max-h-[100%]">
                                        <img
                                            src={item}
                                            alt={item}
                                            className="object-cover w-full h-auto max-w-[80vw] object-top"
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext className="absolute right-5 z-20 border-none bg-white rounded cursor-pointer transition-all opacity-15 hover:opacity-100" />
            </Carousel>
        </>
    );
}

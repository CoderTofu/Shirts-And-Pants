import { Head } from "@inertiajs/react";
import Navbar from "../Elements/Navbar";

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
        "https://www.yellowbrick.co/wp-content/uploads/2023/02/Streetwear-style.jpg",
        "https://media.voguebusiness.com/photos/661033e2da7d9e9fd8ddfea1/master/w_1600%2Cc_limit/STREETWEAR-IN-2024-vogue-business-story-inline-6.jpg",
        "https://www.highsnobiety.com/static-assets/dato/1690970245-inside-nigerias-booming-streetwear-renaissance-07.jpg",
    ];

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
                className="w-full flex justify-between items-center bg-gray-700"
            >
                <CarouselPrevious className="absolute left-5 z-20 border-none bg-white rounded cursor-pointer transition-colors hover:bg-gray-200" />

                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <p className="text-white text-5xl font-bold">
                        Discover the Latest in Streetwear Fashion
                    </p>
                </div>

                <CarouselContent className="z-0">
                    {carouselItems.map((item, index) => (
                        <CarouselItem key={index}>
                            <div className="w-full h-full max-h-[80vh]">
                                <Card className="w-full h-full max-h-[100%] border-none">
                                    <CardContent className="flex items-center justify-center w-full h-full max-h-[100%]">
                                        <img
                                            src={item}
                                            alt={`Carousel item ${index + 1}`}
                                            className="object-cover w-full h-full max-w-[100%] object-top"
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext className="absolute right-5 z-20 border-none bg-white rounded cursor-pointer transition-colors hover:bg-gray-200" />
            </Carousel>
        </>
    );
}

import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import Footer from "./Elements/Footer";

createInertiaApp({
    title: (title) => `${title} - SAP`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <main className="min-h-screen overflow-x-hidden flex flex-col">
                <div className="flex-grow">
                    <App {...props} />
                </div>
                <Footer />
            </main>
        );
    },
    progress: {
        color: "#4B5563",
    },
});

export default function Footer() {
    return (
        <footer className="w-full bg-customBlack flex p-20 py-11 items-center justify-between">
            <div>
                <img src="/assets/images/sap-logo-white.png" alt="SAP Logo" />
                <span className="league-spartan mt-3 text-white text-s">
                    ©2024 Shirts and Pants
                </span>
            </div>
            <div className="flex flex-col">
                <a
                    className="albert-sans mb-3 text-white font-bold text-lg hover:text-gray-300 transition-all"
                    href="/about"
                >
                    ABOUT US
                </a>
                <div className="flex">
                    <a className="pr-2" href="https://www.facebook.com">
                        <img src="/assets/images/fb-icon.png" alt="Facebook" />
                    </a>
                    <a className="pr-2" href="https://www.instagram.com">
                        <img src="/assets/images/ig-icon.png" alt="Instagram" />
                    </a>
                    <a className="pr-2" href="https://www.twitter.com">
                        <img src="/assets/images/x-icon.png" alt="Twitter" />
                    </a>
                    <a className="pr-2" href="https://www.tiktok.com">
                        <img
                            src="/assets/images/tiktok-icon.png"
                            alt="TikTok"
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
}

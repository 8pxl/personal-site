import { FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
import { TbBrandYoutube, TbBrandInstagram, TbBrandGithub, TbBrandSpotify } from "react-icons/tb";


export default function SocialLinks() {
    return (
        <div data-gsap="line1" className="
        rotate-90 fixed text-white z-1 origin-top-right top-24 gap-2 flex
        right-[calc(1vw)] translate-y-46 lg:translate-y-50 lg:text-lg">
            <div className="italic font-js">
                Follow me! —
            </div>
            <div className="flex gap-6 items-center">
                <a
                    href="https://instagram.com/not.keijay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-pink-400 transition duration-200 text-2xl"
                    aria-label="Instagram"
                >
                    <TbBrandInstagram />
                </a>
                <a
                    href="https://youtube.com/@8pxl_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-red-400 transition duration-200 text-2xl"
                    aria-label="YouTube"
                >
                    <TbBrandYoutube />
                </a>
                <a
                    href="https://github.com/8pxl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-400 transition duration-200 text-2xl"
                    aria-label="GitHub"
                >
                    <TbBrandGithub />
                </a>

                <a
                    href="https://open.spotify.com/user/lzfutysrwlxroclal5c2ck306?si=5bc171dbda7c4f72"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-green-400 transition duration-200 text-2xl"
                    aria-label="Spotify"
                >
                    <TbBrandSpotify/>
                </a>
            </div>
        </div>

    );
}

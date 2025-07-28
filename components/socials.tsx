import { FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
import { TbBrandYoutube, TbBrandInstagram, TbBrandGithub } from "react-icons/tb";


export default function SocialLinks() {
    return (
        <div data-gsap="line1" className="
        rotate-90 fixed text-white z-1 origin-top-right top-12 gap-2 flex
        right-13 translate-y-46

        lg:right-4 lg:translate-y-54 lg:text-lg">
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
            </div>
        </div>

    );
}

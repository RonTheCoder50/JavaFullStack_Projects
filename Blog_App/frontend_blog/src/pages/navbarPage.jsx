import { Button } from "@/components/ui/button";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { Link } from "react-router";


export default function Navbar({ search, setSearch, theme, onToggleTheme, togglePanel, pannel }) {
    const navigate = useNavigate();
     
    async function handleInput(e) {
        setSearch(e.target.value);
    }

    const userInfo = JSON.parse(localStorage.getItem('user'));
    const role = userInfo.role;

    return (
        <section className={`
            w-full flex flex-col 
            gap-5 items-center
            md:flex-row md:gap-0 
            justify-around p-4 
            shadow-sm
            ${theme === 'dark' 
                ? 'bg-gray-900 text-white/75 border-b border-sky-300' 
                : 'bg-white text-black/80'
            }
        `}>
            <div className="flex items-center gap-8 md:gap-12 lg:gap-16 text-sm sm:text-base tracking-wide font-normal sm:font-medium">
                <Link 
                    to="/profile" 
                    className="hover:underline decoration-2 decoration-sky-400 underline-offset-2">
                        PROFILE
                </Link>

                <Link 
                    to="/about" 
                    className="hover:underline decoration-2 decoration-sky-400 underline-offset-2">
                        ABOUT 
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex gap-4 items-center">
                    <input 
                        onChange={handleInput}
                        type="text" 
                        value={search}
                        className="w-full max-w-[240px] py-1 px-2 text-sm tracking-wide border  border-gray-500/90 rounded-sm focus:outline-sky-500 focus:outline-1 outline-offset-2 placeholder:text-gray-500"
                        placeholder={
                            pannel === 'post' 
                            ? "search blogs here.."
                            : "search users here.."
                        }
                    />

                    <div className="flex items-center gap-0.5 border border-sky-300 rounded-sm">
                        <div 
                            className={`
                                p-2 hover:bg-sky-300 
                                transition-all delay-75 
                                duration-200 ease-in-out
                                rounded-tl-sm rounded-bl-sm
                                ${theme === 'dark' ? 'bg-white/80 text-black' : 'bg-white'}
                            `}
                            onClick={() => onToggleTheme()}
                        >
                            <IoMoonOutline/>
                        </div>
                        <div 
                            className={`
                                p-2 hover:bg-sky-300 
                                transition-all delay-75 
                                duration-200 ease-in-out
                                rounded-tr-sm rounded-br-sm
                                ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-500 text-white'}
                            `}
                            onClick={() => onToggleTheme()}
                        >
                            <IoSunnyOutline/>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Button 
                        onClick={() => navigate('/blog_form')} 
                        className={`
                            px-3 py-0.5 border 
                            rounded-sm 
                            text-xs tracking-wide
                            ${theme === 'dark' 
                                ?'bg-white/80 text-black/80 border-sky-600' 
                                :'bg-indigo-500/90 border-gray-400'
                            }
                        `}
                    >
                        Add Blog
                    </Button>

                    {role === 'ADMIN' && 
                        <Button
                            onClick={() => togglePanel()}
                            className={`
                                px-3 py-0.5 border 
                                rounded-sm 
                                text-xs tracking-wide
                                ${theme === 'dark' 
                                    ?'bg-sky-400 text-black/90 border-sky-500' 
                                    :'bg-sky-500 border-gray-400'
                                }
                            `}
                        >
                            switch to {pannel === 'user' ? 'posts' : 'users'}
                        </Button>
                    }
                </div>
            </div>

        </section>
    );
}
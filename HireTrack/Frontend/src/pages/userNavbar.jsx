import { useState } from "react";
import { FiMoon } from "react-icons/fi";
import { 
    MdOutlineWbSunny,
    MdOutlineClear, 
    MdOutlineDashboard,
    MdOutlineHistory,
    MdOutlinePriceCheck
} from "react-icons/md";

import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useTheme } from "./theme";

export default function UserNavbar({ status, handleStatus }) {
    const { theme, toggleTheme } = useTheme();
    const [sideToggle, isSideToggle] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    function toggleSideBar() {
        isSideToggle(!sideToggle);
    }

    return (
        <>
        <nav
            className={`
                sm:hidden
                w-full 
                max-w-[90%] 
                xl:max-w-[80%] 
                mx-auto 
                flex 
                items-center 
                justify-between 
                rounded-lg 
                m-4 
                py-4 
                text-base 
                shadow-md 
                border 
                px-7 
                ${theme === 'light' ? 'bg-white' : 'bg-zinc-800'}
            `}
        >
            <h1 className="tracking-normal font-medium">
                HireTrack
            </h1>

            <RxHamburgerMenu
                onClick={() => {
                    toggleSideBar()
                }} 
                size={26} 
                className="hover:shadow-sm p-1 rounded-lg"
            />

            {sideToggle && 
                <div className="absolute h-[95%] w-[95%] top-2 right-5 p-2 bg-gray-100/90 flex flex-col gap-4 shadow-md/30">
                    <MdOutlineClear
                        onClick={() => toggleSideBar()}
                        size={28} 
                        className="m-2 hover:shadow-sm p-1 rounded-full"
                    />

                    <div className="flex flex-col items-center gap-2 md:gap-8 lg:gap-12 xl:gap-14">
                        <div onClick={() => handleStatus('dashboard')} 
                            className="py-2 px-4 w-full bg-white shadow-sm hover:bg-gray-50 flex items-center gap-2 rounded-sm">
                            <MdOutlineDashboard />
                            <span>
                                Dashboard
                            </span>
                        </div>

                        <div onClick={() => 
                            handleStatus('history')
                        }  
                            className="py-2 px-4 w-full bg-white shadow-sm hover:bg-gray-50 flex items-center gap-2 rounded-sm">
                            <MdOutlineHistory />
                            <span className="text-base tracking-wide font-normal">
                                History
                            </span>
                        </div>

                        <div onClick={() => handleStatus('pricing')} 
                            className="py-2 px-4 w-full bg-white shadow-sm hover:bg-gray-50 flex items-center gap-2 rounded-sm">
                            <MdOutlinePriceCheck />
                            <span className="text-base tracking-wide font-normal">
                                Pricing
                            </span>
                        </div>

                        <div onClick={() => handleStatus('profile')} 
                            className="py-2 px-4 w-full bg-white shadow-sm hover:bg-gray-50 flex items-center gap-2 rounded-sm">
                            <FaRegUser />
                            <span className="text-base tracking-wide font-normal">
                                Profile 
                            </span>
                        </div>

                        <div className="py-2 px-4 w-full bg-white shadow-sm hover:bg-gray-50 flex items-center gap-2 rounded-sm">
                            {theme === 'light'
                                ? <MdOutlineWbSunny />
                                : <FiMoon />
                            }
                            <span className="text-base tracking-wide font-normal">
                                {theme === 'light' ? 'Light' : 'Dark'}
                            </span>
                        </div>
                    </div>
                </div>
            }
        </nav>
        
        <nav 
            className={`
                hidden 
                sm:flex
                w-full 
                max-w-[90%] 
                xl:max-w-[80%] 
                mx-auto 
                items-center 
                justify-between 
                rounded-lg 
                m-4 
                py-4 
                text-base 
                shadow-md 
                border 
                px-7
                ${theme === 'light' ? 'bg-white' : 'bg-zinc-800'}
            `}
        >
            <h1 className="tracking-normal font-medium">
                HireTrack
            </h1>

            <div onClick={(e) => handleStatus(e.target.value)} 
                className="flex items-center gap-6 md:gap-8 lg:gap-12 xl:gap-14">
                <NavBox
                    value={'Dashboard'}
                    status={status}
                />

                <NavBox
                    value={'History'}
                    status={status}
                />
                
                <NavBox
                    value={'Pricing'}
                    status={status}
                />
            </div>
            
            <div className="flex items-center gap-4 lg:gap:6 xl:gap-10 text-sm md:text-base">
                <button 
                    onClick={() => navigate('/profile', {
                        state: {
                            userdata: user
                        }
                    })}
                    className="w-8 h-8 flex justify-center items-center rounded-full border hover:shadow-sm cursor-default hover:border-sky-400"
                >

                    {user?.username.charAt(0)}
                </button>

                <div 
                    className="border p-1.5 rounded-full hover:border-sky-500"
                    onClick={() => toggleTheme()}
                >
                    {theme === 'light' 
                        ? <FiMoon size={16} />
                        : <MdOutlineWbSunny size={16} />
                    }
                </div>
            </div>
        </nav>
        </>
    )
}

function NavBox({ value, status }) {
    const { theme } = useTheme();
    
    return (
        <button
            value={value.toLowerCase()}
            className={`
            ${theme === 'light' && status === value.toLowerCase()
                ? 'bg-sky-200/90 border-gray-300' 
                : theme === 'light' 
                ? 'bg-white border-gray-400' 
                : 'bg-zinc-800 border-gray-500'
            }
            border
            hover:shadow-sm
          shadow-sky-400
            rounded-md py-1
            px-2 hover:translate-y-1 
            transition-all 
            delay-75
            duration-200 
            ease-linear text-sm
            md:text-base 
            tracking-wide
            cursor-default
        `}
        >
            {value}
        </button>
    );
}
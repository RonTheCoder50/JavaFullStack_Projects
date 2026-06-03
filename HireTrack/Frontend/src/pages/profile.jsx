import { useLocation, useNavigate } from "react-router"
import { useTheme } from "./theme";

export default function ProfilePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { theme } = useTheme();

    const userData = location.state?.userdata || {};
    const userInfo = JSON.parse(localStorage.getItem("user")) || {};

    const handleLogout = () => {
        if(!confirm('Are you sure for log out ?')) {
            return;
        }
        localStorage.clear();
        localStorage.setItem('theme', 'dark');
        navigate("/");
    };

    return (
        <section 
            className={`
                min-h-screen
                w-full  
                flex 
                justify-center 
                items-start 
                px-4 
                py-10   
                ${theme === 'light' ? 'bg-gray-50' : 'bg-zinc-900'} 
            `}
        >

            <div 
                className={`
                    w-full 
                    max-w-2xl 
                    rounded-2xl 
                    shadow-lg 
                    border 
                    overflow-hidden
                     ${theme === 'light' 
                        ? 'bg-white border-gray-100' 
                        : 'bg-zinc-900 border-gray-400'
                    }
                `}
            >

                <div className="flex items-center justify-between p-6 border-b border-gray-100">

                    <div className="flex items-center gap-5">

                        <div
                            className="
                                h-16 w-16 rounded-full
                                bg-black text-white
                                flex items-center justify-center
                                text-2xl font-semibold
                                uppercase
                            "
                        >
                            {userInfo?.username?.[0] || "U"}
                        </div>

                        <div className="flex flex-col">

                            <h2
                                className={`
                                    text-xl 
                                    font-semibold 
                                    ${theme === 'light' 
                                        ? 'text-gray-900' 
                                        : 'text-gray-300/90'
                                    }
                                `}
                            >
                                {userInfo?.username || "Unknown User"}
                            </h2>

                            <p className="text-sm text-gray-500">
                                {userInfo?.email || "No Email"}
                            </p>
                        </div>
                    </div>

                    <span className="text-sm text-gray-400">
                        Joined{" "}
                        {userInfo?.dateTime
                            ? userInfo.dateTime.split("T")[0]
                            : "N/A"}
                    </span>
                </div>

                <div className="p-6 flex flex-col gap-5">

                    <div
                        className={`
                            flex 
                            items-center 
                            justify-between
                            border 
                            border-gray-100
                            rounded-xl 
                            p-4
                            ${theme === 'light' ? 'bg-gray-50 ' : 'bg-gray-300'}
                        `}
                    >
                        <div className="flex flex-col gap-1">

                            <span className="text-sm text-gray-500">
                                Current Plan
                            </span>

                            <h3 className="text-lg font-semibold text-gray-900">
                                {userData?.plan || "Free"}
                            </h3>
                        </div>

                        <div className="text-right">

                            <span className="text-sm text-gray-500">
                                Remaining Limit
                            </span>

                            <h3 className="text-lg font-semibold text-gray-900">
                                {userData?.limit || 0}
                            </h3>
                        </div>
                    </div>

                    <div className="flex justify-end">

                        <button
                            onClick={handleLogout}
                            className="
                                bg-red-500 hover:bg-red-600
                                text-white
                                px-5 py-2.5
                                rounded-lg
                                font-medium
                                transition-all duration-200
                            "
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
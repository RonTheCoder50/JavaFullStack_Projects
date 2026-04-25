import { Button } from "@/components/ui/button";
import axios from "axios";

import { userInfoApiCall } from "./API";

export default function UserPanelPage({ userData, setUserData, filterData }) {
    const theme = localStorage.getItem('theme');
    const user = JSON.parse(localStorage.getItem('user'));
    const user_id = user.id;

    return (
        <section className={`w-full min-h-screen flex flex-col gap-16 items-center`}>
            <div className="w-full max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between">
                    <h1 className={`
                        text-3xl 
                        font-semibold   
                        tracking-tight
                        ${theme === 'dark' ? 'text-white/85' : 'text-gray-800'}
                    `}>
                        USERS
                    </h1>

                    <div className="text-sm text-gray-500">
                        {userData?.length-1 || 0} users
                    </div>
                </div>

                <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-violet-500 via-purple-400 to-transparent rounded-full" />
            </div>

            <ul className={`
                w-full max-w-[90%] 
                sm:max-w-[550px] 
                md:max-w-[750px]
                flex flex-col 
                gap-6 items-center
                p-1 mt-4
            `}>
                {filterData?.length > 0 
                    ? filterData?.map(data => {
                        if(data.id !== user_id) {
                            return <UserCard key={data.id} data={data} setUserData={setUserData} />
                        }
                    })
                    : userData?.map(data => {
                        if(data.id !== user_id) {
                            return <UserCard key={data.id} data={data} setUserData={setUserData} />
                        }
                    })
                }
            </ul>
        </section>
    )
}

function UserCard({ data, setUserData }) {
    const theme = localStorage.getItem('theme');
    const smooth = 'transition-all delay-75 ease-in-out duration-200';
    const token = localStorage.getItem('token');

    async function promoteUser() {
        if(data.role === 'ADMIN') {
            alert('already promoted as admin!!');
            return;
        }

        if(confirm('do you wanna promote this user as ADMIN ?')) {
            const api = await axios.put(`http://localhost:8080/auth/promote/${data.id}`, 
                {headers: {
                    authorization: `Bearer ${token}`
                }}
            );
            console.log(api.data);

            const response = await userInfoApiCall();
            setUserData(response.data);
        }
    }

    async function blockUser() {
        alert('Currently not available! Comming soon!');
    }

    async function deleteUser() {
        if(data.role === 'ADMIN') {
            alert('You cannot remove Admin!!');
            return;
        }

        if(confirm('do you wanna delete this user ?')) {
            const api = await axios.delete(`http://localhost:8080/auth/delete/${data.id}`,
                {headers: {
                    authorization: `Bearer ${token}`
                }}
            );
            console.log(api.data);

            const response = await userInfoApiCall();
            setUserData(response.data);
        }
    }

    return (
        <li
            className={`
                w-full 
                rounded-xl 
                border 
                p-4 
                shadow-sm 
                flex flex-col gap-4
                ${theme === 'dark' 
                    ? 'bg-gray-800 text-white/90 border-gray-700' 
                    : 'bg-white text-gray-800 border-gray-200'}
            `}
        >
            {/* Top Section */}
            <div className="flex justify-between items-start">
                {/* Left - User Info */}
                <div className="flex flex-col">
                    <span className="font-semibold text-base">
                        {data?.username}
                        {data?.role === 'ADMIN' ? ' | {ADMIN}' : ''}
                    </span>
                    <span className="text-xs opacity-70">
                        {data?.email}
                    </span>
                </div>

                {/* Right - Meta Info */}
                <div className="flex flex-col text-right">
                    <span className="text-sm font-medium">
                        {data?.role}
                    </span>
                    <span className="text-xs opacity-70">
                        {data?.joinDate}
                    </span>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gray-300/30"></div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
                <Button 
                    onClick={() => promoteUser()}
                    className={`
                        text-xs px-3 py-1 
                        text-green-500
                        ${theme === 'dark'
                            ? 'bg-black'
                            : 'bg-gray-200'
                        }
                        ${smooth}
                    `}
                >
                    Promote
                </Button>

                <Button 
                    onClick={() => blockUser()}
                    className={`
                        text-xs px-3 py-1 
                        text-pink-500
                        ${theme === 'dark'
                            ? 'bg-black'
                            : 'bg-gray-200'
                        }
                        ${smooth}
                    `}
                >
                    Block
                </Button>

                <Button 
                    onClick={() => deleteUser()}
                    className={`
                        text-xs px-3 py-1 
                        text-red-500
                        ${theme === 'dark'
                            ? 'bg-black'
                            : 'bg-gray-200'
                        }
                        ${smooth}
                    `}
                >
                    Delete
                </Button>
            </div>
        </li>
    );
}
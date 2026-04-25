import { useState } from "react";


import Navbar from "./navbarPage";
import { apiCall, userInfoApiCall } from "./API";
import UserPanelPage from "./adminDashboard";
import { Button } from "@/components/ui/button";
import PostPanelPage from "./postPanel";

export default function DashBoard() {
    const currTheme = localStorage.getItem('theme');
    const [blogData, setBlogData] = useState([]);
    const [search, setSearch] = useState('');
    const [theme, setTheme] = useState(
        currTheme ? currTheme : 'dark'
    );
    const [userData, setUsersdata] = useState([]);
    const [pannel, setTogglePanel] = useState('post');

    //on search blog filtering
    const filterData = blogData?.filter(blog => 
        blog.title.toLowerCase().includes(search.toLowerCase())
    );
    
    //on search user filtering
    const filterUserData = userData?.filter(user => 
        user.username.toLowerCase().includes(search.toLowerCase())
    );

    function handleTheme() {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
    }

    function togglePanel() {
        if(pannel === 'post') {
            setTogglePanel('user');
        } else {
            setTogglePanel('post');
        }
    }
 
    useState(() => {
        async function call() {
            const data = await apiCall();
            setBlogData(data);
        }

        call();
    }, []);

    useState(() => {
        async function call() {
            const data = await userInfoApiCall();
            setUsersdata(data);
            console.log(data);
        }

        call();
    }, []);

    const color = theme === 'dark' ? 'bg-gray-900 text-white/90' : 'bg-gradient-to-br from-gray-50 to-violet-50 text-gray-700';

    return (
    <section className={`
            w-full min-h-screen 
            flex flex-col gap-14
            ${color}
    `}>
        <Navbar 
            search={search}
            setSearch={setSearch}
            theme={theme}
            onToggleTheme={handleTheme}
            togglePanel={togglePanel}
            pannel={pannel}
        />

        {pannel === 'post'
            ? <PostPanelPage blogData={blogData} filterData={filterData} theme={theme}/>
            : <UserPanelPage userData={userData} setUserData={setUsersdata} filterData={filterUserData} />
        }
    </section>
    );
}




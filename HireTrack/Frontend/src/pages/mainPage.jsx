import { useEffect, useState } from "react"
import NavbarPage from "./navbar"
import DashBoardPage from "./dashboard"

import { 
    AnalysesDataTable,
    HistoryTable,
    UserInfoTable
} from "@/components-project/tables";

import {
    getHistoryAnalysisAPI,
    getUserDataAPI,
    fetchAdminDataAPI 
} from "@/API";

export default function MainPage() {
    const [status, setStatus] = useState('dashboard'); //dashboar, history, pricing.
    const [historyData, setHistoryData] = useState(null);
    const [data, setData] = useState(null); //userData!
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(false); 

    const user = JSON.parse(localStorage.getItem('user'));
    const isCurrentAdmin =  user?.roles.filter(role => role === 'ROLE_ADMIN');

    const [searchInput, setSearchInput] = useState('');
    const filterData = adminData?.userDataList?.filter(
        user => user.username.toLowerCase()
        .includes(searchInput.toLowerCase())
    );

    const filterAnalysisData = adminData?.analysesDataList?.filter(
        analysis =>
            analysis?.filename?.toLowerCase()
                .includes(searchInput.toLowerCase()) ||

            analysis?.username?.toLowerCase()
                .includes(searchInput.toLowerCase())
    );

    useEffect(() => {
        fetchAdminData();
    }, []);

    useEffect(() => {
        fetchHistoryData();
    }, []);

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if(data?.isBlock === null) {
            localStorage.setItem('block', 'Active');
        } else {
            data?.isBlock 
            ? localStorage.setItem('block', 'Blocked')
            : localStorage.setItem('block', 'Active')
        }
    }, [data]);
    

    function handleLoading() {
        setLoading(!loading);
    }

    async function fetchUserData() {
        try {
            setLoading(true);
    
            const resp = await getUserDataAPI();
            console.log('user data:', resp);
            setData(resp);
    
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    async function fetchAdminData() {
        const response = await fetchAdminDataAPI();
        if(response) {
            setAdminData(response);
            console.log('admin data: ', response);
        } else {
            alert('failed to fetch user count!');
        }
    }

    async function fetchHistoryData() {
        try {
            const data = await getHistoryAnalysisAPI();
            setHistoryData(data);
        } catch(err) {
            console.log(err);
        }
    }

    function handleStatus(val) {
        if(val === undefined || val === status) {
            return;
        }
        setStatus(val);
    }

    function handleSearchInput(e) {
        const val = e.target.value;
        console.log('input value: ', val);
        console.log('filter search data: ', filterData);
        setSearchInput(val);
    }

    if(localStorage.getItem('block') === 'Blocked') {
        return (
            <p className="text-xl lg:text-2xl font-medium tracking-wide text-center mt-28">
                user is blocked!
            </p>
        );
    }
    
    return (
        <section className="w-full min-h-screen flex flex-col gap-14 bg-gray-200">
            <NavbarPage 
                status={status}
                handleStatus={handleStatus}
            />

            {status === 'dashboard' &&
                <DashBoardPage
                    user={user}
                    data={isCurrentAdmin.length === 1 ? adminData : data}
                    loading={handleLoading}
                    refresh={isCurrentAdmin.length === 1
                        ? fetchAdminData 
                        : fetchUserData
                    }
                />
            }
            
            {status === 'history' && 
                <HistoryTable
                    data={historyData}
                    refresh={fetchHistoryData}
                />
            }

            {status === 'userdata' && 
                <UserInfoTable 
                    refresh={fetchAdminData}
                    data={filterData?.length > 0 
                        ? filterData 
                        : adminData?.userDataList
                    }
                    value={searchInput}
                    handleInput={handleSearchInput}
                />
            }

            {status === 'analyses' && 
                <AnalysesDataTable 
                    data={filterAnalysisData?.length > 0 
                        ? filterAnalysisData
                        : adminData?.analysesDataList
                    }
                    value={searchInput}
                    handleInput={handleSearchInput}
                />
            }
        </section>
    );
}   
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
    fetchAdminDataAPI, 
    fetchUserDataListAPI
} from "@/API";
import PriceSection from "./pricePage";
import { useTheme } from "./theme";

export default function MainPage() {
    const [status, setStatus] = useState('dashboard'); //dashboar, history, pricing.
    const [historyData, setHistoryData] = useState(null);
    const [data, setData] = useState(null); //userData!
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(false); 

    const [userDataList, setUserDataList] = useState(null);
    const [sortBy, setSortBy] = useState('id');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(0);

    const user = JSON.parse(localStorage.getItem('user'));
    const isCurrentAdmin = user?.roles.filter(role => role === 'ROLE_ADMIN');

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

    const { theme } = useTheme();

    useEffect(() => {
        fetchAdminData();
        fetchHistoryData();
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

    useEffect(() => {
        async function fetchUserDataList() {
            const response = await fetchUserDataListAPI(searchInput, page, 5, sortBy, order);
            if(response) {
                setUserDataList(response);
            }
        }

        if(status === 'userdata') {
            fetchUserDataList();
        }
    }, [status, searchInput, sortBy, order, page]);
    
    

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
        setSearchInput(val);
    }

    function handleSortBy(val) {
        setSortBy(val);
    }
    function handleOrder(val) {
        setOrder(val);
    }

    function handlePage(val) {
        const first = userDataList?.first;
        const last = userDataList?.last;
        
        if(val.trim() === 'prev') {
            if(first) {
                setPage(userDataList?.totalPages-1 || 0);
            } else {
                setPage(userDataList?.pageable?.pageNumber-1);
            }
        } else {
            if(last) {
                setPage(0);
            } else {
                setPage(userDataList?.pageable?.pageNumber+1);
            }
        }
    }

    if(localStorage.getItem('block') === 'Blocked') {
        return (
            <p className="text-xl lg:text-2xl font-medium tracking-wide text-center mt-28">
                user is blocked!
            </p>
        );
    }
    
    return (
        <section 
            className={`
                w-full 
                min-h-screen 
                flex 
                flex-col 
                gap-14 
                 ${theme === 'light' ? 'bg-gray-50' : 'bg-zinc-900'}
            `}
        >
            <NavbarPage 
                data={data}
                status={status}
                handleStatus={handleStatus}
            />

            {status === 'dashboard' &&
                <DashBoardPage
                    user={user}
                    data={isCurrentAdmin?.length === 1 ? adminData : data}
                    isLoad={loading}
                    setLoading={setLoading}
                    refresh={isCurrentAdmin?.length === 1
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
                userDataList 
                ? <UserInfoTable 
                    refresh={fetchAdminData}
                    data={userDataList?.content}
                    value={searchInput}
                    handleInput={handleSearchInput}
                    sortBy={sortBy}
                    order={order}
                    handleSortBy={handleSortBy}
                    handleOrder={handleOrder}
                    page={page}
                    handlePage={handlePage}
                />
                : <p className="text-center text-2xl font-medium mt-14">
                    Loading....
                </p>
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

            {status === 'pricing' && 
                <PriceSection />
            }
        </section>
    );
}   
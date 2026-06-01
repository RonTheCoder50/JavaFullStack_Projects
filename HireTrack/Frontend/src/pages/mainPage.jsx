import { useCallback, useEffect, useState } from "react"
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
    const [data, setData] = useState(null); //userData!
    const [historyData, setHistoryData] = useState(null);
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [searchInput, setSearchInput] = useState('');
    const { theme } = useTheme();

    //pagination dynamic data for (admin -> userlist, analysislist)  
    const [dynamicData, setDynamicData] = useState(null); 
    const [sortBy, setSortBy] = useState('id');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(0);

    const user = JSON.parse(localStorage.getItem('user'));
    const isCurrentAdmin = user?.roles.filter(role => role === 'ROLE_ADMIN');

    const filterAnalysisData = adminData?.analysesDataList?.filter(
        analysis =>
            analysis?.filename?.toLowerCase()
                .includes(searchInput.toLowerCase()) ||

            analysis?.username?.toLowerCase()
                .includes(searchInput.toLowerCase())
    );

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

    useEffect(() => {
        if(isCurrentAdmin.length > 0 && adminData === null) {
            fetchAdminData();
        }
    }, [isCurrentAdmin, adminData]);

    useEffect(() => {
        async function fetchUserDataList() {
            const response = await fetchUserDataListAPI(searchInput, page, 5, sortBy, order);
            if(response) {
                setDynamicData(response);
            }
        }

        if(status === 'userdata') {
            fetchUserDataList();
        }
    }, [status, searchInput, sortBy, order, page]);

    //pagination + sort + search for user -> history analyses table
    const fetchHistoryData = useCallback(async () => {
        if(historyData?.length === 1) return;
        const response = await getHistoryAnalysisAPI(
            searchInput,
            page,
            10,
            sortBy,
            order
        );

        if(response) {
            setHistoryData(response);
        }
    }, [searchInput, page, sortBy, order]);

    useEffect(() => {
        if(status !== 'history') return;

        fetchHistoryData();
    }, [status, fetchHistoryData]);

    async function fetchAdminData() {
        const response = await fetchAdminDataAPI();
        if(response) {
            setAdminData(response);
            console.log('admin data: ', response);
        } else {
            alert('failed to fetch user count!');
        }
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

    const handleStatus = (val) => {
        if (val === undefined || val === status) return;
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
        const first = dynamicData?.first;
        const last = dynamicData?.last;

        let pgdata;
        if(status === 'userdata' || status === 'analyses') {
            pgdata = dynamicData;
        } else {
            pgdata = historyData;
        }
        
        if(val.trim() === 'prev') {
            if(first) {
                setPage(pgdata?.totalPages-1 || 0);
            } else {
                setPage(pgdata?.pageable?.pageNumber-1);
            }
        } else {
            if(last) {
                setPage(0);
            } else {
                setPage(pgdata?.pageable?.pageNumber+1);
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
                historyData
                ? <HistoryTable
                    data={historyData?.content}
                    refresh={fetchHistoryData}

                    value={searchInput}
                    handleInput={handleSearchInput}

                    sortBy={sortBy}
                    handleSortBy={handleSortBy}

                    order={order}
                    handleOrder={handleOrder}

                    page={page}
                    handlePage={handlePage}
                    isLastPage={historyData?.last}
                />
                : status === 'history' && <p className="text-center text-2xl font-medium mt-14">
                    Loading...
                </p>
            }

            {status === 'userdata' && 
                dynamicData
                ? <UserInfoTable 
                    refresh={fetchAdminData}
                    data={dynamicData?.content}
                    value={searchInput}
                    handleInput={handleSearchInput}
                    sortBy={sortBy}
                    order={order}
                    handleSortBy={handleSortBy}
                    handleOrder={handleOrder}
                    page={page}
                    handlePage={handlePage}
                />
                : status === 'userdata' && <p className="text-center text-2xl font-medium mt-14">
                    Loading...
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
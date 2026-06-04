import { useState, useEffect, useCallback } from "react";
import {
    fetchAdminDataAPI,
    fetchUserDataListAPI,
    fetchAnalysesTableDataAPI
} from "@/API";

import { 
    DashboardUserGrowthChart, 
    DashboardAnalysisChart,
    DashboardDonutChart
} from "@/components-project/charts";

import AdminNavBar from "./adminNavbar";

import HeroCard from "@/components-project/herocard";

import { AnalysesDataTable, UserInfoTable } from "@/components-project/tables";

export default function AdminDashBoard() {
    // all admin data, api call logic & UI here..
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(
        localStorage.getItem('status') || 'dashboard'
    );
    const user = JSON.parse(localStorage.getItem('user'));

    //pagination + sort api data states for tables.
    const [userListData, setUserListData] = useState(null); // Total user data.
    const [analysesListData, setAnalysesListData] = useState(null); // Total analyses data.
    const [userSearchInput, setUserSearchInput] = useState('');
    const [analysisSearchInput, setAnalysisSearchInput] = useState('');
    
    const [userConfig, setUserConfig] = useState({
        page: 0,
        sort: "dateOfJoining",
        order: "asc"
    });
    const [analysisConfig, setAnalysisConfig] = useState({
        page: 0,
        sort: "filename",
        order: "asc"
    });

    useEffect(() => {
        localStorage.setItem('status', status);
    }, [status]);

    //admin dashboard basic data.
    useEffect(() => { 
        async function fetchAdminData() {
            const response = await fetchAdminDataAPI();
            if(response) {
                setData(response);
            } else {
                alert('failed to fetch user count!');
            }
        }
        
        if(status === 'dashboard') {
            fetchAdminData();
        }
        
    }, [status]);

    //analyses table data.
    useEffect(() => {
        async function fetchAnalysesListData() {
            const response = 
                await fetchAnalysesTableDataAPI(
                    analysisSearchInput,
                    analysisConfig.page,
                    5,
                    analysisConfig.sort,
                    analysisConfig.order
                );
            if(response) {
                setAnalysesListData(response);
            }
        }

        if(status === 'analyses') {
            fetchAnalysesListData();
        }
    }, [status, analysisSearchInput, analysisConfig.sort, analysisConfig.order, analysisConfig.page]);

    //user table data
    const fetchUserListData = useCallback(async () => {
        const response = 
            await fetchUserDataListAPI(
                userSearchInput,
                userConfig.page,
                5,
                userConfig.sort,
                userConfig.order
            );

        if(response) {
            setUserListData(response);
        }
    }, [userSearchInput, userConfig.sort, userConfig.order, userConfig.page]);

    useEffect(() => {
        fetchUserListData();
    }, [fetchUserListData]);


    function handleUserSearchInput(e) {
        const val = e.target.value;
        setUserSearchInput(val);
    }

    function handleAnalysisSearchInput(e) {
        const val = e.target.value;
        setAnalysisSearchInput(val);
    }

    const handleStatus = (val) => {
        if (val === undefined || val === status) return;
        setStatus(val?.toLowerCase().trim());
    }

    function handleUserSortBy(val) {
        setUserConfig({ ...userConfig, sort: val.trim() });
    }

    function handleAnalysisSortBy(val) {
        setAnalysisConfig({ ...analysisConfig, sort: val.trim() });
    }

    function handleUserOrder(val) {
        setUserConfig({ ...userConfig, order: val });
    }

    function handleAnalysisOrder(val) {
        setAnalysisConfig({ ...analysisConfig, order: val});
    }

    function handleUserPage(val) {
        if(val.trim() === 'prev') {
            setUserConfig({...userConfig, page: userListData?.pageable?.pageNumber-1});
        } else {
            setUserConfig({ ...userConfig, page: userListData?.pageable?.pageNumber+1 });
        }
    }

    function handleAnalysisPage(val) {
        if(val.trim() === 'prev') {
            setAnalysisConfig({...analysisConfig, page: analysesListData?.pageable?.pageNumber-1});
        } else {
            setAnalysisConfig({ ...analysisConfig, page: analysesListData?.pageable?.pageNumber+1 });
        }
    }

    return (
        <section 
            className={`
                    w-full
                    min-h-screen 
                    flex 
                    flex-col 
                    items-center
                    gap-16
            `}
        >
                <AdminNavBar 
                    status={status}
                    handleStatus={handleStatus}
                />

                {status === 'dashboard' && 
                    <div className="w-full flex flex-col items-center gap-16">  
                        <h1 className={`poppins-medium text-xl md:text-2xl xl:text-4xl text-center`}>
                            Hello, {user?.username} 👋
                        </h1>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-8 gap-6 place-items-center place-content-center p-4">
                            <HeroCard
                                name={'Total Users'}
                                value={data?.totalUsers || 0}
                            />

                            <HeroCard
                                name={'Total Analyses'}
                                value={data?.totalAnalyses || 0}
                            />

                            <HeroCard
                                name={'Todays Analyses'}
                                value={data?.todayAnalyses || 0}
                            />

                            <HeroCard
                                name={'Average ATS Score'}
                                value={data?.avgAtsScore.toFixed(2) || 0}
                            />
                        </div>
                        
                        <DashboardUserGrowthChart />

                        <DashboardAnalysisChart />

                        <DashboardDonutChart data={data?.planData} />
                    </div>
                }

                {status === 'userdata' && 
                    userListData
                    ? <UserInfoTable 
                        refresh={fetchUserListData}
                        data={userListData?.content}

                        value={userSearchInput}
                        handleInput={handleUserSearchInput}

                        sortBy={userConfig.sort}
                        order={userConfig.order}

                        handleSortBy={handleUserSortBy}
                        handleOrder={handleUserOrder}

                        page={userConfig.page}
                        handlePage={handleUserPage}

                        isLastPage={userListData?.last}
                    />
                    : status === 'userdata' &&
                    <p className="text-center text-2xl font-medium mt-14">
                        Loading...
                    </p>
                }

                {status === 'analyses' &&
                    analysesListData
                    ? <AnalysesDataTable
                        data={analysesListData?.content}

                        value={analysisSearchInput}
                        handleInput={handleAnalysisSearchInput}

                        sortBy={analysisConfig.sort}
                        order={analysisConfig.order}

                        handleSortBy={handleAnalysisSortBy}
                        handleOrder={handleAnalysisOrder}

                        page={analysisConfig.page}
                        handlePage={handleAnalysisPage}

                        isLastPage={analysesListData?.last}
                    />
                    : status === 'analyses' &&
                    <p className="text-center text-2xl font-medium mt-14">
                        Loading...
                    </p> 
                }
        </section>
    );
}


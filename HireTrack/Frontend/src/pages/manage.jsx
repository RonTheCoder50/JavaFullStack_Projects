import AdminDashBoard from "./adminDashboard";
import UserDashBoard from "./userDashboard";

export default function ManagerComponenet() {
    const user = JSON.parse(localStorage.getItem('user'));

    if(user?.roles?.includes('ROLE_ADMIN')) {
        return <AdminDashBoard />
    }
 
    return <UserDashBoard />
}
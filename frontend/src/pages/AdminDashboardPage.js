import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AdminDashboard from "../components/AdminDashboard/Admin";
import Sidebar from "../components/AdminDashboard/SideBar";
import TopBar from "../components/AdminDashboard/TopBar";

export default function AfterLoginPage() {
  return (
    <div className="appShell">
        {/* <Sidebar />
        <TopBar /> */}
        <AdminDashboard />
    </div>
  );
}
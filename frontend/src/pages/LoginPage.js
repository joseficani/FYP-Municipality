import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import NewsListPage from "../components/News/NewsListPage";
import SignUpPage from "../components/BeforeLogin/SignUp";
import LoginPage from "../components/BeforeLogin/Login";

export default function NewsPage() {
  return (
    <div className="appShell">
      <LoginPage />
    </div>
  );
}
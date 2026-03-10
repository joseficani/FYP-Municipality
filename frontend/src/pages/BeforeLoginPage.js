import Header from "../components/Header/Header";
import BeforeLoginContent from "../components/BeforeLogin/BeforeLoginContent";
import Footer from "../components/Footer/Footer";

export default function AfterLoginPage() {
  return (
    <div className="appShell">
      <Header />
      <BeforeLoginContent />
    </div>
  );
}
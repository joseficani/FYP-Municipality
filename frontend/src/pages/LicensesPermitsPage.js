import Header from "../components/Header/Header";
import MainContent from "../components/MainContent/MainContent";
import Footer from "../components/Footer/Footer";
import LicensesPermits from "../components/License&Permits/LicensesPermits";

export default function AfterLoginPage() {
  return (
    <div className="appShell">
      <Header solid/>
      <LicensesPermits />
      <Footer />
    </div>
  );
}
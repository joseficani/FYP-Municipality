import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import NewsDetailsPage from "../components/News/NewsDetailsPage";

export default function NewsDetailsPageWrapper() {
  return (
    <div className="appShell">
      <Header solid />
      <NewsDetailsPage />
      <Footer />
    </div>
  );
}
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import NewsListPage from "../components/News/NewsListPage";

export default function NewsPage() {
  return (
    <div className="appShell">
      <Header solid />
      <NewsListPage />
      <Footer />
    </div>
  );
}
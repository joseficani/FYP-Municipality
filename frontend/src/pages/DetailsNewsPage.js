import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { NewsDetailsPage } from "../components/News/NewsModules";

export default function NewsDetails() {
  return (
    <div className="appShell">
      <Header solid />
      <NewsDetailsPage />
      <Footer />
    </div>
  );
}
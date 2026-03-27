import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Projects from "../components/Project&Tenders/Projects";

export default function ProjectsPage() {
  return (
    <div className="appShell">
      <Header />
      <Projects />
      <Footer />
    </div>
  );
}
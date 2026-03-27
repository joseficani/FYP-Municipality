import "./Projects.css";
import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Paperclip,
  Clock,
  FolderOpen,
  FileText,
  DollarSign,
  CalendarClock,
} from "lucide-react";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Infrastructure",
    "Technology",
    "Environment",
    "Education",
    "Healthcare",
  ];

  const phases = ["Planning", "Tender Open", "Review", "Awarded"];

  const categoryColors = {
    Infrastructure: "#E67E22",
    Technology: "#3498DB",
    Environment: "#27AE60",
    Education: "#9B59B6",
    Healthcare: "#E74C3C",
  };

  const projects = [
    {
      id: "1",
      title: "Downtown Bridge Rehabilitation",
      description:
        "Comprehensive structural assessment and rehabilitation of the Main Street Bridge including deck replacement, bearing repairs, and seismic retrofitting.",
      category: "Infrastructure",
      budgetMin: 2500000,
      budgetMax: 3200000,
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      qualifications: ["Licensed Contractor", "Bridge Certification", "ISO 9001"],
      documents: [{ name: "Technical Specifications.pdf", url: "#" }],
      currentPhase: "Tender Open",
    },
    {
      id: "2",
      title: "Smart Traffic Management System",
      description:
        "Implementation of AI-powered traffic signal optimization across 45 intersections with real-time monitoring dashboard and predictive analytics.",
      category: "Technology",
      budgetMin: 850000,
      budgetMax: 1200000,
      deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      qualifications: [
        "IT Infrastructure",
        "IoT Certification",
        "Municipal Experience",
      ],
      documents: [{ name: "System Requirements.pdf", url: "#" }],
      currentPhase: "Tender Open",
    },
    {
      id: "3",
      title: "Riverside Park Restoration",
      description:
        "Ecological restoration of 12-acre riverside park including native plantings, wetland rehabilitation, and sustainable stormwater management systems.",
      category: "Environment",
      budgetMin: 450000,
      budgetMax: 620000,
      deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      qualifications: ["Environmental Certification", "Landscape Architecture"],
      documents: [{ name: "Environmental Assessment.pdf", url: "#" }],
      currentPhase: "Planning",
    },
    {
      id: "4",
      title: "Elementary School HVAC Upgrade",
      description:
        "Complete HVAC system replacement for Lincoln Elementary including energy-efficient units, improved air filtration, and building automation integration.",
      category: "Education",
      budgetMin: 180000,
      budgetMax: 250000,
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      qualifications: ["HVAC License", "School District Approved", "Bonded"],
      documents: [{ name: "Building Plans.pdf", url: "#" }],
      currentPhase: "Review",
    },
    {
      id: "5",
      title: "Community Health Center Equipment",
      description:
        "Procurement and installation of diagnostic imaging equipment including digital X-ray, ultrasound, and patient monitoring systems.",
      category: "Healthcare",
      budgetMin: 750000,
      budgetMax: 950000,
      deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
      qualifications: [
        "Medical Equipment Vendor",
        "FDA Compliance",
        "Installation Certified",
      ],
      documents: [{ name: "Equipment Specifications.pdf", url: "#" }],
      currentPhase: "Tender Open",
    },
    {
      id: "6",
      title: "Water Treatment Plant Expansion",
      description:
        "Phase 2 expansion of municipal water treatment facility to increase capacity by 40% with advanced filtration and UV disinfection systems.",
      category: "Infrastructure",
      budgetMin: 4200000,
      budgetMax: 5100000,
      deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      qualifications: [
        "Water Systems License",
        "EPA Certified",
        "ISO 14001",
        "Bonded",
      ],
      documents: [
        { name: "Engineering Plans.pdf", url: "#" },
        { name: "Environmental Impact.pdf", url: "#" },
      ],
      currentPhase: "Planning",
    },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;

      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const formatBudget = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${(amount / 1000).toFixed(0)}K`;
  };

  const getDaysRemaining = (deadline) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getDeadlineClass = (days) => {
    if (days < 7) return "pjDeadline urgent";
    if (days < 14) return "pjDeadline warning";
    return "pjDeadline safe";
  };

  const stats = [
    {
      label: "Total Projects",
      value: "142",
      icon: <FolderOpen size={24} />,
    },
    {
      label: "Open Tenders",
      value: "38",
      icon: <FileText size={24} />,
    },
    {
      label: "Total Budget",
      value: "$24.5M",
      icon: <DollarSign size={24} />,
    },
    {
      label: "Upcoming Deadlines",
      value: "12",
      icon: <CalendarClock size={24} />,
    },
  ];

  return (
    <div className="projectsPage">
      <main>
        {/* HERO */}
        <section className="pjHeroSection">
          <div className="pjHeroOverlay"></div>

          <div className="pjHeroContent">
            <div className="pjBreadcrumb">
              <span>Home</span>
              <span>/</span>
              <span>Services</span>
              <span>/</span>
              <span className="pjActivePage">Projects &amp; Tenders</span>
            </div>

            <h1>Projects &amp; Tenders</h1>
            <p>Browse open opportunities and submit your proposals.</p>
          </div>
        </section>

        {/* FLOATING FILTER / SEARCH BAR */}
        <section className="pjFilterHeroSection">
          <div className="pjContainer">
            <div className="pjFilterBox">
              <div className="pjFilterRow">
                <div className="pjCategoryWrap">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`pjCategoryBtn ${
                        selectedCategory === category ? "active" : ""
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                <div className="pjBudgetBox">
                  <SlidersHorizontal size={16} />
                  <span>Budget: $0K - $5.0M</span>
                </div>

                <div className="pjSearchWrap">
                  <Search className="pjSearchIcon" size={16} />
                  <input
                    type="search"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pjSearchInput"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="pjStatsSection">
          <div className="pjContainer">
            <div className="pjStatsGrid">
              {stats.map((stat, index) => (
                <div className="pjStatCard" key={index}>
                  <div className="pjStatText">
                    <p className="pjStatLabel">{stat.label}</p>
                    <p className="pjStatValue">{stat.value}</p>
                  </div>
                  <div className="pjStatIcon">{stat.icon}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS GRID */}
        <section className="pjProjectsSection">
          <div className="pjContainer">
            {filteredProjects.length > 0 ? (
              <div className="pjProjectsGrid">
                {filteredProjects.map((project) => {
                  const daysRemaining = getDaysRemaining(project.deadline);
                  const categoryColor = categoryColors[project.category];
                  const currentPhaseIndex = phases.indexOf(project.currentPhase);

                  return (
                    <article className="pjCard" key={project.id}>
                      <div
                        className="pjCategoryStripe"
                        style={{ backgroundColor: categoryColor }}
                      ></div>

                      <div className="pjCardBody">
                        <div className="pjCardTop">
                          <div className="pjCardTitleWrap">
                            <span
                              className="pjCategoryBadge"
                              style={{
                                backgroundColor: `${categoryColor}20`,
                                color: categoryColor,
                              }}
                            >
                              {project.category}
                            </span>
                            <h3 className="pjCardTitle">{project.title}</h3>
                          </div>

                          <div className={getDeadlineClass(daysRemaining)}>
                            <Clock size={14} />
                            <span>{daysRemaining}d</span>
                          </div>
                        </div>

                        <p className="pjCardDescription">{project.description}</p>

                        <div className="pjQualifications">
                          {project.qualifications.map((qual, idx) => (
                            <span className="pjQualTag" key={idx}>
                              {qual}
                            </span>
                          ))}
                        </div>

                        <div className="pjBudgetDocsRow">
                          <div>
                            <span className="pjBudgetLabel">Budget Range</span>
                            <span className="pjBudgetValue">
                              {formatBudget(project.budgetMin)} –{" "}
                              {formatBudget(project.budgetMax)}
                            </span>
                          </div>

                          <div className="pjDocsWrap">
                            {project.documents.map((doc, idx) => (
                              <a href={doc.url} className="pjDocLink" key={idx}>
                                <Paperclip size={14} />
                                <span>{doc.name}</span>
                              </a>
                            ))}
                          </div>
                        </div>

                        <button type="button" className="pjApplyBtn">
                          Apply to Tender
                        </button>

                        <div className="pjTimeline">
                          {phases.map((phase, phaseIndex) => (
                            <div className="pjTimelineItem" key={phase}>
                              <div
                                className={`pjTimelineDot ${
                                  phaseIndex <= currentPhaseIndex ? "active" : ""
                                }`}
                              ></div>
                              <span
                                className={`pjTimelineLabel ${
                                  phaseIndex <= currentPhaseIndex ? "active" : ""
                                }`}
                              >
                                {phase}
                              </span>
                              {phaseIndex < phases.length - 1 && (
                                <div
                                  className={`pjTimelineLine ${
                                    phaseIndex < currentPhaseIndex ? "active" : ""
                                  }`}
                                ></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="pjEmptyBox">
                <p>No projects found matching your criteria.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="pjClearBtn"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
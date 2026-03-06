import "./NewsListPage.css";
import { useMemo, useRef, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NewsListPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const updatesRef = useRef(null);
  const navigate = useNavigate();

  const newsItems = [
    {
      id: 1,
      category: "Announcement",
      title: "Annual Community Clean-Up Day Scheduled for Next Saturday",
      summary:
        "Join your neighbors in making our city shine! We will be meeting at the Town Square at 9:00 AM for supplies and assignments.",
      date: "Oct 05, 202",
      time: "",
      imageUrl:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
      featured: true,
    },
  {

      id: 2,

      category: "Announcements",

      title: "New Online Payment System for Utility Bills Now Live",

      summary:

        "Residents can now pay water and waste management bills online through our secure portal. Paperless billing options are also available.",

      date: "18 March 2026",

      time: "7:00 PM",

      imageUrl:

       "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2000",

      featured: false,

    },

    {

      id: 3,

      category: "Notice",

      title: "Road Closure Notice",

      summary:

        "Main Street between 4th and 8th Avenue will be closed for resurfacing starting Monday. Please follow posted detours.",

      date: "10 March 2026",

      time: "8:00 AM – 4:00 PM",

      imageUrl:

         "https://images.unsplash.com/photo-1584209987402-9214cb22c5c8?auto=format&fit=crop&q=80&w=2000",

      featured: false,

    },

    {

      id: 4,

      category: "Event",

      title: "Public Library Hosting Local Author Book Signing",

      summary:

         "Meet best-selling mystery author James Wright this Friday at the Main Library. Discussion and Q&A to follow.",

      date: "20 March 2026",

      time: "1:00 AM",

      imageUrl:

       "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=2000",

      featured: false,

    },

    {

      id: 5,

      category: "Notice",

      title: "Winter Parking Regulations Go Into Effect",

      summary:

       "A reminder to all residents that overnight street parking bans will begin next month to facilitate snow removal.",

      date: "12 April 2026",

      time: "10:00 AM",

      imageUrl:

         "https://images.unsplash.com/photo-1477516960533-5b1432f8373b?auto=format&fit=crop&q=80&w=2000",

      featured: false,

    },

    {

      id: 6,

      category: "Announcement",

      title: "City Council Meeting Highlights: September",

      summary:

       "Summary of key decisions made during the September City Council meetings, including budget approvals and zoning changes.",

      date: "30 March 2026",

      time: "10:00 AM",

      imageUrl:

       "https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=2000",

      featured: false,

    },

    {

      id: 7,

      category: "Community",

      title: "Community Tree Planting",

      summary:

        "Join us for a community tree-planting activity near the town entrance.",

      date: "30 March 2026",

      time: "10:00 AM",

      imageUrl:

        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",

      featured: false,

    },

    {

      id: 8,

      category: "Community",

      title: "Community Tree Planting",

      summary:

        "Join us for a community tree-planting activity near the town entrance.",

      date: "30 March 2026",

      time: "10:00 AM",

      imageUrl:

        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",

      featured: false,

    },

    {

      id: 9,

      category: "Community",

      title: "Community Tree Planting",

      summary:

        "Join us for a community tree-planting activity near the town entrance.",

      date: "30 March 2026",

      time: "10:00 AM",

      imageUrl:

        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",

      featured: false,

    },
  ];

  const categories = ["All", "Announcement", "Notice", "Community"];
  const featuredNews = newsItems.find((item) => item.featured);

  const filteredNews = useMemo(() => {
    return newsItems.filter((item) => {
      if (item.featured) return false;
      if (selectedCategory === "All") return true;
      return item.category === selectedCategory;
    });
  }, [selectedCategory, newsItems]);

  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(filteredNews.length / itemsPerPage));

  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const scrollToUpdates = () => {
    if (updatesRef.current) {
      updatesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);

    requestAnimationFrame(() => {
      scrollToUpdates();
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    requestAnimationFrame(() => {
      scrollToUpdates();
    });
  };

  const getBadgeClass = (category) => {
    switch (category) {
      case "Announcement":
        return "newsBadge newsBadgeAnnouncement";
      case "Notice":
        return "newsBadge newsBadgeNotice";
      case "Community":
        return "newsBadge newsBadgeCommunity";
      default:
        return "newsBadge";
    }
  };

  return (
    <div className="newsPage">
      <section className="newsHeroHeader">
        <div className="newsContainer">
          <h1 className="newsPageTitle">News &amp; Updates</h1>

          <div className="newsSubtitleRow">
            <p className="newsPageSubtitle">
              Stay informed about the latest happenings in your community.
            </p>

            <button
              className="eventsButton"
              type="button"
              onClick={() => navigate("/events")}
            >
              Check our latest events →
            </button>
          </div>
        </div>
      </section>

      <div className="newsContainer newsMainContent">
        {selectedCategory === "All" && featuredNews && (
          <section className="featuredSection">
            <div className="featuredCard">
              <img
                src={featuredNews.imageUrl}
                alt={featuredNews.title}
                className="featuredBg"
              />
              <div className="featuredOverlay" />

              <div className="featuredContent">
                <span className={getBadgeClass(featuredNews.category)}>
                  {featuredNews.category}
                </span>

                <h2 className="featuredTitle">{featuredNews.title}</h2>

                <p className="featuredSummary">{featuredNews.summary}</p>

                <div className="featuredMeta">
                  <span className="featuredMetaItem">
                    <Calendar size={14} />
                    {featuredNews.date}
                  </span>
                </div>

                <button
                  className="featuredBtn"
                  type="button"
                  onClick={() => navigate(`/news/${featuredNews.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </section>
        )}

        <section className="updatesSection" ref={updatesRef}>
          <h3 className="updatesTitle">Recent Updates</h3>

          <div className="categoryTabs">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`categoryTab ${
                  selectedCategory === category ? "categoryTabActive" : ""
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="newsGrid">
            {paginatedNews.map((item) => (
              <article key={item.id} className="newsCard">
                <div className="newsCardImageWrap">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="newsCardImage"
                  />
                  <span className={getBadgeClass(item.category)}>
                    {item.category}
                  </span>
                </div>

                <div className="newsCardBody">
                  <h4 className="newsCardTitle">{item.title}</h4>

                  <p className="newsCardSummary">{item.summary}</p>

                  <div className="newsCardMeta">
                    <div className="newsMetaLine">
                      <span className="newsMetaIcon">
                        <Calendar size={12} />
                      </span>
                      <span>Date: {item.date}</span>
                    </div>

                    <div className="newsMetaLine">
                      <span className="newsMetaIcon">
                        <Clock size={12} />
                      </span>
                      <span>Time: {item.time}</span>
                    </div>
                  </div>

                  <div className="newsCardFooter">
                    <button
                      className="newsCardBtn"
                      type="button"
                      onClick={() => navigate(`/news/${item.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {paginatedNews.length === 0 && (
            <div className="newsEmpty">
              <p>No updates found for this category.</p>
            </div>
          )}

          {filteredNews.length > 0 && (
            <div className="paginationWrap">
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;

                return (
                  <button
                    key={pageNumber}
                    type="button"
                    className={`pageBtn ${
                      currentPage === pageNumber ? "pageBtnActive" : ""
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {totalPages > 2 && <span className="pageDots">...</span>}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
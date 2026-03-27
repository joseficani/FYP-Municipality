import "./NewsModules.css";
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Calendar, Clock, User, Paperclip, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api";

export function NewsListPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const updatesRef = useRef(null);
  const navigate = useNavigate();

  const categories = ["All", "Announcement", "Notice", "Community", "Event"];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/news`);
        setNewsItems(res.data.data || []);
      } catch (error) {
        console.error("Fetch news error:", error);
        console.error("Server response:", error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const featuredNews = newsItems.find((item) => item.featured);

  const filteredNews = useMemo(() => {
    return newsItems.filter((item) => {
      if (selectedCategory === "All") {
        return !item.featured;
      }
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
      case "Event":
        return "newsBadge newsBadgeEvent";
      default:
        return "newsBadge";
    }
  };

  if (loading) {
    return (
      <div className="newsPage">
        <div className="newsContainer" style={{ padding: "2rem" }}>
          <p>Loading news...</p>
        </div>
      </div>
    );
  }

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
              onClick={() => navigate("/events-news")}
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
                  onClick={() => navigate(`/news/${featuredNews._id}`)}
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
              <article key={item._id} className="newsCard">
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
                      <span>Time: {item.time || "—"}</span>
                    </div>
                  </div>

                  <div className="newsCardFooter">
                    <button
                      className="newsCardBtn"
                      type="button"
                      onClick={() => navigate(`/news/${item._id}`)}
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
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export function NewsDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/news/${id}`);
        setItem(res.data.data || null);
      } catch (error) {
        console.error("Fetch news details error:", error);
        console.error("Server response:", error.response?.data);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNewsItem();
    }
  }, [id]);

  const getBadgeClass = (category) => {
    if (category === "Announcement") {
      return "detailBadge detailBadgeAnnouncement";
    }
    if (category === "Notice") {
      return "detailBadge detailBadgeNotice";
    }
    if (category === "Event") {
      return "detailBadge detailBadgeEvent";
    }
    if (category === "Community") {
      return "detailBadge detailBadgeCommunity";
    }
    return "detailBadge";
  };

  if (loading) {
    return (
      <div className="newsDetailsPage">
        <div className="newsDetailsContainer">
          <p>Loading news details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="newsDetailsPage">
        <div className="newsDetailsContainer">
          <div className="newsNotFound">
            <h2>News item not found</h2>
            <button
              className="backToNewsBtn"
              type="button"
              onClick={() => navigate("/news")}
            >
              Back to News
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="newsDetailsPage">
      <div className="newsDetailsContainer">
        <button
          className="backBtn"
          type="button"
          onClick={() => navigate("/news")}
        >
          <ArrowLeft size={18} />
          Back to News
        </button>

        <article className="newsDetailsCard">
          <div className="newsDetailsHero">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="newsDetailsHeroImg"
            />
            <div className="newsDetailsHeroOverlay" />

            <div className="newsDetailsHeroContent">
              <span className={getBadgeClass(item.category)}>
                {item.category}
              </span>
              <h1 className="newsDetailsTitle">{item.title}</h1>
              <p className="newsDetailsSummary">{item.summary}</p>

              <div className="newsDetailsMeta">
                <span className="newsDetailsMetaItem">
                  <Calendar size={16} />
                  {item.date}
                </span>
                <span className="newsDetailsMetaItem">
                  <User size={16} />
                  {item.author}
                </span>
              </div>
            </div>
          </div>

          <div className="newsDetailsBody">
            <div
              className="newsDetailsContent"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />

            {item.attachments && item.attachments.length > 0 && (
              <div className="newsAttachments">
                <h3 className="newsAttachmentsTitle">Attachments</h3>

                <div className="newsAttachmentsList">
                  {item.attachments.map((file, index) => (
                    <div className="newsAttachmentItem" key={index}>
                      <div className="newsAttachmentLeft">
                        <Paperclip size={16} />
                        <div>
                          <p className="newsAttachmentName">{file.name}</p>
                          <p className="newsAttachmentMeta">
                            {file.type} • {file.size}
                          </p>
                        </div>
                      </div>

                      <button className="newsAttachmentBtn" type="button">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

export default NewsListPage;
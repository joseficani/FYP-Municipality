import "./NewsDetailsPage.css";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, User, Paperclip, ArrowLeft } from "lucide-react";
import { newsItems } from "./NewsData";

export default function NewsDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}, []);

  const item = useMemo(() => {
    return newsItems.find((news) => news.id === id);
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
    return "detailBadge";
  };

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
              <span className={getBadgeClass(item.category)}>{item.category}</span>
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
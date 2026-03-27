import React, { useState } from "react";
import "./FindOutMore.css";
import { ChevronDown, Image as ImageIcon } from "lucide-react";
 
const TOPICS = [
  {
    id: 1,
    title: "History",
    content:
      "The town of Kaa El Rim is located in the Zahle district within the Bekaa Governorate. It is considered one of the old Lebanese villages, with a history dating back to the Roman and Byzantine periods. Some stone remains and the ruins of old buildings indicate the presence of human settlement for hundreds of years.Historically, its residents relied on agriculture and livestock breeding, and the town still preserves its authentic rural and heritage character. It also served as an important passage point for trade caravans traveling between the Bekaa Plain and the neighboring mountainous regions.",
  },
  {
    id: 2,
    title: "Architecture",
    content:
      "Kaa El Rim is distinguished by its traditional architecture built from natural stone, featuring red-tiled roofs and arched windows that reflect the old Lebanese style.Heritage houses are spread throughout the town, some of which date back more than a hundred years, alongside modern buildings that maintain architectural harmony with the surrounding natural environment.",
  },
  {
    id: 3,
    title: "The Old Serial",
    content:
      "The Old Serail in Kaa El Rim is considered one of the town’s most prominent historical administrative landmarks, as it once served as the center for managing the affairs of the residents in earlier periods.The Serail stands as a witness to the former administrative organization and is regarded as part of the town’s collective memory. It is distinguished by its traditional stone construction and its central location.",
},
  {
    id: 4,
    title: "The Old Hotels",
    content:
      "In the past, due to the town’s proximity to the city of Zahle and nearby agricultural routes, some inns and simple rest houses were established to receive travelers and traders.They were not hotels in the modern sense, but they played an important social and economic role in welcoming visitors and passersby.",
},
  {
    id: 5,
    title: "The Old Markets",
    content:
      "Kaa El Rim was known for its small local markets that were held periodically to sell:Agricultural products,Grains,Dairy products and cheeses,Farming tools,The market served as a meeting point for neighboring villages and a center of economic and social activity.",
  },
  {
    id: 6,
    title: "Religious Tourism and Places of Worship",
    content:
      "The town includes several churches and places of worship that reflect the religious and cultural character of the area. These sites serve as important spiritual and social centers for the residents.The town also welcomes visitors during religious occasions and holidays, which contributes to the promotion of local religious tourism.",
  },
  {
    id: 7,
    title: "The Railway",
    content:
      "The old railway line (the Lebanese–Syrian railway) once passed near Kaa El Rim, connecting Beirut to the Bekaa and then to Syria.In the early twentieth century, this railway served as a primary means of transportation for goods and passengers, contributing to the growth of trade and agriculture in the region.Some remains of this railway can still be found around the town today, forming part of its industrial and historical heritage.",
  },
  {
    id: 8,
    title: "Tourism and Geographical Location",
    content:
      "Kaa El Rim is located at an altitude of approximately 1,250 meters above sea level and is characterized by a mild climate in summer and cold winters.It is surrounded by green spaces and natural hills, making it suitable for eco-tourism and nature walks (hiking).",
  },
];
 
const GALLERY_ITEMS = [1, 2, 3, 4];
 
export default function FindOutMoreModule() {
  const [openId, setOpenId] = useState(1);
 
  const HERO_IMAGE_URL =
    // "https://cdn.magicpatterns.com/uploads/8jM31DztJLu2n1GfZwEGLc/Screenshot_2026-03-16_124741.jpg";
    "https://www.bing.com/images/search?view=detailV2&ccid=dj%2BwJFdt&id=69897A90BA0258B137E3FFBB59D335272B13BFF8&thid=OIP.dj-wJFdtnR3wkGHgM-DSSwHaEK&mediaurl=https%3A%2F%2Fwww.lebanontraveler.com%2Fwp-content%2Fuploads%2F2023%2F05%2FKaa-El-Rim.jpg&cdnurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.763fb024576d9d1df09061e033e0d24b%3Frik%3D%252bL8TKyc101m7%252fw%26pid%3DImgRaw%26r%3D0&exph=1080&expw=1919&q=kaa+el+rim+is+a+city+f+what%3F&FORM=IRPRST&ck=03950D01B637FB82A4DA6CE182833B39&selectedIndex=0&itb=0&cw=1375&ch=666&ajaxhist=0&ajaxserp=0%22;"
 
  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };
 
  return (
    <div className="fom-page">
      {/* HERO */}
      <section
        id="home"
        className="fom-hero"
        style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
      >
        <div className="fom-hero-overlay"></div>
 
        <div className="fom-hero-content">
          <span className="fom-hero-small">Discover Kaa El Rim</span>
          <h1 className="fom-hero-title">Find Out More</h1>
          <p className="fom-hero-text">
            Qaa El Rim is a charming village that serves as a gateway to some of the country's most breathtaking hiking trails.
          </p>
        </div>
 
        <div className="fom-scroll-indicator">
          <span>Scroll</span>
          <ChevronDown size={20} />
        </div>
      </section>
 
      {/* ABOUT */}
      <section id="about" className="fom-about-section">
        <div className="fom-about-bg-shape"></div>
 
        <div className="fom-container">
          <div className="fom-about-grid">
            <div className="fom-about-text">
              <div className="fom-section-tag">
                <div className="fom-tag-line"></div>
                <span>The City of Waves</span>
              </div>
 
              <h2>About Kaa El Rim</h2>
 
              <div className="fom-about-paragraphs">
                <p>
                  Qâa er Rîm, also known as Kaa El Rim, is a village located in
                  the Beqaa Governorate of Lebanon. It is situated at the center
                  of Lebanon and is known for its natural beauty and hiking
                  trails.
                </p>
 
                <p>
                  The village is a gateway to some of Lebanon&apos;s most
                  breathtaking hiking trails, offering stunning vistas of both
                  the city and surrounding valleys.
                </p>
 
                <p>
                  Qâa er Rîm is a charming village that invites outdoor
                  enthusiasts to explore its natural beauty and offers a unique
                  experience amidst nature.
                </p>
              </div>
            </div>
 
            <div className="fom-about-image-wrap">
              <div className="fom-about-image-shadow"></div>
              <img
                src={HERO_IMAGE_URL}
                alt="Landscape of Kaa El Rim"
                className="fom-about-image"
              />
            </div>
          </div>
        </div>
      </section>
 
      {/* GALLERY */}
      <section id="gallery" className="fom-gallery-section">
        <div className="fom-container">
          <div className="fom-section-head center white">
            <h2>Glimpses of Heritage</h2>
            <p>Visual fragments of a city where every corner holds a story.</p>
          </div>
 
          <div className="fom-gallery-grid">
            {GALLERY_ITEMS.map((item, index) => (
              <div
                key={item}
                className={`fom-gallery-card ${
                  index % 2 === 1 ? "fom-gallery-offset" : ""
                }`}
              >
                <div className="fom-gallery-overlay"></div>
 
                <div className="fom-gallery-content">
                  <ImageIcon size={32} />
                  <span>View Image</span>
                </div>
 
                <div className="fom-gallery-border"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ACCORDION */}
      <section id="discover" className="fom-accordion-section">
        <div className="fom-accordion-container">
          <div className="fom-section-head center">
            <span className="fom-head-small">Explore</span>
            <h2>Discover Kaa El Rim</h2>
          </div>
 
          <div className="fom-accordion-list">
            {TOPICS.map((topic) => {
              const isOpen = openId === topic.id;
 
              return (
                <div key={topic.id} className="fom-accordion-item">
                  <button
                    type="button"
                    className="fom-accordion-btn"
                    onClick={() => toggleAccordion(topic.id)}
                  >
                    <div className="fom-accordion-left">
                      <span className="fom-accordion-number">
                        0{topic.id}
                      </span>
                      <h3 className={isOpen ? "active" : ""}>{topic.title}</h3>
                    </div>
 
                    <div
                      className={`fom-accordion-icon ${
                        isOpen ? "rotated active" : ""
                      }`}
                    >
                      <ChevronDown size={20} />
                    </div>
                  </button>
 
                  <div
                    className={`fom-accordion-content ${
                      isOpen ? "open" : ""
                    }`}
                  >
                    <div className="fom-accordion-inner">
                      <p>{topic.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
 
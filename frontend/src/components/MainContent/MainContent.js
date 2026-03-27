import "./MainContent.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  Receipt,
  FileText,
  MessageSquareWarning,
  Award,
  ArrowRight,
  SendHorizonal,
  Bot,
  X,
} from "lucide-react";

import heroImg from "../../assets/KaaElRimHero.png";
import team1 from "../../assets/profile1.png";
import team2 from "../../assets/profile2.png";
import team3 from "../../assets/profile1.png";

export default function MainContent() {
  const [tab, setTab] = useState("events");
  const [memberIndex, setMemberIndex] = useState(0);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  const navigate = useNavigate();

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem("language") || "en");
    };

    window.addEventListener("languageChange", handleLanguageChange);

    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, []);

  const text = {
    en: {
      heroTitle1: "Welcome to",
      heroTitle2: "Municipality",
      heroText:
        "Serving our community with dedication, transparency, and a commitment to sustainable growth.",
      exploreServices: "Explore Our Services",
      searchPlaceholder: "Search for whatever you need...",
      allStatus: "All Status",
      active: "Active",
      pending: "Pending",
      filterByTag: "Filter by tag",
      servicesTag: "Services",
      newsTag: "News",

      servicesSmallTitle: "Municipal Services",
      servicesMainTitle1: "Everything you need",
      servicesMainTitle2: "from your municipality",

      taxesFees: "Taxes & Fees",
      taxesFeesDesc:
        "View municipal taxes, fees, and pay your bills securely online.",

      licensePermits: "License & Permits",
      licensePermitsDesc:
        "Apply for permits, get instructions on the steps, upload documents, and track approval status.",

      complaints: "Complaints",
      complaintsDesc:
        "Report issues in your area, track their status, and follow up directly with municipal staff.",

      certifications: "Certifications & Requests",
      certificationsDesc:
        "Request official documents, certificates, and other municipal paperwork easily.",

      eventsNewsSmallTitle: "Events & News",
      eventsNewsMainTitle: "Stay up to date",
      eventsTab: "Events",
      newsTab: "News",
      postEventTab: "Post an Event",
      seeMore: "See more",

      postHeadline:
        "Have an event to suggest? Submit it below and we’ll review it and get back to you.",
      eventTitle: "Event Title",
      eventTitlePlaceholder: "Enter event title",
      eventDescriptionPlaceholder:
        "Briefly describe the event, what will happen, and who it’s for",
      startDate: "Start Date",
      startTime: "Start Time",
      endDate: "End Date",
      endTime: "End Time",
      addEvent: "Add Event",
      cancel: "Cancel",

      ourTeam: "Our Team",
      meetTheTeam: "Meet the team",
      previousMember: "Previous member",
      nextMember: "Next member",

      teamMembers: [
        {
          name: "Jane Doe",
          role: "Mayor",
          bio:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " +
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          phone: "+961 12 345 678",
          email: "janedoe@gmail.com",
          image: team1,
        },
        {
          name: "Mark Saliba",
          role: "Vice Mayor",
          bio:
            "Focused on citizen services and digital transformation. Leads municipal projects, improves transparency, and supports community engagement initiatives across the municipality.",
          phone: "+961 70 123 456",
          email: "mark.saliba@gmail.com",
          image: team2,
        },
        {
          name: "Sara Haddad",
          role: "Municipal Officer",
          bio:
            "Coordinates permits, certificates, and resident requests. Works with departments to ensure fast processing and clear communication with citizens.",
          phone: "+961 76 555 222",
          email: "sara.haddad@gmail.com",
          image: team3,
        },
      ],

      contactUs: "Contact Us",
      dropFeedback: "Drop your feedback",
      sendMessage: "Send us a message",
      reachOut: "Reach out to us anytime, we’re happy to help.",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      contactDetails: "Contact Details",
      message: "Message",
      firstNamePlaceholder: "Enter your first name",
      lastNamePlaceholder: "Enter your last name",
      emailPlaceholder: "Enter your email",
      phonePlaceholder: "Enter your number",
      messagePlaceholder: "Enter your message",
      sendMessageBtn: "Send message",
      helpTitle: "Hi! We are always here to help you",
      hotline: "Hotline",
      smsWhatsapp: "SMS/Whatsapp",

      aiTitle: "Ask our AI anything",
      me: "ME",
      ai: "AI",
      aiQuestion: "How do I submit a complaint?",
      aiAnswerIntro:
        "You can submit a complaint directly through the platform in a few simple steps:",
      aiStep1: "Log in to your account.",
      aiStep2: "Go to Services and select Complaints & Feedback.",
      aiStep3: "Click Submit a Complaint.",
      aiStep4:
        "Fill in the required details (subject, description, and location if needed).",
      aiStep5: "Attach any photos or documents if relevant.",
      aiStep6: "Press Send.",
      aiAnswerEnd:
        "After submission, you’ll receive a notification once your complaint is reviewed or updated. You can also track its status from My Activities in your profile.",
      suggestionsTitle: "Suggestions on what to ask",
      suggestion1: "How do I submit a complaint?",
      suggestion2: "What documents are needed for property tax?",
      suggestion3: "Where do I pay municipal fees?",
      aiInputPlaceholder: "Ask me anything .......",
    },

    ar: {
      heroTitle1: "مرحبًا بكم في",
      heroTitle2: "البلدية",
      heroText:
        "نخدم مجتمعنا بتفانٍ وشفافية والتزام بالنمو المستدام.",
      exploreServices: "استكشف خدماتنا",
      searchPlaceholder: "ابحث عن أي شيء تحتاجه...",
      allStatus: "كل الحالات",
      active: "نشط",
      pending: "قيد الانتظار",
      filterByTag: "تصفية حسب الفئة",
      servicesTag: "الخدمات",
      newsTag: "الأخبار",

      servicesSmallTitle: "الخدمات البلدية",
      servicesMainTitle1: "كل ما تحتاجه",
      servicesMainTitle2: "من بلديتك",

      taxesFees: "الضرائب والرسوم",
      taxesFeesDesc:
        "اعرض الضرائب والرسوم البلدية وادفع فواتيرك بأمان عبر الإنترنت.",

      licensePermits: "التراخيص والتصاريح",
      licensePermitsDesc:
        "قدّم طلبات التصاريح، اطّلع على الخطوات، ارفع المستندات، وتابع حالة الموافقة.",

      complaints: "الشكاوى",
      complaintsDesc:
        "أبلغ عن المشكلات في منطقتك، تابع حالتها، وتواصل مباشرة مع موظفي البلدية.",

      certifications: "الشهادات والطلبات",
      certificationsDesc:
        "اطلب المستندات الرسمية والشهادات والمعاملات البلدية بسهولة.",

      eventsNewsSmallTitle: "الفعاليات والأخبار",
      eventsNewsMainTitle: "ابقَ على اطلاع",
      eventsTab: "الفعاليات",
      newsTab: "الأخبار",
      postEventTab: "أضف فعالية",
      seeMore: "عرض المزيد",

      postHeadline:
        "هل لديك فعالية تريد اقتراحها؟ قدّمها هنا وسنقوم بمراجعتها والرد عليك.",
      eventTitle: "عنوان الفعالية",
      eventTitlePlaceholder: "أدخل عنوان الفعالية",
      eventDescriptionPlaceholder:
        "اشرح باختصار الفعالية، ماذا سيحدث، ولمن هي مخصصة",
      startDate: "تاريخ البداية",
      startTime: "وقت البداية",
      endDate: "تاريخ النهاية",
      endTime: "وقت النهاية",
      addEvent: "إضافة فعالية",
      cancel: "إلغاء",

      ourTeam: "فريقنا",
      meetTheTeam: "تعرّف على الفريق",
      previousMember: "العضو السابق",
      nextMember: "العضو التالي",

      teamMembers: [
        {
          name: "جين دو",
          role: "رئيسة البلدية",
          bio:
            "نص تجريبي عن رئيسة البلدية ودورها في خدمة المجتمع المحلي وتطوير العمل البلدي وتعزيز التواصل مع المواطنين.",
          phone: "+961 12 345 678",
          email: "janedoe@gmail.com",
          image: team1,
        },
        {
          name: "مارك صليبا",
          role: "نائب رئيس البلدية",
          bio:
            "يركز على خدمات المواطنين والتحول الرقمي. يقود المشاريع البلدية، ويحسن الشفافية، ويدعم مبادرات المشاركة المجتمعية داخل البلدية.",
          phone: "+961 70 123 456",
          email: "mark.saliba@gmail.com",
          image: team2,
        },
        {
          name: "سارة حداد",
          role: "موظفة بلدية",
          bio:
            "تنسق التصاريح والشهادات وطلبات السكان. تعمل مع الأقسام المختلفة لضمان سرعة المعالجة ووضوح التواصل مع المواطنين.",
          phone: "+961 76 555 222",
          email: "sara.haddad@gmail.com",
          image: team3,
        },
      ],

      contactUs: "تواصل معنا",
      dropFeedback: "أرسل ملاحظاتك",
      sendMessage: "أرسل لنا رسالة",
      reachOut: "تواصل معنا في أي وقت، نحن سعداء بمساعدتك.",
      firstName: "الاسم الأول",
      lastName: "اسم العائلة",
      email: "البريد الإلكتروني",
      contactDetails: "تفاصيل التواصل",
      message: "الرسالة",
      firstNamePlaceholder: "أدخل اسمك الأول",
      lastNamePlaceholder: "أدخل اسم العائلة",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      phonePlaceholder: "أدخل رقمك",
      messagePlaceholder: "أدخل رسالتك",
      sendMessageBtn: "إرسال الرسالة",
      helpTitle: "مرحبًا! نحن دائمًا هنا لمساعدتك",
      hotline: "الخط الساخن",
      smsWhatsapp: "الرسائل/واتساب",

      aiTitle: "اسأل الذكاء الاصطناعي أي شيء",
      me: "أنا",
      ai: "الذكاء الاصطناعي",
      aiQuestion: "كيف أقدّم شكوى؟",
      aiAnswerIntro:
        "يمكنك تقديم شكوى مباشرة عبر المنصة بخطوات بسيطة:",
      aiStep1: "سجّل الدخول إلى حسابك.",
      aiStep2: "اذهب إلى الخدمات واختر الشكاوى والملاحظات.",
      aiStep3: "اضغط على تقديم شكوى.",
      aiStep4:
        "املأ التفاصيل المطلوبة مثل الموضوع والوصف والموقع إذا لزم الأمر.",
      aiStep5: "أرفق أي صور أو مستندات إذا كانت ذات صلة.",
      aiStep6: "اضغط إرسال.",
      aiAnswerEnd:
        "بعد التقديم، ستتلقى إشعارًا عند مراجعة الشكوى أو تحديثها. ويمكنك أيضًا متابعة حالتها من أنشطتي في ملفك الشخصي.",
      suggestionsTitle: "اقتراحات لما يمكنك سؤاله",
      suggestion1: "كيف أقدّم شكوى؟",
      suggestion2: "ما المستندات المطلوبة لضريبة الأملاك؟",
      suggestion3: "أين يمكنني دفع الرسوم البلدية؟",
      aiInputPlaceholder: "اسألني أي شيء .......",
    },
  };

  const t = text[language];
  const activeMember = t.teamMembers[memberIndex];

  const cards =
    tab === "events"
      ? language === "ar"
        ? ["فعالية 1", "فعالية 2", "فعالية 3", "فعالية 4", "فعالية 5"]
        : ["event 1", "event 2", "event 3", "event 4", "event 5"]
      : language === "ar"
      ? ["خبر 1", "خبر 2", "خبر 3", "خبر 4", "خبر 5"]
      : ["news 1", "news 2", "news 3", "news 4", "news 5"];

  const prevMember = () => {
    setMemberIndex((i) => (i - 1 + t.teamMembers.length) % t.teamMembers.length);
  };

  const nextMember = () => {
    setMemberIndex((i) => (i + 1) % t.teamMembers.length);
  };

  const services = [
    {
      title: t.taxesFees,
      description: t.taxesFeesDesc,
      icon: <Receipt size={30} />,
      route: "/taxes-fees",
    },
    {
      title: t.licensePermits,
      description: t.licensePermitsDesc,
      icon: <FileText size={30} />,
      route: "/licenses-permits",
    },
    {
      title: t.complaints,
      description: t.complaintsDesc,
      icon: <MessageSquareWarning size={30} />,
      route: "/complaints",
    },
    {
      title: t.certifications,
      description: t.certificationsDesc,
      icon: <Award size={30} />,
      route: "/certificates",
    },
  ];

  return (
    <main id="home">
      <section className="hero">
        <img className="heroBg" src={heroImg} alt="Kaa El Rim" />
        <div className="heroShade" />

        <div className="heroCenter">
          <div className="heroGlass">
            <h1 className="heroTitle">
              {t.heroTitle1} <br className="heroBreak" />
              <span>Kaa El Rim</span> {t.heroTitle2}
            </h1>

            <p className="heroText">{t.heroText}</p>

            <button className="heroBtn" type="button">
              {t.exploreServices}
            </button>
          </div>
        </div>

        <div className="heroWave">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 60C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="heroSearchWrap">
          <div className="heroSearchPill">
            <div className="heroField heroFieldGrow">
              <Search className="heroIconSvg" size={18} />
              <input
                className="heroInput"
                placeholder={t.searchPlaceholder}
              />
            </div>

            <div className="heroSelectWrap">
              <select className="heroSelect" defaultValue={t.allStatus}>
                <option>{t.allStatus}</option>
                <option>{t.active}</option>
                <option>{t.pending}</option>
              </select>
              <ChevronDown className="heroSelectIcon" size={16} />
            </div>

            <div className="heroSelectWrap">
              <select className="heroSelect" defaultValue={t.filterByTag}>
                <option>{t.filterByTag}</option>
                <option>{t.servicesTag}</option>
                <option>{t.newsTag}</option>
              </select>
              <ChevronDown className="heroSelectIcon" size={16} />
            </div>
          </div>
        </div>

        <button
          className="aiFloat"
          aria-label="AI chat"
          type="button"
          onClick={() => setAiOpen(true)}
        >
          <Bot color="#ffffff" size={30} />
        </button>
      </section>

      <section id="services" className="svcSection">
        <div className="svcContainer">
          <p className="svcSmallTitle">{t.servicesSmallTitle}</p>
          <h2 className="svcMainTitle">
            {t.servicesMainTitle1} <br /> {t.servicesMainTitle2}
          </h2>

          <div className="svcGrid">
            {services.map((service, index) => (
              <div className="svcCard" key={index}>
                <div className="svcTopIcon">{service.icon}</div>
                <h3 className="svcCardTitle">{service.title}</h3>
                <p className="svcCardText">{service.description}</p>
                <button
                  className="svcArrow"
                  aria-label="open"
                  type="button"
                  onClick={() => service.route && navigate(service.route)}
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="enSection">
        <div className="enContainer">
          <p className="enSmallTitle">{t.eventsNewsSmallTitle}</p>
          <h2 className="enMainTitle">{t.eventsNewsMainTitle}</h2>

          <div className="enTabsRow">
            <button
              className={`enTab ${tab === "events" ? "enTabActive" : ""}`}
              onClick={() => setTab("events")}
              type="button"
            >
              {t.eventsTab}
            </button>

            <button
              className={`enTab ${tab === "news" ? "enTabActive" : ""}`}
              onClick={() => setTab("news")}
              type="button"
            >
              {t.newsTab}
            </button>

            <button
              className={`enTab ${tab === "post" ? "enTabActive" : ""}`}
              onClick={() => setTab("post")}
              type="button"
            >
              {t.postEventTab}
            </button>
          </div>

          {tab !== "post" ? (
            <>
              <div className="enGrid">
                <div className="enCard enCardBig">{cards[0]}</div>
                <div className="enCard enCardBig">{cards[1]}</div>
                <div className="enCard enCardSmall">{cards[2]}</div>
                <div className="enCard enCardWide">{cards[3]}</div>
                <div className="enCard enCardSmall">{cards[4]}</div>
              </div>

              <button
                className="enMoreBtn"
                type="button"
                onClick={() => navigate("/news")}
              >
                {t.seeMore}
              </button>
            </>
          ) : (
            <div className="postWrap">
              <p className="postHeadline">{t.postHeadline}</p>

              <div className="postForm">
                <input
                  className="postInput"
                  placeholder={t.eventTitlePlaceholder}
                />

                <textarea
                  className="postTextarea"
                  placeholder={t.eventDescriptionPlaceholder}
                  rows={3}
                />

                <div className="postSplit">
                  <div className="postSplitCell">
                    <span className="postLabel">{t.startDate}</span>
                    <span className="postValue">January 01, 2026</span>
                  </div>

                  <div className="postDivider" />

                  <div className="postSplitCell">
                    <span className="postLabel">{t.startTime}</span>
                    <span className="postValue">05:00 PM</span>
                  </div>
                </div>

                <div className="postSplit">
                  <div className="postSplitCell">
                    <span className="postLabel">{t.endDate}</span>
                    <span className="postValue">
                      January 31, 2026 <span className="postCaret">▾</span>
                    </span>
                  </div>

                  <div className="postDivider" />

                  <div className="postSplitCell">
                    <span className="postLabel">{t.endTime}</span>
                    <span className="postValue">
                      09:00 PM <span className="postCaret">▾</span>
                    </span>
                  </div>
                </div>

                <button className="postBtn" type="button">
                  {t.addEvent}
                </button>
                <button className="postBtn" type="button">
                  {t.cancel}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="team" className="teamSection">
        <div className="teamContainer">
          <div className="teamHeader">
            <span className="teamSmallTitle">{t.ourTeam}</span>
            <h2 className="teamMainTitle">{t.meetTheTeam}</h2>
          </div>

          <div className="teamSliderWrap">
            <button
              className="teamNavBtn teamNavLeft"
              onClick={prevMember}
              type="button"
              aria-label={t.previousMember}
            >
              ←
            </button>

            <button
              className="teamNavBtn teamNavRight"
              onClick={nextMember}
              type="button"
              aria-label={t.nextMember}
            >
              →
            </button>

            <div className="teamProfileCard">
              <div className="teamProfileText">
                <h3 className="teamName">{activeMember.name}</h3>
                <p className="teamRole">{activeMember.role}</p>

                <p className="teamBio">{activeMember.bio}</p>

                <div className="teamContactList">
                  <div className="teamContactItem">
                    <span className="teamContactIcon">📞</span>
                    <span className="teamContactText">{activeMember.phone}</span>
                  </div>

                  <div className="teamContactItem">
                    <span className="teamContactIcon">✉️</span>
                    <span className="teamContactText">{activeMember.email}</span>
                  </div>
                </div>
              </div>

              <div className="teamProfileImageWrap">
                <div className="teamImageBlob"></div>
                <img
                  src={activeMember.image}
                  alt={activeMember.name}
                  className="teamProfileImage"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contactSection">
        <div className="contactContainer">
          <p className="contactSmallTitle">{t.contactUs}</p>
          <h2 className="contactMainTitle">{t.dropFeedback}</h2>

          <div className="contactGrid">
            <div className="contactFormCard">
              <h3 className="contactCardTitle">{t.sendMessage}</h3>
              <p className="contactCardSub">{t.reachOut}</p>

              <div className="contactForm">
                <div className="contactRow2">
                  <div className="contactField">
                    <label className="contactLabel">{t.firstName}</label>
                    <input
                      className="contactInput"
                      placeholder={t.firstNamePlaceholder}
                    />
                  </div>

                  <div className="contactField">
                    <label className="contactLabel">{t.lastName}</label>
                    <input
                      className="contactInput"
                      placeholder={t.lastNamePlaceholder}
                    />
                  </div>
                </div>

                <div className="contactRow2">
                  <div className="contactField">
                    <label className="contactLabel">{t.email}</label>
                    <input
                      className="contactInput"
                      placeholder={t.emailPlaceholder}
                    />
                  </div>

                  <div className="contactField">
                    <label className="contactLabel">{t.contactDetails}</label>

                    <div className="contactPhoneWrap">
                      <div className="contactPrefix">+961</div>
                      <input
                        className="contactPhoneInput"
                        placeholder={t.phonePlaceholder}
                      />
                    </div>
                  </div>
                </div>

                <div className="contactField">
                  <label className="contactLabel">{t.message}</label>
                  <textarea
                    className="contactTextarea"
                    placeholder={t.messagePlaceholder}
                    rows={4}
                  />
                </div>

                <div className="contactBtnRow">
                  <button className="contactBtn" type="button">
                    {t.sendMessageBtn}
                  </button>
                </div>
              </div>
            </div>

            <div className="contactInfoCard">
              <h3 className="contactInfoTitle">{t.helpTitle}</h3>

              <div className="contactInfoList">
                <div className="contactInfoItem">
                  <div className="contactInfoIcon">🎧</div>
                  <div>
                    <p className="contactInfoLabel">{t.hotline}</p>
                    <p className="contactInfoValue">+961 12 345 678</p>
                  </div>
                </div>

                <div className="contactInfoItem">
                  <div className="contactInfoIcon">💬</div>
                  <div>
                    <p className="contactInfoLabel">{t.smsWhatsapp}</p>
                    <p className="contactInfoValue">+961 12 345 678</p>
                  </div>
                </div>

                <div className="contactInfoItem">
                  <div className="contactInfoIcon">✉️</div>
                  <div>
                    <p className="contactInfoLabel">{t.email}</p>
                    <p className="contactInfoValue">janedoe@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {aiOpen && (
        <div className="aiModalOverlay" onClick={() => setAiOpen(false)}>
          <div className="aiModalCard" onClick={(e) => e.stopPropagation()}>
            <div className="aiModalBar">
              <h2 className="aiModalBarTitle">{t.aiTitle}</h2>

              <button
                className="aiModalCloseBtn"
                type="button"
                onClick={() => setAiOpen(false)}
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            <div className="aiModalBody">
              <div className="aiModalHeaderIconWrap">
                <Bot size={34} />
              </div>

              <div className="aiModalChatArea">
                <div className="aiModalMessageGroup meGroup">
                  <span className="aiModalSender meSender">{t.me}</span>
                  <div className="aiModalBubble meBubble">{t.aiQuestion}</div>
                </div>

                <div className="aiModalMessageGroup botGroup">
                  <span className="aiModalSender botSender">{t.ai}</span>
                  <div className="aiModalBubble botBubble">
                    <p>{t.aiAnswerIntro}</p>
                    <ol>
                      <li>{t.aiStep1}</li>
                      <li>{t.aiStep2}</li>
                      <li>{t.aiStep3}</li>
                      <li>{t.aiStep4}</li>
                      <li>{t.aiStep5}</li>
                      <li>{t.aiStep6}</li>
                    </ol>
                    <p>{t.aiAnswerEnd}</p>
                  </div>
                </div>
              </div>

              <div className="aiModalSuggestions">
                <p className="aiModalSuggestionsTitle">{t.suggestionsTitle}</p>

                <div className="aiModalSuggestionList">
                  <button className="aiModalSuggestionBtn" type="button">
                    {t.suggestion1}
                  </button>
                  <button className="aiModalSuggestionBtn" type="button">
                    {t.suggestion2}
                  </button>
                  <button className="aiModalSuggestionBtn" type="button">
                    {t.suggestion3}
                  </button>
                </div>
              </div>

              <div className="aiModalInputWrap">
                <input
                  type="text"
                  className="aiModalInput"
                  placeholder={t.aiInputPlaceholder}
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                />
                <button
                  className="aiModalSendBtn"
                  type="button"
                  aria-label="Send message"
                >
                  <SendHorizonal size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
import "./AIAssistant.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, SendHorizonal, BotMessageSquare } from "lucide-react";
import { useState } from "react";

export default function AIAssistantPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const suggestions = [
    "How do I submit a complaint?",
    "What documents are needed for property tax?",
    "Where do I pay municipal fees?",
  ];

  return (
    <div className="aiPage">
      <div className="aiContainer">
        <button
          className="aiBackBtn"
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="aiHeader">
          <div className="aiHeaderIcon">
            <BotMessageSquare size={38} />
          </div>
          <h1 className="aiTitle">Ask our AI anything</h1>
        </div>

        <div className="aiChatArea">
          <div className="aiMessageGroup meGroup">
            <span className="aiSender meSender">ME</span>
            <div className="aiBubble meBubble">
              How do I submit a complaint?
            </div>
          </div>

          <div className="aiMessageGroup botGroup">
            <span className="aiSender botSender">AI</span>
            <div className="aiBubble botBubble">
              <p>
                You can submit a complaint directly through the platform in a
                few simple steps:
              </p>
              <ol>
                <li>Log in to your account.</li>
                <li>Go to Services and select Complaints &amp; Feedback.</li>
                <li>Click Submit a Complaint.</li>
                <li>
                  Fill in the required details (subject, description, and
                  location if needed).
                </li>
                <li>Attach any photos or documents if relevant.</li>
                <li>Press Send.</li>
              </ol>
              <p>
                After submission, you’ll receive a notification once your
                complaint is reviewed or updated. You can also track its status
                from My Activities in your profile.
              </p>
            </div>
          </div>
        </div>

        <div className="aiSuggestions">
          <p className="aiSuggestionsTitle">Suggestions on what to ask</p>

          <div className="aiSuggestionList">
            {suggestions.map((item, index) => (
              <button key={index} className="aiSuggestionBtn" type="button">
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="aiInputWrap">
          <input
            type="text"
            className="aiInput"
            placeholder="Ask me anything ......."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="aiSendBtn" type="button" aria-label="Send message">
            <SendHorizonal size={26} />
          </button>
        </div>
      </div>
    </div>
  );
}
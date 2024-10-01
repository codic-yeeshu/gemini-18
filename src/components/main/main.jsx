import React, { useContext } from "react";
import "./main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
import { CARD_DATA } from "../../constants/constants";
import { Toaster } from "react-hot-toast";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    handleWIP,
    setLoggedIn,
  } = useContext(Context);

  return (
    <>
      <div className="main">
        <div className="nav">
          <p>Gemini</p>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "8px" }}
          >
            <img src={assets.blank_dp} alt="" />
            <button
              onClick={() => setLoggedIn(false)}
              style={{
                borderRadius: "40px",
                padding: "8px",
                border: "none",
                backgroundColor: "lightgrey",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              Log Out
            </button>
          </div>
        </div>
        <div className="main-container">
          {!showResult ? (
            <>
              <div className="greet">
                <p>
                  <span>Hello,</span>
                </p>
                <p>How can I help you today?</p>
              </div>
              <div className="cards">
                {CARD_DATA.map((card) => (
                  <div
                    onClick={() => setInput(card.description)}
                    key={card.id}
                    className="card"
                  >
                    <p>{card.description}</p>
                    <img src={card.img} alt={card.alt} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="result">
              <div className="result-title">
                <img src={assets.blank_dp} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="" />

                {loading ? (
                  <>
                    <div className="loader">
                      <hr />
                      <hr />
                      <hr />
                    </div>
                  </>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                )}
              </div>
            </div>
          )}
          <div className="main-bottom">
            <div className="search-box">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Enter a prompt here"
              />
              <div>
                <img onClick={handleWIP} src={assets.gallery_icon} alt="" />

                <img onClick={handleWIP} src={assets.mic_icon} alt="" />
                {input && (
                  <img onClick={() => onSent()} src={assets.send_icon} alt="" />
                )}
              </div>
            </div>
            <p className="bottom-info">
              Gemini may display inaccurate info, including about people, so
              double-check its responses.
            </p>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Main;

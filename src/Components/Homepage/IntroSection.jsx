import React, { useEffect, useState, useRef } from "react";

import { useReactToPrint } from "react-to-print";
import { questionAnswers } from "../../questionAnswers";

const IntroSection = ({ labels, setIsComplete, setLabels }) => {
  const [activeBtn, setActiveBtn] = useState(!labels.includes(null));
  const [showLabel, setShowLabel] = useState(false);

  const handleGenerateLabel = () => {
    setShowLabel(true);
    setIsComplete(true);
  };

  useEffect(() => {
    if (!labels.includes(null)) {
      setActiveBtn(true);
    } else {
      setActiveBtn(false);
    }
  }, [labels]);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleReset = () => {
    setIsComplete(false);
    setShowLabel(false);
    setLabels(new Array(questionAnswers.length).fill(null));
  };
  return (
    <>
      <section className="bg-white hp-intro-section">
        <div className="container">
          <div className="flex justify-between hp-intro-wrapper">
            <div className="hp-intro-left hp-intro-col">
              <h1>
                Create your own custom label by answering the
                <span> 5 </span> questions below!
              </h1>
              <p>
                These questions have been thoughtfully, scientifically,
                psychologically, and spiritually compiled to render the{" "}
                <span>true essence of your entire being</span> into a single
                handy patch that you can print out and wear on your very own
                shirt!
              </p>
            </div>
            {scrolled && <div className="empty-scrolled"></div>}
            <div
              className={`hp-intro-right hp-intro-col ${
                scrolled ? "scrolled" : ""
              }`}
            >
              <div className="print-box" ref={printRef}>
                <div className="hp-label-box flex justify-center align-center">
                  <div className="text-center">
                    <h2 className="">hello, my label is</h2>
                    {showLabel ? (
                      <div className="flex justify-center align-center label-text">
                        {labels.map((label, index) => (
                          <span key={index}>{label}</span>
                        ))}
                      </div>
                    ) : (
                      <button
                        className={`btn btn-black ${
                          activeBtn === false ? "disabled" : "active-label-btn"
                        }`}
                        onClick={handleGenerateLabel}
                        disabled={!activeBtn}
                      >
                        Preview my label
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {showLabel && (
                <div className="flex justify-between align-center print-label-box">
                  <div className="">
                    <button
                      className="print-label-btn btn"
                      onClick={handlePrint}
                    >
                      Print
                    </button>
                    <p>It’s SO who I am!</p>
                  </div>
                  <div>
                    <button
                      className="print-reset-btn btn"
                      onClick={handleReset}
                    >
                      Reset
                    </button>
                    <p>
                      <p>It’s SO who I am!</p>
                    </p>
                  </div>
                </div>
              )}
              <div className="hp-intro-steps flex align-center justify-between relative">
                {labels.map((label, index) => (
                  <span
                    className={`step ${labels[index] !== null && "active"}`}
                    key={index}
                  >
                    {labels[index] !== null ? (
                      <img src="images/tick-sign.png" alt="" />
                    ) : (
                      `${index + 1}`
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="sticky desktop-none show-768 label-box-mobile">
        <div className="container">
          <div className="hp-intro-right hp-intro-col ">
            <h2 className="capitalize">hello, my label is</h2>
            <div className="hp-label-box flex justify-center align-center">
              {showLabel ? (
                <div className="flex justify-center align-center label-text">
                  {labels.map((label, index) => (
                    <span key={index}>{label}</span>
                  ))}
                </div>
              ) : (
                <button
                  className={`btn btn-black ${
                    activeBtn === false ? "disabled" : "active-label-btn"
                  }`}
                  onClick={handleGenerateLabel}
                  disabled={!activeBtn}
                >
                  Generate My Label
                </button>
              )}
            </div>
            <div className="hp-intro-steps flex align-center justify-between relative">
              {labels.map((label, index) => (
                <span
                  className={`step ${labels[index] !== null && "active"}`}
                  key={index}
                >
                  {labels[index] !== null ? (
                    <img src="images/tick-sign.png" alt="" />
                  ) : (
                    `${index + 1}`
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default IntroSection;

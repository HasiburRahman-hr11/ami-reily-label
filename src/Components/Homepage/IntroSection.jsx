import React, { useEffect, useState } from "react";

const IntroSection = ({ labels , setIsComplete}) => {
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
  return (
    <section className="bg-white hp-intro-section">
      <div className="container">
        <div className="flex justify-between">
          <div className="hp-intro-left hp-intro-col">
            <h1>
              Create your own custom label by answering the
              <span>5</span> questions below!
            </h1>
            <p>
              These questions have been thoughtfully, scientifically,
              psychologically, and spiritually compiled to render the{" "}
              <span>true essence of your entire being</span> into a single handy
              patch that you can print out and wear on your very own shirt!
            </p>
          </div>
          <div className="hp-intro-right hp-intro-col">
            <h2 className="capitalize">hello, my label is</h2>
            <div className="hp-label-box flex justify-center align-center">
              {showLabel ? (
                <div className="flex justify-center align-center label-text">
                  {labels.map((label, index)=> (
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
                 <span className={`step ${labels[index] !== null && "active"}`} key={index}>
                 {labels[index] !== null ? (
                   <img src="images/tick-sign.png" alt="" />
                 ) : (
                   `${index+1}`
                 )}
               </span>
              ))}
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;

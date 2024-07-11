import React, { useState } from "react";
import IntroSection from "../Components/Homepage/IntroSection";

import { questionAnswers } from "../questionAnswers";
import SingleQuestion from "../Components/Homepage/SingleQuestion";

const Home = () => {
  const [labels, setLabels] = useState(
    new Array(questionAnswers.length).fill(null)
  );
  const [isComplete, setIsComplete] = useState(false);

  return (
    <main className="relative">
      <IntroSection
        labels={labels}
        setIsComplete={setIsComplete}
        setLabels={setLabels}
      />

      <section className="bg-white question-section">
        {/* <div className="question-wrapper">
        {questionAnswers.map((questionData , index) => (
         <SingleQuestion key={questionData._id} questionData={questionData} index={index} setLabels={setLabels} labels={labels} />
        ))}
      </div> */}
        <div className="question-wrapper">
          {questionAnswers.map((questionData, index) => (
            <SingleQuestion
              key={questionData._id}
              questionData={questionData}
              index={index}
              setLabels={setLabels}
              labels={labels}
              isComplete={isComplete}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;

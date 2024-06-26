import React from "react";
import SingleQuestion from "./SingleQuestion";
import { questionAnswers } from "../../questionAnswers";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

let settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2.1,
  slidesToScroll: 1,
  arrows: false,
  centerMode: false,
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 901,
      settings: {
        slidesToShow: 1.3,
      },
    },
    {
      breakpoint: 641,
      settings: "unslick", // Destroys slick at this breakpoint
    },
  ],
};

const QuestionsWrapper = ({ setLabels, labels, isComplete }) => {
  return (
    <section className="bg-white question-section">
      {/* <div className="question-wrapper">
        {questionAnswers.map((questionData , index) => (
         <SingleQuestion key={questionData._id} questionData={questionData} index={index} setLabels={setLabels} labels={labels} />
        ))}
      </div> */}
      <div className="question-wrapper">
        <Slider {...settings}>
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
        </Slider>
      </div>
    </section>
  );
};

export default QuestionsWrapper;

import React, { useEffect, useRef, useState } from "react";

const SingleQuestion = ({
  questionData,
  index,
  setLabels,
  labels,
  isComplete,
}) => {
  const [value, setValue] = useState("");
  const [activeColor, setActiveColor] = useState("#FF9027");

  const [colors, setColors] = useState([
    "#FF8F27",
    "#F3E500",
    "#66CC33",
    "#F4A6D7",
    "#A174A5",
    "#E23636",
    "#5AAB4B",
    "#BC70A4",
    "#FFA500",
    "#F3E500",
    "#66CC33",
    "#F4A6D7",
    "#A174A5",
    "#E23636",
    "#5AAB4B",
    "#BC70A4",
    "#FFA500",
  ]);

  useEffect(() => {
    const answerDiv = document.getElementById(`answerBox-${index + 1}`);
    const answerRange = document.getElementById(`answerRange-${index + 1}`);
    const answerDivHeight = answerDiv.clientHeight;
    answerRange.style.minWidth = answerDivHeight + "px";
  });

  const handleChange = (index, labelWord, e) => {
    const audio = new Audio("/audio/slider-effect-2.mp3");
    if (audio) {
      audio.play();
    }

    e.target.classList.add("active");
    const newLabels = [...labels];
    newLabels[index] = labelWord;
    setLabels(newLabels);

    const currentColor =
      colors[value] !== undefined ? colors[value] : "#FF9027";
    setActiveColor(currentColor);

    if (Number.parseInt(value) % 2 === 0) {
      e.target.style.setProperty(
        "--thumb-color",
        `linear-gradient(to top, ${currentColor} 50%, white 50%)`
      );
    } else {
      e.target.style.setProperty(
        "--thumb-color",
        `linear-gradient(to top, white 50%, ${currentColor} 50%)`
      );
    }
  };

  const handleLabelClick = (index, labelWord, input, value) => {
    const audio = new Audio("/audio/slider-effect-2.mp3");
    audio.play();

    input.classList.add("active");
    const newLabels = [...labels];
    newLabels[index] = labelWord;
    setLabels(newLabels);
    setValue(value);
    const currentColor =
      colors[value] !== undefined ? colors[value] : "#FF9027";
    setActiveColor(currentColor);
    if (Number.parseInt(value) % 2 === 0) {
      input.style.setProperty(
        "--thumb-color",
        `linear-gradient(to top, white 50%, ${currentColor} 50%)`
      );
    } else {
      input.style.setProperty(
        "--thumb-color",
        `linear-gradient(to top, ${currentColor} 50%, white 50%)`
      );
    }
  };

  // Create a ref for the input element
  const inputRef = useRef(null);

  // Disable keyboard control on the input range slider
  useEffect(() => {
    const inputElement = inputRef.current;
    const handleKeyDown = (e) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
      }
    };
    inputElement.addEventListener("keydown", handleKeyDown);
    return () => {
      inputElement.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const slider = inputRef.current;

    const preventTouch = (e) => {
      e.stopPropagation();
    };

    slider.addEventListener("touchstart", preventTouch, { passive: false });
    slider.addEventListener("touchmove", preventTouch, { passive: false });

    return () => {
      slider.removeEventListener("touchstart", preventTouch);
      slider.removeEventListener("touchmove", preventTouch);
    };
  }, []);
  return (
    <div
      className={`single-question relative h-100 ${
        labels[index - 1] === null ? "disabled" : ""
      }`}
      // onClick={() => {
      //   if(labels[index - 1] === null){
      //     return alert(`Please answer Question-${index} first.`)
      //   }
      // }}
    >
      {/* {labels[index - 1] === null && (
        <div className="lock-question">
          <img src="images/lock.png" alt="" />
        </div>
      )} */}
      <div className="question-number circle-center-text mx-auto">
        {index + 1}
      </div>
      <h4
        className="text-center question"
        dangerouslySetInnerHTML={{ __html: questionData.question }}
      ></h4>
      <div className="answer-wrapper relative">
        <div className="range-box">
          <div className="range-line">
            <img src="images/range-line.png" alt="" />
          </div>
          <div className="range-input-box">
            <input
              ref={inputRef}
              type="range"
              className="vertical-slider"
              value={value}
              step={1}
              min={1}
              max={questionData.answers.length}
              id={`answerRange-${index + 1}`}
              onChange={(e) => {
                console.log(e.target.value);
                const answerIndex = e.target.value - 1;
                // const labelWord = questionData.answers[answerIndex].labelWord;
                let labelWord =
                  questionData.answers[answerIndex].answer.charAt(0);
                if (
                  questionData.answers[answerIndex].answer.startsWith("+ MYOB")
                ) {
                  labelWord = "+m";
                }
                handleChange(index, labelWord, e);
                setValue(e.target.value);
              }}
              style={{ "--thumb-color": colors[0] }}
              disabled={labels[index - 1] === null || isComplete}
            />
          </div>
        </div>

        <div className="w-100" id={`answerBox-${index + 1}`}>
          {questionData.answers.map((answerData, i) => (
            <div
              className={`answer-item ${
                Number.parseInt(value) === Number.parseInt(i + 1)
                  ? "active"
                  : ""
              }`}
              key={i}
              style={{
                color:
                  Number.parseInt(value) === Number.parseInt(i + 1) &&
                  activeColor,
              }}
              onClick={() => {
                const rangeInput = document.getElementById(
                  `answerRange-${index + 1}`
                );
                if (labels[index - 1] === null || isComplete) {
                  return;
                }

                handleLabelClick(
                  index,
                  // answerData.labelWord,
                  answerData.answer.charAt(0),
                  rangeInput,
                  i + 1
                );
              }}
              dangerouslySetInnerHTML={{ __html: answerData.answer }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleQuestion;

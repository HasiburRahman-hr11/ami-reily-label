import React, { useState } from 'react'
import IntroSection from './Components/Homepage/IntroSection'
import QuestionsWrapper from './Components/Homepage/QuestionsWrapper';

import { questionAnswers } from "./questionAnswers";

const App = () => {
  const [labels, setLabels] = useState(new Array(questionAnswers.length).fill(null));
  const [isComplete, setIsComplete] = useState(false);
  return (
    <main className='relative'>
      <IntroSection labels={labels} setIsComplete={setIsComplete} />
      <QuestionsWrapper labels={labels} setLabels={setLabels} isComplete={isComplete} />
    </main>
  )
}

export default App
import React from 'react'

function CorrectAnswers({questions}) {
    return (
      <div>
        {questions.map((q, index) => (
          <div>
            <h1>
              {" "}
              {index + 1}. {q.question.replace(`&quot;`, `"`)}
            </h1>
            {q.answers.map((option, index) =>
              option.correct ? <h2>Answer : {option.opt}</h2> : ""
            )}
          </div>
        ))}
      </div>
    );
}

export default CorrectAnswers

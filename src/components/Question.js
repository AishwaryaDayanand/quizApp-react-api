import React, { useEffect, useState } from "react";
import style from "../styles/container.module.css";
import CorrectAnswers from "./CorrectAnswers";
import ScoreBoard from "./ScoreBoard";

function Question() {
  const [questions, setQuestions] = useState([]);
  const [qNumber, setqNumber] = useState(0);
  const [score, setscore] = useState(0);
  const [showScore, setshowScore] = useState(false);
  const [playAgain, setplayAgain] = useState(false);
  const getData = () => {
    let questions = [];
    fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium")
      .then((response) => response.json())
      .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
          const formattedQuestion = {
            question: loadedQuestion.question,
          };
          const correct_answer_index = Math.floor(Math.random() * 3);
          formattedQuestion.answers = loadedQuestion.incorrect_answers.map(
            (option) => {
              return {
                opt: option,
                correct: false,
              };
            }
          );
          formattedQuestion.answers.splice(correct_answer_index, 0, {
            opt: loadedQuestion.correct_answer,
            correct: true,
          });
          return formattedQuestion;
        });
      })
      .then(() => {
        setQuestions(questions);
        console.log(questions);
      });
  };
  useEffect(() => {
    getData();
  }, [playAgain]);
  function handleAnswerSubmit(correct, index) {
    if (correct) {
      setscore(score + 1);
    }
    if (qNumber < questions.length - 1) {
      setqNumber((prevNumber) => prevNumber + 1);
    } else {
      setshowScore(true);
    }
  }
  const quizAgain = (e) => {
    e.preventDefault();
    setplayAgain(true);
    setqNumber(0);
    setscore(0);
    setshowScore(false);
  };

  return (
    <div id={style.container}>
      {questions.length <= 0 ? (
        <h1>Quiz</h1>
      ) : showScore ? (
        <div>
          <ScoreBoard score={score} quizAgain={quizAgain} />
          <CorrectAnswers questions={questions} />
        </div>
      ) : (
        <div>
          <div id={style.question}>
            <h1 id={style.title}>
              {"Question " + (qNumber + 1) + " of " + questions.length}{" "}
            </h1>
            {
              <h1 id={style.question}>
                {questions[qNumber].question.replace(`&quot;`, `"`)}
              </h1>
            }
          </div>
          <div id={style.options}>
            {questions[qNumber].answers.map((option, index) => (
              <div key={index} className={style.option}>
                <h1 style={{ marginLeft: "20px" }}>{index + 1}. </h1>
                <h1
                  style={{ marginLeft: "20px" }}
                  key={index}
                  onClick={() => handleAnswerSubmit(option.correct, index)}
                >
                  {option.opt}
                </h1>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Question;

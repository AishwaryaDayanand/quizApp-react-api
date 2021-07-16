import React from 'react'
import style from '../styles/container.module.css'
function ScoreBoard({score,quizAgain}) {
  let grade;
  if(score > 0 && score <=5){
    grade = (
      <div>
        <h1>You scored {score} out of 10</h1>
        <h1>Better Luck Next Time!</h1>
      </div>
    );
  }
  else if(score > 5 && score <10){
    grade = (
      <div>
        <h1>You scored {score} out of 10</h1>
        <h1>Congratulations!!</h1>
      </div>
    );
  }else{
    grade = (
      <div>
        <h1>You scored {score} out of 10</h1>
        <h1>Excellent</h1>
      </div>
    );

  }
    return (
      <div id={style.ScoreBoard}>
        {/* <h1>You scored {score} out of 10</h1> */}
        {grade}
        <button id={style.playAgain} onClick={quizAgain}>Play Again</button>
      </div>
    );
}

export default ScoreBoard

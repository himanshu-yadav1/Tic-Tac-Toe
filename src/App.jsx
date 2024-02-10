import { useState, useEffect } from 'react'
import './App.css'
import { Patterns } from './Patterns'
import Board from './components/Board'

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""])
  const [currentPlayer, setCurrentPlayer] = useState("X")
  const [result, setResult] = useState({winner: "none", state: "none"})
  const [scoreX, setScoreX] = useState(0)
  const [scoreO, setScoreO] = useState(0)


  const chooseSquare = (square) => {
    setBoard(board.map((val, index) => {
      if(index == square && val == ""){
        return currentPlayer
      }

      return val
    }))
  }  


  useEffect(()=> {
    checkIfTie()
    checkWin()

    setCurrentPlayer((prev) => prev=="X" ? "O" : "X")
  }, [board])

  useEffect(() => {
    if(result.state != "none"){
      if(result.state == "Tie"){
        alert("Tie. Press OK to Start Next Game")
      }
      else{
        alert(`Winner ${result.winner}. Press OK to Start Next Game`)

        if(result.winner === "X"){
          setScoreX((prev) => prev+1)
        }
        else if(result.winner === "O") {
          setScoreO((prev) => prev+1)
        }
      }

      restartGame()
    }
  }, [result])



  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]]

      if(firstPlayer == "") return

      let foundWinningPattern = true

      currPattern.forEach((idx) => {
        if(board[idx] != firstPlayer){
          foundWinningPattern = false
        }
      })

      if(foundWinningPattern){
        setResult({ winner: currentPlayer, state: "Won"})
      }
    })
  }


  const checkIfTie = () => {
    let filled = true
    board.forEach((square) => {
      if(square == ""){
        filled = false
      }
    })

    if(filled){
      setResult({winner: "No One", state: "Tie"})
    }
  }


  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""])
    setCurrentPlayer("X")
  }

  const resetScore = () => {
    setScoreX(0)
    setScoreO(0)
  }

  return (
      <div className='container'>
        <div className='left'>
          <Board board={board} chooseSquare={chooseSquare}/>
        </div>

        <div className="right">
          <div className='right-top'>Turn {currentPlayer}</div>
          
          <div className="score-area">
            <div>Score of X : {scoreX}</div>
            <div>Score of O : {scoreO}</div>
          </div>

          <div className='right-bottom'>
            <button onClick={resetScore}>Reset Score</button>
          </div>
        </div>

      </div>
  )
}

export default App

import './App.css';
import { useState,useEffect } from 'react';
import SingleCard from './SingleCard';

const Game = ({cardImages}) =>{

  const [cards,setCards] = useState([]);
  const [turns,setTurns] = useState(0)
  const [choiceOne,setChoiceOne] = useState(null);
  const [choiceTwo,setChoiceTwo] = useState(null);
  const [disabled,setDisabled] = useState(false);


  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages,...cardImages].sort(()=> Math.random()-0.5).map((card)=>({ ...card,id: Math.random() }))
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  //handle a choice
  const handleChoice = (card) =>{
    if(card.id === choiceOne?.id) return;
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare two cards
  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards=>{
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            }
            else return card
          })
        })
        resetTurn()
      }
      else{
      setTimeout(()=>resetTurn(),1000)
      }
    }
  },[choiceOne,choiceTwo])

  //reset choices in case of wrong match
  const resetTurn = _ =>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns=>prevTurns+1);
    setDisabled(false);
  }

  return (
    <>
    <h1>Poke-Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card=>
          <SingleCard card={card} key={card.id} handleChoice={handleChoice} 
          flipped={card === choiceOne || card === choiceTwo || card.matched} 
          disabled={disabled}/>
        )}
      </div>
      <p>Turns : {turns}</p>
    </>
  )
}

export default Game;
import React, { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({ anecdote, votes }) => (
  <div>
    {anecdote}
    <br></br>
    has {votes} votes
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const initVotes = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0);
  const [votes, setVotes] = useState(initVotes)

  /**
   * Returns a random integer between min (inclusive) and max (inclusive).
   */
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const handleNextClick = () => {
    let rand = getRandomInt(0, anecdotes.length - 1)
    console.log(rand)
    setSelected(rand)
  }

  const handleVoteClick = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    console.log(votesCopy)
    setVotes(votesCopy)
  }

  const bestAnecdoteId = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleNextClick} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <Anecdote
        anecdote={anecdotes[bestAnecdoteId]}
        votes={votes[bestAnecdoteId]}
      />
    </div>
  )
}

export default App
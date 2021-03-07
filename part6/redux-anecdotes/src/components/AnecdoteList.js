import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { hideMessage, setMessage } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter(a => {
      const re = new RegExp(filter, 'i')
      return a.content.match(re)
    })
  })

  const addVote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(setMessage(`you voted for '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(hideMessage())
    }, 5000)
  }

  return(
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => addVote(anecdote)}
        />
      )}
    </div>
  )
}

export default Anecdotes
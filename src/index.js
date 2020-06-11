import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

const App = (props) => {
  const points = new Array(anecdotes.length); for (let i=0; i<anecdotes.length; ++i) points[i] = 0;
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(points)

  const updateVotes = (index) => () => {
    const copy = [...votes]
    copy[index] += 1
    setVotes(copy)
  }

  const maxVotesIndex = votes.indexOf(Math.max.apply(Math, votes));

  return (
    <div>
        <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}<br></br>
      has {votes[selected]} votes<br></br>
      <Button handleClick={updateVotes(selected)} text="vote"/>
      <Button handleClick={() => setSelected(Math.floor(Math.random() * props.anecdotes.length))} text="next anecdote"/>
      <h1>Anecdote with the most votes</h1>
      {props.anecdotes[maxVotesIndex]}<br></br>
      has {votes[maxVotesIndex]} votes<br></br>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)
import React from 'react'
import Part from './Part'

const Content = ({ course }) => {
    const totalExercises = course.parts.reduce((total, amount) => {
        total.push(amount.exercises)
        return total
      }, [])

    console.log(totalExercises)
    const total = totalExercises.reduce((tot, amt) => tot + amt)
    return (
    <div>
     {course.parts.map(part => <Part key={part.id} part={part}/>)}
     total of {total} exercises
    </div>
  )  }
export default Content
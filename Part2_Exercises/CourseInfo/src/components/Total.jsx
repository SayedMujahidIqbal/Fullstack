const Total = ({ course }) => {
    const total = course.parts.reduce((prevExercises, currExercises) => {
      return prevExercises + currExercises.exercises
    }, 0)
    
    return <p><b>Total of {total} Exercises</b></p>
}

export default Total
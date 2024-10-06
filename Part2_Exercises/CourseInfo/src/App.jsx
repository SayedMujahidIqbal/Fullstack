const Course = ({ course }) => {
  return(
    <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
    </div>
  )
}

const Header = ({ course }) => {
  return(
    <h1>
      {course.name}
    </h1>
  )
}

const Content = ({ course }) =>{
  return(
    course.parts.map(part => <Part key={part.name} part={part.name} exercises={part.exercises} />)
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((prevExercises, currExercises) => {   
    return prevExercises + currExercises.exercises
  }, 0)

  return <p><b>Total of {total} Exercise</b></p>
}

const Part = (props) => {
  const { part, exercises } = props 
  return(
    <p>
      {part} {exercises}
    </p>
  )
}

function App() {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [ 
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
      {
        name: 'Redux',
        exercises: 11
      }
    ]
  }

  return <Course course={course} />
}

export default App
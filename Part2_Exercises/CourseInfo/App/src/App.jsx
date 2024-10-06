const Header = (props) => {
  return(
    <h1>
      {props.course.name}
    </h1>
  )
}

const Content = (props) =>{
  return(
    props.course.parts.map(part => <Part key={part.name} part={part.name} exercises={part.exercises} />)
  )
}

const Total = (props) => {
  let totalExercises= 0
  props.course.parts.map(part => totalExercises +=  part.exercises)

  return <p><b>Total of {totalExercises} Exercise</b></p>
}

const Part = (props) => { 
  return(
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Course = ({course}) => {
  return(
    <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
    </div>
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
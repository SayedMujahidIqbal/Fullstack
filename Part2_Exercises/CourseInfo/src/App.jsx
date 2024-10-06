const Course = ({ courses }) => {
  return(
    <div>
        <Header courses={courses} />
        <Content courses={courses} />
        <Total courses={courses} />
    </div>
  )
}

const Header = ({ courses }) => {
  return(
    <h1>
      {courses.map(course => <p key={course.id}>{course.name}</p>)}
    </h1>
  )
}

const Content = ({ courses }) =>{
  return(
    courses.map(course => course.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />))
  )
}

const Total = ({ courses }) => {
  let partOneExer = 0
  let partTwoExer = 0
  const total = courses.map(course => course.parts.reduce((prevExercises, currExercises) => {
    console.log(prevExercises, currExercises.exercises)
    if(course.id === 1){
      partOneExer = prevExercises + currExercises.exercises
    }else{
      partTwoExer = prevExercises + currExercises.exercises
    }
    console.log(partOneExer, partTwoExer)
    return partOneExer + partTwoExer
  }, 0))

  return <p><b>Total of {partOneExer + partTwoExer} Exercise</b></p>
}

const Part = ({ part, exercises }) => { return <p>{part} {exercises}</p> } 


function App() {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [ 
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

export default App
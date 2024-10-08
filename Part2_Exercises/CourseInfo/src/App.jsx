const Course = ({ courses }) => {
  return(
    <div>
        <h1>Web Development Curriculum</h1>
        {
          courses.map(course => 
            <div key={course.id}>
              <Header course={course} />
              <Content course={course} />
              <Total course={course} />
            </div>
          )
        }
    </div>
  )
}

const Header = ({ course }) => <h2>{course.name}</h2>

const Content = ({ course }) => course.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)

const Total = ({ course }) => {
  const total = course.parts.reduce((prevExercises, currExercises) => {
    return prevExercises + currExercises.exercises
  }, 0)
  return <p><b>Total of {total} Exercises</b></p>
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
import Content from "./Content"
import Header from "./Header"
import Total from "./Total"

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

  export default Course
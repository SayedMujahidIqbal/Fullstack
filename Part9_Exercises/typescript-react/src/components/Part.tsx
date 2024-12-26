import { CoursePart } from "../types";

const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return (
        <div>
          <div>
            <p>
              <b>
                {props.name} {props.exerciseCount}
              </b>
            </p>
          </div>
          <div>
            <p>
              <i>{props.description}</i>
            </p>
          </div>
        </div>
      );
    case "group":
      return (
        <div>
          <p>
            <b>
              {props.name} {props.exerciseCount}
            </b>
          </p>
          <p>
            Project exercises <i>{props.groupProjectCount}</i>
          </p>
        </div>
      );
    case "background":
      return (
        <div>
          <div>
            <p>
              <b>
                {props.name} {props.exerciseCount}
              </b>
            </p>
          </div>
          <div>
            <p>
              <i>{props.description}</i>
            </p>
            <p>
              submit to <i>{props.backgroundMaterial}</i>
            </p>
          </div>
        </div>
      );
    case "special":
      return (
        <div>
          <div>
            <p>
              <b>
                {props.name} {props.exerciseCount}
              </b>
            </p>
          </div>
          <div>
            <p>
              <i>{props.description}</i>
            </p>
            <p>
              required Skills:
              {props.requirements.map((skill) => skill).join(", ")}
            </p>
          </div>
        </div>
      );
  }
};

export default Part;

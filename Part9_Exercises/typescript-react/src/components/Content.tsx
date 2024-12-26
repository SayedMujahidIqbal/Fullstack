import { CoursePart } from "../types";
import Part from "./Part";

const Content = (props: CoursePart) => {
  return <Part {...props} />;
};

export default Content;

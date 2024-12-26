interface Total {
  totalExercises: number;
}
const Total = (props: Total) => {
  return <p>{props.totalExercises}</p>;
};

export default Total;

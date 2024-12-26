interface Content {
  partName: string;
  exercises: number;
}

const Content = (props: Content) => {
  return (
    <p>
      {props.partName} {props.exercises}
    </p>
  );
};

export default Content;

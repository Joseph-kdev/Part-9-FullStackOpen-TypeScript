interface CourseName {
  name: string;
}

interface TotalExercises {
  total: number;
}

interface ContentProps {
  courseParts: CoursePart[]
}

interface PartProps {
  part: CoursePart;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface DescriptionBase extends CoursePartBase{
  description: string;
}

interface CoursePartBasic extends DescriptionBase {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends DescriptionBase {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends DescriptionBase{
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;


const Header = (props: CourseName) => {

  return (
    <h1>
      {props.name}
    </h1>
  )
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises): {part.description}
        </p>
      );
    case "group":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises): Group projects count:{" "}
          {part.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises): {part.description}
          <br />
          Background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
        </p>
      );
    case "special":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises): {part.description}
          <br />
          Requirements: {part.requirements.join(", ")}
        </p>
      );
    default:
      return null; 
  }
};

const Content = ({ courseParts }: ContentProps) => (
  <div>
    {courseParts.map((part) => (
      <Part key={part.name} part={part} />
    ))}
  </div>
);


const Total = (props: TotalExercises) => {

  return (
    <p>
      Number of exercises {props.total}
    </p>
  )
}


const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];
  

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
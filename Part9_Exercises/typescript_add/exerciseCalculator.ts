import { isNotNumber } from "./utils";

interface bmiValues {
  hours: number[];
  target: number;
}

const parseArguments = (args: string[]) => {
  if (args.length < 4) throw new Error("Not many arguments");
  let hours: number[] = [];
  for (let index = 2; index < args.length - 1; index++) {
    hours.push(Number(args[index]));
  }
  const target = Number(args[args.length - 1]);
  if (hours.map((h) => typeof h === "number") && !isNotNumber(target)) {
    return {
      hours: hours,
      target: target,
    };
  } else {
    throw new Error("Provided Values are numbers");
  }
};

interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseHours: number[],
  target: number
): exerciseResult => {
  const rating =
    exerciseHours.filter((n) => n !== 0).length === exerciseHours.length
      ? 3
      : exerciseHours.length - 2
      ? 2
      : 1;
  const success =
    exerciseHours.length === exerciseHours.filter((n) => n !== 0).length
      ? true
      : false;

  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter((n) => n !== 0).length,
    success: success,
    rating: rating,
    ratingDescription:
      rating === 3
        ? "Amazing work done"
        : rating === 2
        ? "not too bad but could be better"
        : "please try to focus on your training",
    target: target,
    average: exerciseHours.reduce((a, b) => a + b) / exerciseHours.length,
  };
};

try {
  const { hours, target } = parseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

import { isNotNumber } from "./utils";

interface bmiValues {
  weight: number;
  height: number;
}

const parseArguments = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too enough arguments");

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      weight: Number(args[2]),
      height: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height * 0.01 * (height * 0.01);
  const bmi: number = weight / heightInMeters;
  switch (true) {
    case bmi <= 18.5:
      return "Under Weight";
    case bmi > 18.5 && bmi <= 24.9:
      return "Normal Weight";
    case bmi > 25.0 && bmi <= 29.9:
      return "Over Weight";
    case bmi >= 30.0 && bmi <= 34.9:
      return "Obese Class I";
    case bmi >= 35.0 && bmi <= 39.9:
      return "Obese Class II";
    case bmi >= 40.0:
      return "Obese Class III";
    default:
      return "Please give your or height correctly";
  }
};

try {
  const { weight, height } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened,";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  console.log(errorMessage);
}

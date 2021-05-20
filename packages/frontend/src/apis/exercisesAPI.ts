import { customFetch } from "../utils/customFetch";

export const getExercises = async () => {
  const exercises = await customFetch('/api/exercises');

  return exercises;
}
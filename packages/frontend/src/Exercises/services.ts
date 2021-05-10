export const getExercises = async () => {
  const res = await fetch('/api/exercises');
  const exercises = await res.json();
  return exercises;
}
export const getRandomInt = (min: number, max: number) => {
  // Ensure min and max are integers
  min = Math.ceil(min)
  max = Math.floor(max)

  // Generate a random integer in the specified range
  return Math.floor(Math.random() * (max - min + 1)) + min
}

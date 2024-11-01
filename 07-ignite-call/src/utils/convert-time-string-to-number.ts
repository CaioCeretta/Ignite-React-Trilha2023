export function convertTimeStringToMinutes(timeString: string) {
  /*By doing this, we are splitting the string on the : so 08:00 will become a string 0800, then, we map the return of
  the split, which is an array, by simply passing as argument the Number constructor, this would be the same as we did
  .map(item => Number(item)) but because Number is already a constructor function, it will also work this way*/
  const [hours, minutes] = timeString.split(':').map(Number)

  return hours * 60 + minutes
}

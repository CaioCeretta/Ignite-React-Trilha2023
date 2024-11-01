export function getWeekDays() {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long'
  })

  /*
   By return Array(7).keys() this will return [0, 1, 2 ...]
   and by mapping on all week days, it will return us each day of the week

   now we are going to map, as formatter returns a new Intl which will format the date to brazilian portuguese, when
   mapping on the array we will call that function.format and pass as parameter a new Date, which is a Date object will
   create a Date object, holding the current date on local timezone. The Date.UTC is used to create a date in utc, which is
   the universal time, and it takes the following parameters
   year, month and day.

   So basically the new Date(Date.UTC(2021, 5, day)) makes a new Date with the miliseconds returned by the UTC, which counts
   after 1/1/1970. 

  So to summarize our function, creates array with 7 values, from [0, ..., 6], then map over each of those values using
  the formatter, that format the date to a long weekday name in pt-br, then, it takes that day of the week, and with the
  substrings, capitalize the day.

  */


  return Array.from(Array(7).keys())
    .map(day => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map(weekDay => (
      weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1))
    ))
}
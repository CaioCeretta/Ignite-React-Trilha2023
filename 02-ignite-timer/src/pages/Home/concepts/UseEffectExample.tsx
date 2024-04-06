// import { useEffect, useState } from 'react'

// /* This whole code works, but here we are committing one of the biggest mistakes

// What is happening here is

// Once the component is rendered on the screen, we call the use effect which is fetching the github and save in the list state
// so far so good, but then after it we have an input, which we will use to filter those results, and whenever the user typed
// something inside that input, the useEffect of the filtered lists would run, because we are updating the filter state, and
// it will create a new state with the new filtered list, so we are having two components re render because we updated the state
// two times, one when the filter changed and the other after the filteredList also changed.

// The error we made here is that whenever we are creating an information, like the filteredList, that it is created based
// on other component changes, that doesn't have to be a state. So based on the error we made this is the code

//   const [filteredList, setFilteredList] = useState<string[]>([])

//   useEffect(() => {
//     setFilteredList(list.filter((item) => item.includes(filter)))
//   }, [filter])

//   turning into just

//   const filteredList = list.filter((item) => item.includes(filter))

//   because when the component re-renders, that variable would also re render based on the filter change, so we would have
//   avoided one re render

// */

// export function UseEffectExample() {
//   const [list, setList] = useState<string[]>([])
//   const [filter, setFilter] = useState<string>('')

//   useEffect(() => {
//     fetch('https://api.github.com/users/diego3g/repos')
//       .then((response) => response.json())
//       .then((data) => {
//         setList(data.map((item: any) => item.full_name))
//       })
//   }, [])

//   const filteredList = list.filter((item) => item.includes(filter))

//   function addToList() {
//     setList((state) => [...state, 'New Item'])
//   }

//   return (
//     <div>
//       <input
//         type="text"
//         onChange={(e) => setFilter(e.target.value)}
//         value={filter}
//       />

//       <ul>
//         <p
//           style={{
//             fontWeight: 'bold',
//             margin: '1rem 0rem',
//           }}
//         >
//           Lista
//         </p>
//         {list.map((item) => (
//           <li key={item}>{item}</li>
//         ))}
//       </ul>
//       <p
//         style={{
//           fontWeight: 'bold',
//           margin: '1rem 0rem',
//         }}
//       >
//         Filtered List
//       </p>
//       <ul>
//         {filteredList.map((item) => (
//           <li key={item}>{item}</li>
//         ))}
//       </ul>

//       <button onClick={addToList}>Add to list</button>
//     </div>
//   )
// }

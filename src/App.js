import React from 'react';
import './App.css';
import Application from './components/Application'

function App() {
  return (
    <div className="App">
      <Application />
    </div>
  );
}

export default App;

// window.onload = ()=> {
//   // console.log(firebase)
//   var db = firebase.firestore();
//   console.log(db)
//   db.collection("users").add({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });
// }
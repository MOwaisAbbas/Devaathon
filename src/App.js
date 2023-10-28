import './App.css';
import Routing from './routing/Routing';
import { auth, onAuthStateChanged } from "./firebase/index"


function App() {

  onAuthStateChanged(auth, (user) => {
    if (user) {

      const uid = user.uid;
      localStorage.setItem("userID" , uid)

      console.log("User Login hai")
    } else {
      console.log("user chala gaya")
      localStorage.removeItem()
    }
  });

  return (
    <>
      <Routing/>
     


    </>
  );
}

export default App;

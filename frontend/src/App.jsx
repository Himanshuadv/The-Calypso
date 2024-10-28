import { useState } from 'react'
import Signin from './components/signin'
import Register from './components/Register'

function App() {
  const [isSignIn,setIsSignin] = useState(true)
  return (<div>
    {isSignIn?  <Signin setIsSignin ={setIsSignin} isSignIn={isSignIn}/> : <Register setIsSignin = {setIsSignin} isSignIn={isSignIn}/>}
  </div>
  )
}

export default App

import { Navigate, Route, Routes } from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import TransactionPage from "./pages/TransactionPage"
import NotFoundPage from "./pages/NotFoundPage"
import Header from "./components/home/Header"
import { useQuery } from "@apollo/client/react"
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query"
import { Toaster } from "react-hot-toast"
import type { AuthenticatedUserData } from "./types"


const App = () => {
  const {loading,data,error} = useQuery<AuthenticatedUserData>(GET_AUTHENTICATED_USER)
  console.log("Loading:",loading);
  console.log("Authenticated User:",data);
  console.log("Error:",error);
  
  if(loading) return null
  
  return (
    <>
      {data?.authUser && <Header/>}
        <Routes>
          <Route path="/" element={data?.authUser ? <HomePage/> : <Navigate to={'/login'}/>} />
          <Route path="/login" element={!data?.authUser ? <LoginPage/> : <Navigate to={'/'}/>} />
          <Route path="/signup" element={!data?.authUser ? <SignupPage/> : <Navigate to={'/'}/>} />
          <Route path="/transaction/:id" element={!data?.authUser ? <TransactionPage/> : <Navigate to={'/login'}/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
        <Toaster/>
    
    </>
  )
}

export default App
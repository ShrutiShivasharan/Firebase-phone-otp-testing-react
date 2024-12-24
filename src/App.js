import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn";
import Header from "./pages/Header";

function App() {
  return (
    <>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/product" />
            <Route path="/category" />
          </Routes>
        </Router>
    </>
  );
};


export default App;

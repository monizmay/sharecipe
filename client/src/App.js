import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import Home from "./pages/Home";
import Recipe from "./pages/Recipe"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recipe" element={<Recipe />} />
      </Routes>
    </div>
  );
}

export default App;

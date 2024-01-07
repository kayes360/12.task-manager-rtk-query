import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddNew from "./AddNew";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/addnew" element={<AddNew />}></Route>
          <Route path="/addnew/:id" element={<AddNew />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

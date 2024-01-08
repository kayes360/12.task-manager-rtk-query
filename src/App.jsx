import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddNew from "./AddNew";

function App() {
  return (
    <>
    <div className="text-[#111827]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/addnew" element={<AddNew />}></Route>
          <Route path="/addnew/:id" element={<AddNew />}></Route>
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;

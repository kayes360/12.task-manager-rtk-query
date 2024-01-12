import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddTaskForm from "./AddTaskForm";
import EditTaskForm from "./EditTaskForm";

function App() {
  return (
    <>
    <div className="text-[#111827]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/addtaskform" element={<AddTaskForm />}></Route>
          <Route path="/edittaskform/:id" element={<EditTaskForm />}></Route>
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;

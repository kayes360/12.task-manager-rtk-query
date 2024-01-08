import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TasksList from "./components/TasksList";
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
export default function Home() {
  const [projectNameList, setProjectNameList] = useState([]);

  // useEffect(() => {
  //   console.log("projectNameList", projectNameList);
  // }, [projectNameList]);

  return (
    <>
      <Navbar />
      <div className="container relative py-8">
        <Sidebar projectNameList={projectNameList} setProjectNameList={setProjectNameList}/>

        <div className="lg:pl-[16rem] 2xl:pl-[23rem] ">
          <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
            <div className="justify-between mb-10 space-y-2 md:flex md:space-y-0">
              <Link to="/addNew" className="lws-addnew group">
                <GoPlus className="w-6 h-6 group-hover:text-indigo-500" /> 
                <span className="group-hover:text-indigo-500">Add New</span>
              </Link>
            </div>

            <TasksList projectNameList={projectNameList}/>
          </main>
        </div>
      </div>
    </>
  );
}

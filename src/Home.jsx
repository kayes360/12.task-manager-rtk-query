import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TasksList from "./components/TasksList";
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
export default function Home() {
  const [projectNameList, setProjectNameList] = useState([]);
  const [searchInput, setSearchInput] =useState('')
  useEffect(() => {
    console.log("searchInput",searchInput)
  }, [searchInput])
   
  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  const doSearch = (value) => {
    if (value) { 
      setSearchInput(value);
    }
  };
  const handleSearch = debounceHandler(doSearch, 500);
  return (
    <>
      <Navbar  handleSearch={handleSearch}/>
      <div className="container relative py-8">
        <Sidebar projectNameList={projectNameList} setProjectNameList={setProjectNameList}/>

        <div className="lg:pl-[16rem] 2xl:pl-[23rem] ">
          <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
            <div className="justify-between mb-10 space-y-2 md:flex md:space-y-0">
              <Link to="/addtaskform" className="lws-addnew group">
                <GoPlus className="w-6 h-6 group-hover:text-indigo-500" /> 
                <span className="group-hover:text-indigo-500">Add New</span>
              </Link>
            </div>

            <TasksList projectNameList={projectNameList} searchInput={searchInput}/>
          </main>
        </div>
      </div>
    </>
  );
}

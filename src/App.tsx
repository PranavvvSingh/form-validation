import { NavLink, Route, Routes } from "react-router-dom"
import "./App.css"
import JobForm from "./components/jobForm"
import EventForm from "./components/eventForm"

function App() {
   return (
      <div className="h-screen w-full">
         <>
            <div className="flex justify-center gap-5 mx-auto text-xl mb-5">
               Choose form:
               <NavLink
                  to="/"
                  className={({ isActive }) =>
                     isActive ? " font-bold" : "text-neutral-500"
                  }
               >
                  Event Registration Form
               </NavLink>
               <NavLink
                  to="/job"
                  className={({ isActive }) =>
                     isActive ? "font-bold" : "text-neutral-500"
                  }
               >
                  Job Registration Form
               </NavLink>
            </div>
            <Routes>
               <Route index path="/" element={<EventForm />} />
               <Route path="/job" element={<JobForm />} />
            </Routes>
         </>
      </div>
   )
}

export default App

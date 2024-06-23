import { useState } from "react"
import useJobForm, { EventFormType } from "../hooks/useJobFrom"

const JobForm = () => {
   const { values, errors, handleChange, onSubmit } = useJobForm()
   const [submittedData, setSubmittedData] = useState<EventFormType>()

   const onFormSubmit = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
   ) => {
      event.preventDefault()
      if (onSubmit()) setSubmittedData(values)
      else setSubmittedData(undefined)
   }

   return (
      <div>
         <form className="flex flex-col w-[50%] mx-auto gap-5">
            <div>
               <label
                  htmlFor="name"
                  className="input input-secondary flex items-center gap-2"
               >
                  Full Name
                  <input
                     name="name"
                     type="text"
                     className="grow"
                     onChange={handleChange}
                  />
               </label>
               {errors.name && (
                  <div className="label">
                     <span className="label-text-alt text-red-500">
                        {errors.name}
                     </span>
                  </div>
               )}
            </div>

            <div>
               <label
                  htmlFor="email"
                  className="input input-secondary flex items-center gap-2"
               >
                  Email
                  <input
                     name="email"
                     type="email"
                     className="grow"
                     required
                     onChange={handleChange}
                  />
               </label>
               {errors.email && (
                  <div className="label">
                     <span className="label-text-alt text-red-500">
                        {errors.email}
                     </span>
                  </div>
               )}
            </div>

            <div>
               <label
                  htmlFor="phone"
                  className="input input-secondary flex items-center gap-2"
               >
                  Number
                  <input
                     name="phone"
                     type="number"
                     className="grow"
                     required
                     onChange={handleChange}
                  />
               </label>
               {errors.phone && (
                  <div className="label">
                     <span className="label-text-alt text-red-500">
                        {errors.phone}
                     </span>
                  </div>
               )}
            </div>

            <div className="flex items-center gap-2">
               <p>Applying for position</p>
               <div className="dropdown">
                  <div
                     tabIndex={0}
                     role="button"
                     className="btn m-1 border-secondary bg-white"
                  >
                     {values.position ?? "Select Position"}
                  </div>
                  <ul
                     tabIndex={0}
                     className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                     <li>
                        <a
                           onClick={() =>
                              handleChange({
                                 target: {
                                    name: "position",
                                    value: "Developer",
                                 },
                              })
                           }
                        >
                           Developer
                        </a>
                     </li>
                     <li>
                        <a
                           onClick={() =>
                              handleChange({
                                 target: {
                                    name: "position",
                                    value: "Designer",
                                 },
                              })
                           }
                        >
                           Designer
                        </a>
                     </li>
                     <li>
                        <a
                           onClick={() =>
                              handleChange({
                                 target: {
                                    name: "position",
                                    value: "Manager",
                                 },
                              })
                           }
                        >
                           Manager
                        </a>
                     </li>
                  </ul>
               </div>
               {errors.position && (
                  <div className="label">
                     <span className="label-text-alt text-red-500">
                        {errors.position}
                     </span>
                  </div>
               )}
            </div>

            {values.position !== "Manager" && (
               <div>
                  <label
                     htmlFor="relevantExp"
                     className="input input-secondary flex items-center gap-2"
                  >
                     Relevant Experience
                     <input
                        name="relevantExp"
                        type="number"
                        className="grow"
                        required
                        onChange={handleChange}
                     />
                  </label>
                  {errors.relevantExp && (
                     <div className="label">
                        <span className="label-text-alt text-red-500">
                           {errors.relevantExp}
                        </span>
                     </div>
                  )}
               </div>
            )}

            {values.position === "Designer" && (
               <div>
                  <label
                     htmlFor="portfolio"
                     className="input input-secondary flex items-center gap-2"
                  >
                     Portfolio URL
                     <input
                        name="portfolio"
                        type="text"
                        className="grow"
                        onChange={handleChange}
                     />
                  </label>
                  {errors.portfolio && (
                     <div className="label">
                        <span className="label-text-alt text-red-500">
                           {errors.portfolio}
                        </span>
                     </div>
                  )}
               </div>
            )}

            {values.position === "Manager" && (
               <div>
                  <label
                     htmlFor="managementExp"
                     className="input input-secondary flex items-center gap-2"
                  >
                     Management Experience
                     <input
                        name="managementExp"
                        type="number"
                        className="grow"
                        required
                        onChange={handleChange}
                     />
                  </label>
                  {errors.managementExp && (
                     <div className="label">
                        <span className="label-text-alt text-red-500">
                           {errors.managementExp}
                        </span>
                     </div>
                  )}
               </div>
            )}

            <div>
               <label htmlFor="guest" className="flex items-center gap-5">
                  Skills:
                  <p className="flex items-center gap-2">
                     Javascript
                     <input
                        name="js"
                        className="checkbox"
                        type="checkbox"
                        onChange={handleChange}
                     />
                  </p>
                  <p className="flex items-center gap-2">
                     CSS
                     <input
                        name="css"
                        className="checkbox"
                        type="checkbox"
                        onChange={handleChange}
                     />
                  </p>
                  <p className="flex items-center gap-2">
                     Python
                     <input
                        name="python"
                        className="checkbox"
                        type="checkbox"
                        onChange={handleChange}
                     />
                  </p>
               </label>
               {errors.js && (
                  <div className="label">
                     <span className="label-text-alt text-red-500">
                        {errors.js}
                     </span>
                  </div>
               )}
            </div>

            <div>
               <label
                  htmlFor="managementExp"
                  className="input input-secondary flex items-center gap-2"
               >
                  Date
                  <input
                     name="date"
                     type="date"
                     className="grow"
                     required
                     onChange={handleChange}
                  />
               </label>
               {errors.date && (
                  <div className="label">
                     <span className="label-text-alt text-red-500">
                        {errors.date}
                     </span>
                  </div>
               )}
            </div>

            <button
               type="submit"
               className="btn btn-primary w-min mx-auto mt-5"
               onClick={(e) => onFormSubmit(e)}
            >
               Submit
            </button>
         </form>
         {submittedData && (
            <div className="w-[50%] mx-auto text-left">
               <h2 className="text-lg">Ouput :</h2>
               <pre className="ps-12">
                  {JSON.stringify(submittedData, null, 4)}
               </pre>
            </div>
         )}
      </div>
   )
}

export default JobForm

import { useState } from "react"
import useEventForm, { EventFormType } from "../hooks/useEventForm"

const EventForm = () => {
   const { values, errors, handleChange, onSubmit } = useEventForm()
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
                  Name
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
                  htmlFor="age"
                  className="input input-secondary flex items-center gap-2"
               >
                  Age
                  <input
                     name="age"
                     type="number"
                     className="grow"
                     min={0}
                     required
                     onChange={handleChange}
                  />
               </label>
               {errors.age && (
                  <div className="label">
                     <span className="label-text-alt text-red-500">
                        {errors.age}
                     </span>
                  </div>
               )}
            </div>

            <div>
               <label htmlFor="guest" className="flex items-center gap-2">
                  Are you attending with a guest?
                  <input
                     name="guest"
                     className="checkbox"
                     type="checkbox"
                     onChange={handleChange}
                  />
               </label>
            </div>

            {values.guest && (
               <div>
                  <label
                     htmlFor="guestName"
                     className="input input-secondary flex items-center gap-2"
                  >
                     Guest Name
                     <input
                        name="guestName"
                        type="text"
                        className="grow"
                        required
                        onChange={handleChange}
                     />
                  </label>
                  {values.guest && (
                     <div className="label">
                        <span className="label-text-alt text-red-500">
                           {errors.guestName}
                        </span>
                     </div>
                  )}
               </div>
            )}

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

export default EventForm

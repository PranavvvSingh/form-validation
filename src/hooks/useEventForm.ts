import { useState, useEffect } from "react"

export type EventFormType = {
   name: string | null
   email: string | null
   age: string | null
   guest: boolean | null
   guestName: string | null
}

type EventErrorType = {
   name: string | null
   email: string | null
   age: string | null
   guest: string | null
   guestName: string | null
}

const useEventForm = () => {
   const [values, setValues] = useState<EventFormType>({
      name: null,
      email: null,
      age: null,
      guest: false,
      guestName: null,
   })
   const [errors, setErrors] = useState<EventErrorType>({
      name: null,
      email: null,
      age: null,
      guest: null,
      guestName: null,
   })

   const EMAIL_PATTERN =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

   const ERROR_MESSAGES = {
      required: "This field is required",
      invalidEmail: "Invalid email",
      ageGreaterThanZero: "Age should be greater than 0",
   }

   const validateField = (
      name: keyof EventFormType,
      value: string | boolean,
   ) => {
      let error = null
      const age = parseInt(value as string)

      switch (name) {
         case "name":
            if (!value || (value as string).trim().length === 0) {
               error = ERROR_MESSAGES.required
            }
            break
         case "age":
            if (isNaN(age) || age <= 0) {
               error = ERROR_MESSAGES.ageGreaterThanZero
            }
            break
         case "email":
            if (!value || (value as string).trim().length === 0) {
               error = ERROR_MESSAGES.required
            } else if (!EMAIL_PATTERN.test(value as string)) {
               error = ERROR_MESSAGES.invalidEmail
            }
            break
         case "guestName":
            if (
               values.guest &&
               (!value || (value as string).trim().length === 0)
            ) {
               error = ERROR_MESSAGES.required
            }
            break
         default:
            break
      }

      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }))
   }

   const validateAllFields = () => {
      let valid = true

      Object.keys(values).forEach((key) => {
         const value = values[key as keyof EventFormType]

         // Skip validation for guestName if guest is false
         if (key === "guestName" && !values.guest) {
            return
         }

         if (value !== null) {
            validateField(key as keyof EventFormType, value)
            if (errors[key as keyof EventFormType]) {
               valid = false
            }
         } else {
            valid = false
            setErrors((prevErrors) => ({
               ...prevErrors,
               [key]: ERROR_MESSAGES.required,
            }))
         }
      })

      return valid
   }

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, checked, type } = event.target
      const val = type === "checkbox" ? checked : value
      validateField(name as keyof EventFormType, val)
      setValues((prevValues) => ({
         ...prevValues,
         [name]: val,
      }))
   }

   useEffect(() => {
      if (!values.guest) {
         setValues((prevValues) => ({ ...prevValues, guestName: null }))
         setErrors((prevErrors) => ({ ...prevErrors, guestName: null }))
      }
   }, [values.guest])

   const onSubmit = () => {
      return validateAllFields()
   }

   return { values, errors, handleChange, onSubmit }
}

export default useEventForm

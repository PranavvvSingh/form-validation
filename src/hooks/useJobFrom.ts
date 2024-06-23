import { useEffect, useState } from "react"

export type EventFormType = {
   name: string | null
   email: string | null
   phone: string | null
   position: "Developer" | "Designer" | "Manager" | null
   relevantExp: string | null
   portfolio: string | null
   managementExp: string | null
   js: boolean
   css: boolean
   python: boolean
   date: string | null
}

type EventErrorType = {
   name: string | null
   email: string | null
   phone: string | null
   position: string | null
   relevantExp: string | null
   portfolio: string | null
   managementExp: string | null
   js: string | null
   css: string | null
   python: string | null
   date: string | null
}

const useJobForm = () => {
   const [values, setValues] = useState<EventFormType>({
      name: null,
      email: null,
      phone: null,
      position: null,
      relevantExp: null,
      portfolio: null,
      managementExp: null,
      js: false,
      css: false,
      python: false,
      date: null,
   })
   const [errors, setErrors] = useState<EventErrorType>({
      name: null,
      email: null,
      phone: null,
      position: null,
      relevantExp: null,
      portfolio: null,
      managementExp: null,
      js: null,
      css: null,
      python: null,
      date: null,
   })

   const URL_PATTERN =
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/
   const EMAIL_PATTERN =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

   const ERROR_MESSAGES = {
      required: "This field is required",
      invalidEmail: "Invalid email",
      invalidUrl: "Invalid URL",
      greaterThanZero: "Value should be greater than 0",
      invalidNumber: "Invalid Number",
      selectAtleastOneSkill: "Select at least one skill",
   }

   const validateField = (
      name: keyof EventFormType,
      value: string | boolean,
   ) => {
      let error = null
      const numberInput = Number(value as string)

      switch (name) {
         case "name":
            if (!value || (value as string).trim().length === 0) {
               error = ERROR_MESSAGES.required
            }
            break
         case "email":
            if (!value || (value as string).trim().length === 0) {
               error = ERROR_MESSAGES.required
            } else if (!EMAIL_PATTERN.test((value as string).toLowerCase())) {
               error = ERROR_MESSAGES.invalidEmail
            }
            break
         case "portfolio":
            if (!value || (value as string).trim().length === 0) {
               error = ERROR_MESSAGES.required
            } else if (!URL_PATTERN.test((value as string).toLowerCase())) {
               error = ERROR_MESSAGES.invalidUrl
            }
            break
         case "phone":
            if (isNaN(numberInput)) {
               error = ERROR_MESSAGES.required
            } else if ((value as string).length < 10) {
               error = ERROR_MESSAGES.invalidNumber
            }
            break
         case "relevantExp":
         case "managementExp":
            if (isNaN(numberInput)) {
               error = ERROR_MESSAGES.required
            } else if (numberInput === 0) {
               error = ERROR_MESSAGES.greaterThanZero
            }
            break
         case "css":
         case "python":
         case "js":
            if (!values.js && !values.css && !values.python && !value) {
               error = ERROR_MESSAGES.selectAtleastOneSkill
            }
            break
         case "date":
            if (!value || (value as string).trim().length === 0) {
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

         if (key === "relevantExp" && values.position === "Manager") return
         if (key === "portfolio" && values.position !== "Designer") return
         if (key === "managementExp" && values.position !== "Manager") return

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

   const handleChange = (
      event:
         | React.ChangeEvent<HTMLInputElement>
         | { target: { name: string; value: string } },
   ) => {
      const { name, value, checked, type } = event.target as HTMLInputElement
      const val = type === "checkbox" ? checked : value

      setValues((prevValues) => {
         const newValues = {
            ...prevValues,
            [name]: val,
         }

         // Update the other field to default if necessary
         if (name === "managementExp" && val) {
            newValues.relevantExp = null
         } else if (name === "relevantExp" && val) {
            newValues.managementExp = "0"
         }

         validateField(name as keyof EventFormType, val)

         if (name === "js" || name === "css" || name === "python") {
            const { js, css, python } = newValues
            if (!js && !css && !python) {
               setErrors((prevErrors) => ({
                  ...prevErrors,
                  js: ERROR_MESSAGES.selectAtleastOneSkill,
               }))
            } else {
               setErrors((prevErrors) => ({
                  ...prevErrors,
                  js: null,
               }))
            }
         }

         return newValues
      })
   }

   useEffect(() => {
      if (!values.managementExp) {
         setValues((prevValues) => ({ ...prevValues, managementExp: null }))
      }
      if (!values.relevantExp) {
         setValues((prevValues) => ({ ...prevValues, relevantExp: null }))
      }
      if (!values.portfolio) {
         setValues((prevValues) => ({ ...prevValues, portfolio: null }))
      }
   }, [values.managementExp, values.relevantExp, values.portfolio])

   const onSubmit = () => {
      return validateAllFields()
   }

   return { values, errors, handleChange, onSubmit }
}

export default useJobForm

"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import CustomFormField from "../ui/CustomFormField"


export enum FormFieldType{
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton"
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "2 names needed",
  }),
})
 
export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
   function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <section className="mb-12 space-y-4">
            <h1 className="text-24-bold header">Hi There 👋</h1>
            <p className="text-dark-700">Schedule an appointment, NOW</p>
          </section>

          <CustomFormField 
          fieldType = {FormFieldType.INPUT}
          control = {control}
          name="name"
          label="label"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          />
            <Button type="submit">SUBMIT</Button>
        </form>
    </Form>
  )
}

export default ProfileForm
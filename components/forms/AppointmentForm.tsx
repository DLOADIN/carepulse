'use client'

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomFormField from "../ui/CustomFormField";
import SubmitButton from "../ui/submitButton";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from 'next/navigation'; 
import { createUser } from "@/lib/actions/patient.action";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton"
}

const AppointmentForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(data: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const user = await createUser(data);

      if (user) {
        router.push(`/patients/${user.$id}/register`);
      }
    } catch (error) {
      console.error(error); // Improved error handling
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="mb-12 space-y-4">
          <h1 className="text-24-bold header">Hi There 👋</h1>
          <p className="text-white">Schedule an appointment, NOW</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="J.doe@email.com"
          iconSrc="/assets/icons/email.svg"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="(+250)"
          iconSrc="/assets/icons/phone.svg"
        />

        <SubmitButton isLoading={isLoading}>GET STARTED</SubmitButton>
      </form>
    </FormProvider>
  );
};

export default AppointmentForm;

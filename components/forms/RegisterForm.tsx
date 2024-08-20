'use client'

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomFormField from "../ui/CustomFormField";
import SubmitButton from "../ui/submitButton";
import { UserFormValidation } from "@/lib/validation";
import { FormFieldType } from "./PatientForm";
import { useRouter } from 'next/navigation'; 
import { createUser } from "@/lib/actions/patient.action";
import { FormControl } from "../ui/form";
import { Doctors, GenderOptions } from "@/constants/index";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { SelectItem } from "@/components/ui/select"


const RegisterForm = ({ user }: { user: User}) => {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let Us Know More About Yourself</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>

        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDay"
            label="Day of Birth"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field)=>(
              <FormControl>
                <RadioGroup className="flex h-11 gap-6 xl:justify-between" onChange={field.onChange} defaultValue={field.value}>
                    {GenderOptions.map((option) =>
                      <div key={option} className="radio-group">
                          <RadioGroupItem value={option} id={option}>
                            <Label htmlFor={option} className="cursor-pointer ">
                              { option }
                            </Label>
                          </RadioGroupItem>
                      </div>
                    )}
                </RadioGroup>
              </FormControl>
            )}
            iconSrc="/assets/icons/phone.svg"
          />

        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="address"
          label="Address"
          placeholder="KK 124 K Street"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="occupation"
          label="Occupation"
          placeholder="Software Engineer"
        />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency Contact Name"
              placeholder="Parent's Name"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency Contact Number"
              placeholder="(+250)"
              iconSrc="/assets/icons/phone.svg"
            />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>
          <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Primary Physician"
              placeholder="Select a physician"
              iconSrc="/assets/icons/phone.svg"
            >
            { Doctors.map( (doctor) =>(
              <SelectItem key={doctor.name} value={doctor.name}>
                 <div className="flex cursor-pointer items-center gap-2">
                    <Image 
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt={doctor.name}
                    className="rounded-full border border-dark-300"/>
                  </div>
              </SelectItem>
            ))}
          </CustomFormField>
        
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="InsuranceProvider"
              label="Insurance Provider"
              placeholder="RSSB, MMI, RADIANT, RAMA, ect"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="InsurancePolicyNumber"
              label="Insurance Policy Number"
              placeholder="ABX-129377236848-TNT "
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="InsuranceProvider"
              label="Insurance Provider"
              placeholder="RSSB, MMI, RADIANT, RAMA, ect"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="InsurancePolicyNumber"
              label="Insurance Policy Number"
              placeholder="ABX-129377236848-TNT "
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="alergies"
              label="alergies (if any)"
              placeholder="Peanuts, dogs, cats, others"
            />

        <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current medications"
              placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="family Medical History"
              placeholder="Mother had diabetes II, Father had none"
            />

        <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
            />
        </div>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">Identification</h2>
            </div>
        </section>

        <SubmitButton isLoading={isLoading}>GET STARTED</SubmitButton>
      </form>
    </FormProvider>
  );
};

export default RegisterForm

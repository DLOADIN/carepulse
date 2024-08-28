'use client'

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomFormField from "../ui/CustomFormField";
import SubmitButton from "../ui/submitButton";
import {  getAppointmentSchema, CreateAppointmentSchema } from "@/lib/validation";
import { useRouter } from 'next/navigation'; 
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.action";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import { Doctors, GenderOptions, PatientFormDefaultValues } from "@/constants/index";
import { scheduler } from "timers/promises";
import { Appointment } from "@/types/appwrite.types";
import { formatDateTime } from "@/lib/utils";


export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton"
}

const AppointmentForm = ( { userId, patientId, type, appointment, setOpen}:
  { 
    userId: string,
    patientId: string,
    type: "create" | "cancel" | "schedule",
    appointment?:Appointment,
    setOpen: (open: boolean) => void;
  }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type)

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : '',
      schedule: appointment ? new Date(appointment.schedule): new Date(),
      reason: appointment ? appointment.reason : '',
      note: appointment ? appointment.note : '',
      cancellationReason: appointment ? appointment.reason : '',
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);

    let status;

    switch(type){
      case 'schedule':
        status = 'scheduled';
        break;

      case 'cancel':
        status = 'cancelled';
        break;

      
      default:
        status = 'pending';
        break;
    }

    try {
      
      if(type === 'create' && patientId){
        const appointmentData ={
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        }
      
        const appointment = await createAppointment(appointmentData);

        if(appointment){
          form.reset();
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
        }
      }
      else{
        const appointmentToUpdate =  {
          userId,
          appointmentId: appointment?.id!,
          appointment:{
            primaryPhysician: values?.primaryPhysician,
            schedule: new Date(values?.schedule),
            status: status as Status,
            cancellationReason: values?.cancellationReason,
          },
          type
        }

        const UpdatedAppointment = await updateAppointment(appointmentToUpdate);

        if(UpdatedAppointment){
          setOpen && setOpen(false);
          form.reset();
        }
      }

    } catch (error) {
      console.error(error); // Improved error handling
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
  }

  let buttonLabel;

  switch (type){
      case 'cancel':
      buttonLabel = 'Cancel Appointment';
      break;
    
      case 'create':
      buttonLabel = 'Create an Appointment';
      break;

      case 'schedule':
      buttonLabel = 'Schedule Appointment';
      break;

      default:
      break;
  }
  
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        { type === 'create' && <section className="mb-12 space-y-4">
          <h1 className="text-24-bold header">New Appointment</h1>
          <p className="text-white">You may schedule an appointment just in 10 seconds</p>
        </section>}

        { type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
              iconSrc="/assets/icons/phone.svg"
              >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt={doctor.name}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
         </CustomFormField>

         <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="schedule"
          label="Expected Appointment date"
          showTimeSelect
          dateFormat="MM/dd/YYYY - h:mm aa"
          />
          
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason For Appointment"
                placeholder="Enter reason for Appointment"
              />

          <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="notes"
                placeholder="Enter notes"
              />
          </div>
          </>
        )}

        { type === "cancel" && (
          <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="cancellationReason"
          label="Reason for Cancellation "
          placeholder="Enter reason for cancellation"
        />
        )}

        <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}>{ buttonLabel }</SubmitButton>
      </form>
    </FormProvider>
  );
};

export default AppointmentForm;

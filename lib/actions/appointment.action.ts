'use server'

import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PROJECT_ID,
  databases,
  messaging,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";
import { string } from "zod";
import { formatDateTime } from "@/lib/utils";

export const createAppointment = async(appointment: CreateAppointmentParams) =>{
  try{
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );
  return parseStringify(newAppointment)
  }
  catch(error){
    console.log(error)
  }
}

export const getAppointment = async(appointmentId: string) => {
  try{
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
    );

    return parseStringify(appointment)
  }
  catch (error){
    console.log(error);
  }
}

export const getRecentAppointments = async () =>{
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent appointments:",
      error
    );
  }
};

export const updateAppointment = async ( { appointmentId, userId, appointment, type }:
  UpdateAppointmentParams) => {
    try{
      const updateAppointment = await databases.updateDocument(
        DATABASE_ID!,
        APPOINTMENT_COLLECTION_ID!,
        appointmentId,
        appointment
      )

      if(!updateAppointment){
        throw new Error('Appointment not found')
      }

      const smsMessage = `Hi, it's Carepulse. Your appointment has been 
      ${type === 'schedule' ? `Your appointment has been scheduled for 
      ${formatDateTime(appointment.schedule!.dateTime)} with Dr.${appointment.primaryPhysician}`:
      `We regret to inform your appointment has been cancelled due to the following
      Reason: ${appointment.cancellation}`
    }`;

      
      await sendSMSNotification(userId,smsMessage);

      revalidatePath('/admin');
      return parseStringify(updateAppointment)
    }
    catch(error){
      console.log(error);
    }
}

export const sendSMSNotification = async ( userId:string, content:string) => {
  try{
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    )

    return parseStringify(message)
  }
  catch(error){
    console.log(error)
  }
}
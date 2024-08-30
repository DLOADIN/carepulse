import React from 'react';
import Link  from 'next/link';
import  Image from 'next/image';
import { getAppointment } from '@/lib/actions/appointment.action';
import { Doctors } from '@/constants';
import { formatDateTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import * as Sentry from '@sentry/nextjs';
import { getUser } from '@/lib/actions/patient.action';

const Success = async ( { params: {userId}, searchParams }: SearchParamProps) => {
  const appointmentId = ( searchParams?.appointmentId as string) || '';
  const appointment = await getAppointment(appointmentId);
  const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician);
  const user = await getUser(userId);

  Sentry.metrics.set("user_view_appointment_success",user.name);


  return(
    <div className="flex h-screen max-h-screen px-[5%]">
      <div>
        <Link href='/'> 
          <Image 
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image 
          src="/assets/gifs/success.gif"
          height={300}
          width={280}
          alt="Success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your<span className="text-green-600"> appointment request</span> has successfully submitted
          </h2>
          <p className="text-center">We shall be in touch to confirm</p>
        </section>

        <section className="request-details">
          <p>Requested Appointment details:</p>
          <div className="flex items-center gap-3">
            <Image 
              src={doctor?.name!}
              alt="Doctor Image"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex -gap-2">
          <Image 
          src="/assets/icons/calender.svg"
          width={25}
          height={25}
          alt="Calender"
          />
          <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/patients/${userId}/new-apppointment`}>
            New Appointment
            </Link>
        </Button>

        <p className="copyright text-center">© 2024 Carepulse</p>
        
      </div>
    </div>
  )
}

export default Success;
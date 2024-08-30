import AppointmentForm from "@/components/forms/AppointmentForm";
import Image from "next/image";
import { getPatient } from "@/lib/actions/patient.action";
import * as Sentry from '@sentry/nextjs';

export default  async function NewAppointment( {params: {userId}}: SearchParamProps ) {
  const patient = await getPatient(userId)
  Sentry.metrics.set("user_view_user_new_appointment",patient.name);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
          <div className="sub-container max-w-[860px] flex justify-between">
            <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
            />
            
            <AppointmentForm 
            type="create" 
            userId={userId}
            patientId={patient.$id}/>
              
            <p className="copyright mt-5 py-10 text-green-500 xl:text-left">© 2024 Carepulse</p>
          </div>
      </section>
        <Image 
          height={1000}
          width={1000}
          alt="appointment"
          className="side-img max-w-[390px] bg-bottom"
          src="/assets/images/appointment-img.png"
        />
    </div>
  )
}

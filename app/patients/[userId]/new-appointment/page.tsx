import PatientForm from "@/components/forms/AppointmentForm";
import Image from "next/image";


export default function NewAppointment() {
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
            
            {/* <AppointmentForm /> */}
              <p className="justify-items-end text-green-500 xl:text-left">© 2024 Carepulse</p>
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

import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import Image from "next/image";


export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
          <div className="sub-container max-w-[496px]">
            <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
            />
            
            <PatientForm />
            <div className="text-14-regular mt-20 flex justify-between">
              <p className="justify-items-end text-green-500 xl:text-left">© 2024 Carepulse</p>
              <Link href="/?admin=true" className="text-green-500">
                Admin
              </Link>
              </div>
          </div>
      </section>
        <Image 
          height={1000}
          width={1000}
          alt="Patient"
          className="side-img max-w-[50%]"
          src="/assets/images/onboarding-img.png"
        />
    </div>
  )
}

'use client'

import React from "react";
import Image from 'next/image'
import { getUser } from '@/lib/actions/patient.action' ;
import RegisterForm from "@/components/forms/RegisterForm";
import * as Sentry from '@sentry/nextjs';

const Register = async({params: {userId} }: SearchParamProps) => {
      const user = await getUser(userId);

      Sentry.metrics.set("user_view_user_register",user.name);

  return (
    <div className="flex h-screen max-h-screen">
    <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
          src="/assets/icons/logo-full.svg"
          height={1000}
          width={1000}
          alt="patient"
          className="mb-12 h-10 w-fit"
          />
          
          <RegisterForm user={user}/>
          <p className="copyright text-14-regular py-12">© 2024 Carepulse</p>
        </div>
    </section>
      <Image 
        height={1000}
        width={1000}
        alt="Patient"
        className="side-img max-w-[390px]"
        src="/assets/images/register-img.png"
      />
  </div>
  )
}

export default Register


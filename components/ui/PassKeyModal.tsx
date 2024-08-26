'use-client'

import React from 'react';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import Image from "next/image";
import { useRouter } from 'next/router';

const PassKeyModal = () => {
  const router = useRouter;
  const [ open, setOpen ] = useState(true);
  const [ passkey,setPasskey ] = useState('');
  const [ error,setError ]  = useState('');

const closeModal = () =>{
  setOpen(false)
}

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
      <AlertDialogContent className="shad-alert-dialog">
    <AlertDialogHeader>
      <AlertDialogTitle className="flex items-start justify-between">
        Admin Access Verification
        <Image 
          src="/assets/icons/close.svg"
          width={20}
          height={20}
          alt="close"
          onClick={() => closeModal()}
          className="cursor-pointer"
        />
      </AlertDialogTitle>
      <AlertDialogDescription>
        To access the admin page, Please Enter the passkey
      </AlertDialogDescription>
    </AlertDialogHeader>

    <div>
      <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
        <InputOTPGroup className="shad-otp">
          <InputOTPSlot className="shad-otp-slot" index={0} />
          <InputOTPSlot className="shad-otp-slot" index={1} />
          <InputOTPSlot className="shad-otp-slot" index={2} />
          <InputOTPSlot className="shad-otp-slot" index={3} />
          <InputOTPSlot className="shad-otp-slot" index={4} />
          <InputOTPSlot className="shad-otp-slot" index={5} />
        </InputOTPGroup>
      </InputOTP>

      {error && 
        <p className="shad-error text-14-regular mt-4 flex justify-normal">
          {error}    
        </p>}
    </div>

    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default PassKeyModal
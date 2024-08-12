import React from 'react';
import { Button } from "@/components/ui/button"
import Image from "next/image";

interface ButtonProps{
  isLoading?: boolean,
  className?: string,
  children: React.ReactNode
}
const SubmitButton = ({isLoading, className, children}: ButtonProps) =>{
  return(
    <>
    <Button type="submit" disabled={isLoading} className={className ?? 'w-full shad-primary-btn'}>
      {isLoading ? (
        <div className="flex items-center gap-2">
            <Image 
            alt="loader"
            height={24}
            width={24}
            src="/assets/icons/loader.svg"
            className="animate-spin"
            ></Image>

        </div>
      ): children}
    </Button>
    </>
  )
}

export default SubmitButton
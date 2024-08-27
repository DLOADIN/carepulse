import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import Statcard from '@/components/ui/Statcard';

const Admin = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
            <Image 
              src="/assets/icon/logo-full.svg"
              height={32}
              width={32}
              alt="logo"
              className="h-10 w-fit"
            />
        </Link>

        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Start day with managing new appointments</p>
        </section>

        <section className="admin-stat">
          
          <Statcard 
          type="appointments"
          count={5}
          label="Scheduled Appointments"
          icon="/assets/icons/appointments.svg"
          />

          <Statcard 
          type="pending"
          count={10}
          label="Pending Appointments"
          icon="/assets/icons/pending.svg"
          />

          <Statcard 
          type="cancelled"
          count={5}
          label="Cancelled Appointments"
          icon="/assets/icons/cancelled.svg"
          />

        </section>
      </main>
    </div>
  )
}

export default Admin
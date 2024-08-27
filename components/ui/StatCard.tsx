import React from 'react';


interface StatCardProps{
  type:'appointments' | 'pending' | 'cancelled';
  count: number;
  label: string;
  icon: string;
}

const Statcard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div>Statcard</div>
  )
}

export default Statcard
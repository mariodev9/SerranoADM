import { useState, ReactNode } from 'react';


export default function Layout({

  children
}: {

  children: ReactNode;
}) {

  return (
    <div className="w-full mx-auto h-screen flex overflow-hidden">
      Layout
      {children}
      layout
    </div>
  );
}

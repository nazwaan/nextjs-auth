'use client';
import Image from "next/image"
import React, { useState, useEffect } from 'react'

export interface SignedPayload {
  id: number;
  username: string;
  name: string;
  type: string;
  iat: number;
  exp: number;
}

export default function Home() {
  let [message, setMessage] = useState('')

  useEffect(() => {
    let userData = sessionStorage.getItem("user-data")

    if(userData) {
      const user = JSON.parse(userData) as SignedPayload
      setMessage(`Logged in as ${user.name}`)
    } else setMessage("Something went wrong!")
  }, []);

  return (
    <div className="home-page">
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <p>{ message }</p>
    </div>
  );
}

"use client"

import { SignIn } from "@clerk/nextjs"

export default function LoginPage(){
  return (
    <div style={{display:"flex",justifyContent:"center",marginTop:100}}>
      <SignIn fallbackRedirectUrl="/dashboard" />
    </div>
  )
}
"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Landing(){

const router = useRouter()

/* --------------------------- STATE (ANIMATION) --------------------------- */

const [visible, setVisible] = useState(false)

useEffect(()=>{
  setTimeout(()=>setVisible(true), 200)
},[])

/* --------------------------- THEME --------------------------- */

const page = {
  minHeight: "100vh",
  background: `
    radial-gradient(circle at 20% 20%, rgba(37,99,235,0.35), transparent 40%),
    radial-gradient(circle at 80% 30%, rgba(56,189,248,0.25), transparent 40%),
    radial-gradient(circle at 50% 80%, rgba(255,221,87,0.15), transparent 50%),
    #020617
  `,
  color:"#fff",
  fontFamily:"Inter, sans-serif",
  overflow:"hidden",
  position:"relative" as const
}

const section = {
  padding:"100px 20px",
  maxWidth:1100,
  margin:"0 auto"
}

const card = {
  background:"rgba(255,255,255,0.05)",
  padding:30,
  borderRadius:16,
  border:"1px solid rgba(255,255,255,0.08)",
  transition:"all 0.3s ease"
}

const buttonPrimary = {
  background:"linear-gradient(135deg,#2563eb,#38bdf8,#facc15)",
  padding:"16px 30px",
  borderRadius:14,
  border:"none",
  color:"#fff",
  fontWeight:"700",
  cursor:"pointer",
  transition:"all 0.3s ease"
}

/* --------------------------- COMPONENT --------------------------- */

return (
<div style={page}>

{/* NAVBAR */}
<div style={{
  position:"fixed",
  top:0,
  width:"100%",
  display:"flex",
  justifyContent:"space-between",
  padding:"20px 40px",
  background:"rgba(255,255,255,0.05)",
  backdropFilter:"blur(20px)",
  zIndex:10
}}>
  <h2>SarpheAI</h2>
  <button onClick={()=>router.push("/generator")}>
    Get Started
  </button>
</div>

{/* HERO */}
<div style={{
  minHeight:"100vh",
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  justifyContent:"center",
  textAlign:"center",
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(40px)",
  transition:"all 0.8s ease"
}}>
  <h1 style={{
    fontSize:60,
    fontWeight:"bold",
    background:"linear-gradient(90deg,#38bdf8,#60a5fa,#fff)",
    WebkitBackgroundClip:"text",
    WebkitTextFillColor:"transparent"
  }}>
    Build a winning store in 60 seconds
  </h1>

  <p style={{color:"#cbd5f5", marginTop:20}}>
    AI finds, builds, and launches your Shopify store instantly
  </p>

  <button
    style={buttonPrimary}
    onClick={()=>router.push("/generator")}
  >
    🚀 Try for FREE
  </button>

  {/* TRUST BADGE */}
  <div style={{
    marginTop:20,
    opacity:0.7,
    fontSize:14
  }}>
    ✔ No coding • ✔ Beginner friendly • ✔ Cancel anytime
  </div>

</div>

{/* DEMO SECTION (UPGRADED) */}
<div style={section}>
<h2 style={{fontSize:32, marginBottom:20}}>See it in action</h2>

<div style={{
  ...card,
  textAlign:"center",
  overflow:"hidden",
  position:"relative"
}}>

{/* Fake animated preview */}
<div style={{
  height:200,
  borderRadius:12,
  background:"linear-gradient(135deg,#0f172a,#1e293b)",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  fontSize:14,
  color:"#94a3b8",
  marginBottom:20
}}>
  🔥 Live AI Store Preview Loading...
</div>

<p>Paste product → AI builds → Launch instantly</p>

<button
style={{...buttonPrimary, marginTop:20}}
onClick={()=>router.push("/generator")}
>
Try Demo
</button>

</div>
</div>

{/* FEATURES */}
<div style={section}>
<h2 style={{fontSize:32, marginBottom:40}}>Why SarpheAI?</h2>

<div style={{
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
  gap:20
}}>

<div style={card}>
<h3>⚡ Instant Store</h3>
<p>No coding. Generate full store instantly.</p>
</div>

<div style={card}>
<h3>🎯 High Conversion</h3>
<p>Optimized layouts that actually sell.</p>
</div>

<div style={card}>
<h3>🤖 AI Powered</h3>
<p>Product, copywriting & design done for you.</p>
</div>

<div style={card}>
<h3>📈 Winning Products</h3>
<p>AI helps identify profitable items.</p>
</div>

<div style={card}>
<h3>🛒 Shopify Ready</h3>
<p>Export directly to your store.</p>
</div>

<div style={card}>
<h3>🚀 Fast Launch</h3>
<p>Go live in minutes, not days.</p>
</div>

</div>
</div>

{/* HOW IT WORKS */}
<div style={section}>
<h2 style={{fontSize:32, marginBottom:30}}>How it works</h2>

<div style={{display:"flex", flexDirection:"column", gap:20}}>
<div>1. Paste product link</div>
<div>2. AI builds your store</div>
<div>3. Launch & start selling</div>
</div>
</div>

{/* PRICING */}
<div style={section}>
<h2 style={{fontSize:32, marginBottom:40}}>Pricing</h2>

<div style={{
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
  gap:20
}}>

<div style={card}>
<h3>Starter</h3>
<h2>$9</h2>
<p>Basic store generation</p>
</div>

<div style={{...card, border:"2px solid #38bdf8"}}>
<h3>Pro</h3>
<h2>$29</h2>
<p>Advanced AI + better design</p>
</div>

<div style={card}>
<h3>Lifetime</h3>
<h2>$79</h2>
<p>One-time payment</p>
</div>

</div>

{/* STRIPE TRUST */}
<div style={{
marginTop:40,
display:"flex",
justifyContent:"center"
}}>
<div style={{
padding:"10px 20px",
border:"1px solid rgba(255,255,255,0.1)",
borderRadius:999,
background:"rgba(255,255,255,0.03)",
fontSize:14,
opacity:0.8
}}>
🔒 Secured by Stripe
</div>
</div>

</div>

{/* FAQ */}
<div style={section}>
<h2 style={{fontSize:32, marginBottom:40}}>FAQ</h2>

<div style={{display:"flex", flexDirection:"column", gap:20}}>

<div style={card}>
<h4>How does it work?</h4>
<p>Paste a product link and AI builds your store instantly.</p>
</div>

<div style={card}>
<h4>Do I need coding?</h4>
<p>No. Everything is automated.</p>
</div>

<div style={card}>
<h4>How fast?</h4>
<p>You can launch within minutes.</p>
</div>

</div>
</div>

{/* FINAL CTA */}
<div style={{
  textAlign:"center",
  padding:80
}}>
<h2>Start building your first profitable store today</h2>

<button
style={buttonPrimary}
onClick={()=>router.push("/generator")}
>
🚀 Get Started
</button>
</div>

</div>
)
}
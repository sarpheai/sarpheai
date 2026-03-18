"use client"

import { useRouter } from "next/navigation"

export default function Landing(){

const router = useRouter()

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
  border:"1px solid rgba(255,255,255,0.08)"
}

const buttonPrimary = {
  background:"linear-gradient(135deg,#2563eb,#38bdf8,#facc15)",
  padding:"16px 30px",
  borderRadius:14,
  border:"none",
  color:"#fff",
  fontWeight:"700",
  cursor:"pointer"
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
  textAlign:"center"
}}>
  <h1 style={{
    fontSize:60,
    fontWeight:"bold",
    background:"linear-gradient(90deg,#38bdf8,#60a5fa,#fff)",
    WebkitBackgroundClip:"text",
    WebkitTextFillColor:"transparent"
  }}>
    Build a winning store in minutes
  </h1>

  <p style={{color:"#cbd5f5", marginTop:20}}>
    AI generates your entire Shopify store instantly
  </p>

  <button
    style={buttonPrimary}
    onClick={()=>router.push("/generator")}
  >
    🚀 Try for FREE
  </button>
</div>

{/* FEATURES */}
<div style={section}>
<h2 style={{fontSize:32, marginBottom:40}}>Why SarpheAI?</h2>

<div style={{
  display:"grid",
  gridTemplateColumns:"repeat(3,1fr)",
  gap:20
}}>

<div style={card}>
<h3>⚡ Instant Store</h3>
<p>No coding. Generate full store instantly.</p>
</div>

<div style={card}>
<h3>🎯 High Conversion</h3>
<p>Optimized for sales and performance.</p>
</div>

<div style={card}>
<h3>🤖 AI Powered</h3>
<p>Product, copywriting & layout done for you.</p>
</div>

</div>
</div>

{/* DEMO */}
<div style={section}>
<h2 style={{fontSize:32, marginBottom:20}}>See it in action</h2>

<div style={{...card, textAlign:"center"}}>
<p>Paste product → AI builds store → ready to sell</p>

<button
style={{...buttonPrimary, marginTop:20}}
onClick={()=>router.push("/generator")}
>
Try Demo
</button>
</div>
</div>

{/* PRICING */}
<div style={section}>
<h2 style={{fontSize:32, marginBottom:40}}>Pricing</h2>

<div style={{
  display:"grid",
  gridTemplateColumns:"repeat(3,1fr)",
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

{/* FOOTER CTA */}
<div style={{
  textAlign:"center",
  padding:80
}}>
<h2>Start building your store now</h2>

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
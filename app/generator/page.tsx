"use client"

import { useState } from "react"

export default function Generator() {

/* ---------------------------
🔥 PREMIUM DESIGN SYSTEM
--------------------------- */

const theme = {
  bg: "radial-gradient(circle at top,#020617,#000)",
  glass: "rgba(255,255,255,0.04)",
  border: "rgba(255,255,255,0.08)",
  primary: "#38bdf8",
  accent: "#6366f1",
  text: "#f8fafc",
  muted: "#94a3b8"
}

const page = {
  background: theme.bg,
  minHeight: "100vh",
  color: theme.text,
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  padding: 40,
  fontFamily: "Inter, sans-serif"
}

const card = {
  background: theme.glass,
  border: `1px solid ${theme.border}`,
  borderRadius: 20,
  padding: 40,
  maxWidth: 900,
  width: "100%",
  textAlign: "center" as const,
  backdropFilter: "blur(16px)",
  boxShadow: "0 20px 80px rgba(0,0,0,0.6)"
}

const title = {
  fontSize: 52,
  fontWeight: "800",
  marginBottom: 20,
  background: "linear-gradient(90deg,#38bdf8,#6366f1)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: 18,
  marginTop: 25
}

const input = {
  width: "100%",
  padding: 18,
  borderRadius: 14,
  border: `1px solid ${theme.border}`,
  background: "rgba(255,255,255,0.03)",
  color: "white",
  marginBottom: 20,
  fontSize: 15,
  backdropFilter: "blur(10px)"
}

const button = {
  background: "linear-gradient(135deg,#38bdf8,#6366f1)",
  padding: "18px 36px",
  borderRadius: 14,
  border: "none",
  color: "white",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: 16,
  boxShadow: "0 10px 40px rgba(56,189,248,0.35)",
  transition: "0.25s"
}

const code = {
  background: "rgba(255,255,255,0.03)",
  padding: 20,
  borderRadius: 14,
  maxWidth: 900,
  overflow: "auto",
  whiteSpace: "pre-wrap" as const,
  border: `1px solid ${theme.border}`,
  backdropFilter: "blur(10px)"
}

/* --------------------------- */

const [step, setStep] = useState(1)
const [productUrl, setProductUrl] = useState("")
const [productData, setProductData] = useState<any>(null)
const [result, setResult] = useState<any>(null)
const [showCode, setShowCode] = useState(false)

const [loading, setLoading] = useState(false)
const [analysis, setAnalysis] = useState(false)

const [aiStep, setAiStep] = useState(0)
const [niche, setNiche] = useState("")

async function importProduct() {

  if (!productUrl) {
    alert("Paste a product URL first")
    return
  }

  setAnalysis(true)

  try {

    const res = await fetch("/api/import-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: productUrl })
    })

    const data = await res.json()

    setProductData(data)

    setAiStep(1)
    setTimeout(() => setAiStep(2), 3000)
    setTimeout(() => setAiStep(3), 6000)
    setTimeout(() => setAiStep(4), 9000)

    setTimeout(() => {
      setAnalysis(false)
      setStep(4)
    }, 11000)

  } catch (error) {

    console.error(error)
    alert("Failed to import product")
    setAnalysis(false)

  }

}

async function generateStore() {

  if (!productData) {
    alert("Import product first")
    return
  }

  setLoading(true)

  try {

    let productName =
      productData?.title ||
      productData?.name ||
      productData?.productTitle ||
      document.querySelector("h1")?.textContent ||
      "Product"

    if (
      productName.toLowerCase().includes("aliexpress") ||
      productName.length < 3
    ) {
      productName = productData?.title || "Product"
    }

    productName = productName
      .split(" ")
      .slice(0, 6)
      .join(" ")

    const brandRes = await fetch("/api/generate-brand", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product: productName,
        niche: niche
      })
    })

    const brandData = await brandRes.json()

    const copyRes = await fetch("/api/generate-copy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product: productName,
        niche: niche
      })
    })

    const copyData = await copyRes.json()

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product: productName,
        storeName: brandData.storeName,
        description: copyData?.description || "",
        images: productData?.images || [],
        price: productData?.price || "",
        niche: niche || "general"
      })
    })

    const data = await res.json()

    const themeCode = [
      data.header,
      data.hero,
      data.gallery,
      data.socialProof,
      data.benefits,
      data.features,
      data.reviews,
      data.faq,
      data.cta
    ].filter(Boolean).join("\n\n")

    setResult({
      code: themeCode,
      storeName: brandData.storeName,
      tagline: brandData.tagline
    })

    setStep(6)

  } catch (err) {

    console.error(err)
    alert("AI failed")

  }

  setLoading(false)

}

function copyCode() {
  navigator.clipboard.writeText(result?.code || "")
  alert("Theme copied")
}

function openPreview() {

  const newWindow = window.open()

  if (newWindow) {
    newWindow.document.write(result?.code || "")
    newWindow.document.close()
  }

}

function downloadStore() {

  const element = document.createElement("a")

  const file = new Blob([result?.code || ""], { type: "text/html" })

  element.href = URL.createObjectURL(file)
  element.download = "sarphe-store.html"

  document.body.appendChild(element)
  element.click()

}

function NicheButton({ value, label }: { value: string, label: string }) {

  return (
    <button
      onClick={() => {
        setNiche(value)
        setStep(2)
      }}
      onMouseEnter={(e)=>{
        e.currentTarget.style.transform = "translateY(-4px)"
        e.currentTarget.style.background = "rgba(56,189,248,0.1)"
      }}
      onMouseLeave={(e)=>{
        e.currentTarget.style.transform = "translateY(0px)"
        e.currentTarget.style.background = "rgba(255,255,255,0.03)"
      }}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${theme.border}`,
        padding: "18px",
        borderRadius: 14,
        color: "white",
        cursor: "pointer",
        fontWeight: "600",
        backdropFilter: "blur(10px)",
        transition: "0.25s"
      }}
    >
      {label}
    </button>
  )

}

if (analysis) {
  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>SarpheAI Builder</h1>
        <p style={{ opacity: aiStep >= 1 ? 1 : 0.3 }}>🔎 Analyzing product</p>
        <p style={{ opacity: aiStep >= 2 ? 1 : 0.3 }}>🖼 Extracting images</p>
        <p style={{ opacity: aiStep >= 3 ? 1 : 0.3 }}>⚙ Preparing store structure</p>
        <p style={{ opacity: aiStep >= 4 ? 1 : 0.3 }}>🤖 Generating store layout</p>
      </div>
    </div>
  )
}

if (step === 1) {
  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>Choose your store niche</h1>
        <div style={grid}>
          <NicheButton value="pets" label="Pets" />
          <NicheButton value="fitness" label="Fitness" />
          <NicheButton value="beauty" label="Beauty" />
          <NicheButton value="tech" label="Tech" />
          <NicheButton value="baby" label="Baby" />
          <NicheButton value="home" label="Home" />
          <NicheButton value="fashion" label="Fashion" />
          <NicheButton value="jewelry" label="Jewelry" />
          <NicheButton value="car" label="Car Accessories" />
        </div>
      </div>
    </div>
  )
}

if (step === 2) {
  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>Paste product page URL</h1>
        <input value={productUrl} onChange={(e) => setProductUrl(e.target.value)} placeholder="Paste product URL" style={input} />
        <button
          onClick={importProduct}
          style={button}
          onMouseEnter={(e)=> e.currentTarget.style.transform="scale(1.05)"}
          onMouseLeave={(e)=> e.currentTarget.style.transform="scale(1)"}
        >
          Import Product
        </button>
      </div>
    </div>
  )
}

if (step === 4) {

  const productName =
    productData?.title ||
    productData?.name ||
    productData?.productTitle ||
    "Product"

  return (
    <div style={page}>
      <div style={card}>

        <h1 style={title}>Detected Product</h1>

        <p style={{ marginBottom: 20, fontWeight: "600" }}>
          {productName}
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: 12
        }}>

          {(productData?.images || [])
            .filter((img: string) => img && img.includes("http"))
            .slice(0, 8)
            .map((img: string, i: number) => {

              let fixedImg = (img || "").trim()

              if (fixedImg.startsWith("//")) {
                fixedImg = "https:" + fixedImg
              }

              if (fixedImg.startsWith("http://")) {
                fixedImg = fixedImg.replace("http://", "https://")
              }

              if (!fixedImg.startsWith("http")) {
                fixedImg = "https://" + fixedImg
              }

              return (
                <img
                  key={i}
                  src={fixedImg}
                  style={{
                    width: "100%",
                    height: 160,
                    objectFit: "cover",
                    borderRadius: 14,
                    boxShadow: "0 10px 40px rgba(0,0,0,0.6)"
                  }}
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.display = "none"
                  }}
                />
              )

            })}

        </div>

        <button
          onClick={() => setStep(5)}
          style={{ ...button, marginTop: 30 }}
          onMouseEnter={(e)=> e.currentTarget.style.transform="scale(1.05)"}
          onMouseLeave={(e)=> e.currentTarget.style.transform="scale(1)"}
        >
          Continue
        </button>

      </div>
    </div>
  )
}

if (step === 5) {
  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>Ready to build your AI store</h1>
        <button
          onClick={generateStore}
          style={button}
          onMouseEnter={(e)=> e.currentTarget.style.transform="scale(1.05)"}
          onMouseLeave={(e)=> e.currentTarget.style.transform="scale(1)"}
        >
          {loading ? "⚡ AI Building Store..." : "Generate Store"}
        </button>
      </div>
    </div>
  )
}

if (step === 6) {
  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>Your Store Theme</h1>
        <p style={{ fontWeight: "700" }}>{result?.storeName}</p>
        <p style={{ opacity: 0.7 }}>{result?.tagline}</p>

        <iframe
          srcDoc={result?.code || ""}
          style={{
            width: "100%",
            height: "700px",
            border: "none",
            borderRadius: "12px",
            background: "white",
            margin: "30px 0"
          }}
        />

        <div style={{ display: "flex", gap: 15, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={openPreview} style={button}>Open Full Preview</button>
          <button onClick={() => setShowCode(!showCode)} style={button}>
            {showCode ? "Hide Theme Code" : "Show Theme Code"}
          </button>
          <button onClick={copyCode} style={button}>Copy Theme Code</button>
          <button onClick={downloadStore} style={button}>Download Store</button>
        </div>

        {showCode && (
          <pre style={{ ...code, marginTop: 20 }}>
            {result?.code}
          </pre>
        )}
      </div>
    </div>
  )
}

return null
}
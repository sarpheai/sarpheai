import { supabase } from "@/lib/supabase"

/* 🔥 NEW FEATURE: PRODUCT SCORING */
function calculateScore(title:string, price:string, images:string[]){

let score = 0

const numericPrice = parseFloat(price)

if(!isNaN(numericPrice)){
  if(numericPrice >= 10 && numericPrice <= 60){
    score += 25
  }else{
    score += 10
  }
}

if(images.length >= 5) score += 25
else if(images.length >= 3) score += 15
else score += 5

if(title.length > 20 && title.length < 80) score += 20
else score += 10

const viralWords = ["portable","smart","mini","pro","electric","automatic"]

if(viralWords.some(word => title.toLowerCase().includes(word))){
  score += 15
}

if(score > 100) score = 100

let verdict = "Average Product"

if(score >= 75) verdict = "🔥 Winning Product"
else if(score >= 50) verdict = "⚡ Potential Product"
else verdict = "❌ Weak Product"

return { score, verdict }
}

export async function POST(req: Request) {

try{

const body = await req.json()

/* PRODUCT NAME */
let product: string =
(body.product && body.product !== "Product" && !body.product.toLowerCase().includes("aliexpress"))
? body.product
: (body.title && body.title.length > 5 ? body.title : "Product")

const niche: string = body.niche || "general"
let images: string[] = body.images || []
const price: string = body.price || "$29.99"
const storeName: string = body.storeName || "Sarphe Store"

/* CLEAN PRODUCT TITLE */
product = product.split(" ").slice(0,4).join(" ")

/* SLUG */
const slug = product
.toLowerCase()
.replace(/[^a-z0-9\s]/g, "")
.replace(/\s+/g, "-")

/* 🔥 IMAGE NORMALIZATION + HD FIX */
images = (images || [])
.filter((img: string) => img && img.trim() !== "")
.map((img: string) => {

let fixed = img.trim()

if (fixed.startsWith("//")) fixed = "https:" + fixed
if (fixed.startsWith("http://")) fixed = fixed.replace("http://","https://")
if (!fixed.startsWith("http")) fixed = "https://" + fixed

// 🔥 FORCE HD
fixed = fixed
.replace(/_\d+x\d+/g, "_1000x1000")
.replace(/\.jpg_.*/, ".jpg")
.replace(/\.png_.*/, ".png")
.replace(/\.webp_.*/, ".webp")

return fixed
})

/* REMOVE DUPLICATES */
images = [...new Set(images)]

/* 🔥 HARD FILTER */
const cleanImages = images.filter((img:string)=>
img &&
img.startsWith("http") &&
!img.includes("icon") &&
!img.includes("logo") &&
!img.includes("avatar") &&
!img.includes("svg") &&
!img.includes("sprite") &&
!img.includes("lazy") &&
!img.includes("placeholder") &&
!img.includes("thumbnail") &&
!img.includes("small") &&
!img.includes("banner") &&
!img.includes("ads") &&
!img.includes("strip") &&
!img.includes("background")
)

/* 🔥 SMART IMAGE SCORING */
function scoreImage(url:string){

let score = 0

if(url.includes("alicdn")) score += 50
if(url.includes("cdn.shopify")) score += 50
if(url.includes("ae01")) score += 40

if(url.match(/(\d{3,4}x\d{3,4})/)) score += 30
if(url.includes("800")) score += 25
if(url.includes("1000")) score += 30

if(url.includes("icon")) score -= 100
if(url.includes("logo")) score -= 100
if(url.includes("sprite")) score -= 100
if(url.includes("thumb")) score -= 60
if(url.includes("small")) score -= 60
if(url.includes("lazy")) score -= 40
if(url.includes("placeholder")) score -= 80

if(url.endsWith(".jpg") || url.endsWith(".jpeg")) score += 10
if(url.endsWith(".webp")) score += 8

return score
}

let rankedImages = cleanImages
.map(img => ({ url: img, score: scoreImage(img) }))
.sort((a,b)=> b.score - a.score)
.map(i => i.url)

/* 🔥 ADD: FORCE 4 PRODUCT GALLERY IMAGES */
let finalImages = rankedImages.filter(img =>
img &&
!img.includes("icon") &&
!img.includes("logo") &&
!img.includes("sprite") &&
!img.includes("gif") &&
!img.includes("loading") &&
!img.includes("placeholder") &&
!img.includes("data:image") &&
!img.includes("base64")
)

finalImages = finalImages.slice(0,4)

if(finalImages.length < 4){

const fallback = [
"https://images.unsplash.com/photo-1583511655826-05700442b31b",
"https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8",
"https://images.unsplash.com/photo-1583337130417-3346a1c8f6a6",
"https://images.unsplash.com/photo-1558788353-f76d92427f16"
]

finalImages = [...finalImages, ...fallback].slice(0,4)
}

/* 🔥 NEW FEATURE: SCORING */
const scoring = calculateScore(product, price, rankedImages)

/* 🔥 HERO IMAGE (SMART PICK) */
const image =
rankedImages.find(img => img.includes("1000")) ||
rankedImages[0] ||
rankedImages[1] ||
rankedImages[2] ||
"https://images.unsplash.com/photo-1601758064221-0c5f8bcb0d5d"

/* FINAL GALLERY */
images = finalImages

/* GLOBAL STYLE */
const baseStyle = `
<style>

body{
font-family:Inter,system-ui;
background:#020617;
color:#f8fafc;
margin:0;
}

section{
padding:90px 20px;
}

h1,h2,h3{
margin-bottom:16px;
}

.container{
max-width:1100px;
margin:auto;
}

button{
cursor:pointer;
}

.primary-btn{
background:linear-gradient(135deg,#2563eb,#38bdf8);
border:none;
color:white;
padding:16px 32px;
border-radius:10px;
font-weight:600;
font-size:16px;
margin-right:10px;
}

.secondary-btn{
background:linear-gradient(135deg,#38bdf8,#6366f1);
border:none;
color:white;
padding:16px 32px;
border-radius:10px;
font-weight:600;
font-size:16px;
box-shadow:0 8px 25px rgba(99,102,241,0.4);
transition:0.25s;
}

.secondary-btn:hover{
transform:scale(1.05);
box-shadow:0 10px 30px rgba(99,102,241,0.6);
}

/* 🔥 HERO LAYOUT */
.hero-inner{
display:grid;
grid-template-columns:1fr 1fr;
gap:60px;
align-items:center;
}

.hero-img{
display:flex;
justify-content:center;
align-items:center;
}

.hero-img img{
width:100%;
max-width:520px;
height:auto;
object-fit:contain;
border-radius:20px;
display:block;

image-rendering:auto;
filter: contrast(1.05) saturate(1.05);
}

.gallery-grid{
display:flex;
flex-wrap:wrap;
gap:20px;
justify-content:center;
}

.gallery-grid img{
width:260px;
height:260px;
object-fit:cover;
border-radius:14px;
transition:0.3s;
image-rendering:auto;
}

.gallery-grid img:hover{
transform:scale(1.05);
}

.review-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
gap:20px;
}

.benefit-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
gap:20px;
}

.feature-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
gap:20px;
}

.store-header{
background:#020617;
border-bottom:1px solid #1e293b;
padding:20px;
}

.header-inner{
display:flex;
justify-content:space-between;
align-items:center;
}

.logo{
font-weight:700;
font-size:20px;
}

.nav a{
margin-left:20px;
text-decoration:none;
color:#f8fafc;
}

</style>
`

/* HEADER */
const header = `
${baseStyle}
<header class="store-header">
<div class="container header-inner">
<div class="logo">${storeName}</div>
<nav class="nav">
<a href="#">Home</a>
<a href="#">Shop</a>
<a href="#">Contact</a>
<a href="#">Cart</a>
</nav>
</div>
</header>
`

/* HERO */
const hero = `
<section class="hero-${slug}">
<div class="container hero-inner">
<div class="hero-text">
<h1>${product}</h1>
<p class="price">${price}</p>

<div style="margin:10px 0;font-weight:600;color:#facc15">
🔥 Score: ${scoring.score}/100 — ${scoring.verdict}
</div>

<p>
Experience the comfort of our premium ${product}, crafted for modern ${niche} lovers.
</p>
<button class="primary-btn">Add To Cart</button>
<button class="secondary-btn">Buy Now</button>
</div>
<div class="hero-img">
<img src="${image}" loading="eager" onerror="this.src='https://via.placeholder.com/500'"/>
</div>
</div>
</section>
`

/* GALLERY */
const galleryImages =
(images && images.length > 0)
? images.map((img:string)=>
  `<img src="${img}" loading="lazy" onerror="this.src='https://via.placeholder.com/300'"/>`
).join("")
: `<img src="${image}" />`

const gallery = `
<section>
<div class="container">
<h2>Product Gallery</h2>
<div class="gallery-grid">
${galleryImages}
</div>
</div>
</section>
`

/* REST */
const socialProof = `
<section>
<div class="container" style="text-align:center;font-weight:600;font-size:18px">
⭐ 4.9 / 5 rating from 1,700+ customers
</div>
</section>
`

const benefits = `
<section>
<div class="container">
<h2>Why Choose Our ${product}</h2>
<div class="benefit-grid">
<div>Premium ${product} design</div>
<div>Built for maximum ${niche} performance</div>
<div>Trusted by thousands of customers</div>
<div>Designed for long lasting comfort</div>
</div>
</div>
</section>
`

const features = `
<section>
<div class="container">
<h2>Built To Last</h2>
<div class="feature-grid">
<div><h3>Comfort Design</h3><p>Engineered for better experience.</p></div>
<div><h3>Premium Materials</h3><p>High durability build.</p></div>
<div><h3>Modern Style</h3><p>Fits your setup perfectly.</p></div>
</div>
</div>
</section>
`

const reviews = `
<section>
<div class="container">
<h2>Customer Reviews</h2>
<div class="review-grid">
<div>★★★★★ Amazing quality</div>
<div>★★★★★ Worth every dollar</div>
<div>★★★★★ Highly recommended</div>
</div>
</div>
</section>
`

const faq = `
<section>
<div class="container">
<h2>FAQ</h2>
<p><strong>Shipping?</strong><br>5-7 days</p>
<p><strong>Refund?</strong><br>30-day guarantee</p>
</div>
</section>
`

const cta = `
<section>
<div class="container" style="text-align:center">
<h2>Upgrade Your ${niche} Experience Today</h2>
<button class="primary-btn">Add To Cart</button>
<button class="secondary-btn">Buy Now</button>
</div>
</section>
`

await supabase.from("stores").insert([
{
user_id:"demo-user",
product_name:product,
price:price,
store_html:JSON.stringify({
header,
hero,
gallery,
socialProof,
benefits,
features,
reviews,
faq,
cta
}),
score: scoring.score,
verdict: scoring.verdict
}
])

return Response.json({
header,
hero,
gallery,
socialProof,
benefits,
features,
reviews,
faq,
cta,
score: scoring.score,
verdict: scoring.verdict
})

}catch(err){

console.error("API ERROR:",err)

return Response.json({
error:"Server failed"
})

}

}
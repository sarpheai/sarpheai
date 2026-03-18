export async function POST(req: Request) {

const body = await req.json()

const product = body.product || "Product"
const niche = body.niche || "general"

/* SIMPLE BRAND GENERATOR */

const names = [
`${product}Hub`,
`${product}World`,
`${product}Nest`,
`${product}Store`,
`${product}Lab`,
`${product}Shop`
]

const taglines = [
`Premium ${product} for your ${niche} lifestyle`,
`Designed for modern ${niche} lovers`,
`Upgrade your ${niche} experience`,
`The future of ${product}`,
`Built for comfort and quality`
]

const storeName =
names[Math.floor(Math.random()*names.length)]

const tagline =
taglines[Math.floor(Math.random()*taglines.length)]

return Response.json({
storeName,
tagline
})

}
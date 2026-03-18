import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {

  try{

    const body = await req.json()

    const product = body.product || "Product"
    const niche = body.niche || "general"

    const description = `
Experience the power of the ${product}, engineered to elevate your ${niche} lifestyle.
Designed with premium materials and modern technology, this product delivers
exceptional performance, durability, and style.

Whether you're upgrading your setup or discovering something new,
the ${product} is built to provide reliability, comfort, and an
outstanding user experience every single day.
`

    /* SAVE TO SUPABASE */

    const { data, error } = await supabase
      .from("stores")
      .insert([
        {
          user_id: "demo-user",
          product_name: product,
          price: "$29.99",
          store_html: description
        }
      ])
      .select()

    if(error){
      console.error("SUPABASE INSERT ERROR:", error)
    } else {
      console.log("STORE SAVED:", data)
    }

    return Response.json({
      description
    })

  } catch(err){

    console.error("SERVER ERROR:", err)

    return Response.json({
      error: "Server failed"
    })

  }

}
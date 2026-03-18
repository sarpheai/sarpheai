import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { currentUser } from "@clerk/nextjs/server"

export default async function Dashboard() {

const { userId } = await auth()

if(!userId){
redirect("/login")
}

const user = await currentUser()

return (

<div style={{
padding:40,
background:"#0b0b0f",
color:"white",
minHeight:"100vh"
}}>

<h1 style={{fontSize:32,fontWeight:"bold"}}>
Welcome {user?.firstName || "Builder"}
</h1>

<p style={{marginTop:10,opacity:0.7}}>
Manage your AI generated stores
</p>

<h2 style={{marginTop:40}}>My Stores</h2>

<div style={{
marginTop:20,
display:"grid",
gap:15,
maxWidth:500
}}>

<div style={{
background:"#111118",
padding:20,
borderRadius:10
}}>
Pet Store
</div>

<div style={{
background:"#111118",
padding:20,
borderRadius:10
}}>
Fitness Store
</div>

<div style={{
background:"#111118",
padding:20,
borderRadius:10
}}>
Beauty Store
</div>

</div>

<Link href="/generator">

<button style={{
marginTop:40,
padding:"14px 30px",
borderRadius:10,
border:"none",
background:"#7c3aed",
color:"white",
cursor:"pointer"
}}>

Create New Store

</button>

</Link>

</div>

)

}
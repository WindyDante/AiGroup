import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to login page when accessing the root
  redirect("/login")
}


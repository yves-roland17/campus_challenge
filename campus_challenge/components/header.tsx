"use client"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import Link from "next/link";

export  default  function Navbar() {
 const { data: session } = useSession()
    const role=  session?.user?.role?.toUpperCase()

    

 

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <h1 className="text-2xl font-bold">
           Student Challenges
        </h1>

        <div className="flex gap-6">
       
          <Link href="/" className="hover:text-gray-200">
            Accueil
          </Link>
          {!session?.user && (
            <Link href="/auth/login" className="hover:text-gray-200">
              Connexion
            </Link>
          )}

           {session?.user && (
          <Link href="/creer_defis" className="hover:text-gray-200">
            Créer
          </Link>
           )}
          
            {session?.user && (
          <Link href="/profile" className="hover:text-gray-200">
            Profil
          </Link>
)}           
          {session?.user.role === "USER" && (
            <Link href="/admin" className="hover:text-gray-200">
              Dashboard
            </Link>
          )}
          {session?.user && (
            <button
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              className="hover:text-gray-200"
            >
              Déconnexion
            </button>
          )}
          {session?.user.role === "ADMIN" && (
            <Link href="/superadmin" className="hover:text-gray-200">
              Dashboard
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}
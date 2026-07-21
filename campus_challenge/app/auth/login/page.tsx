"use client"

import Link from "next/link";

import { signIn } from "next-auth/react";

export default function LoginPage() {

  const credentialsAction = (formData: FormData) => {
    const recForm=Object.fromEntries(formData)
    signIn("credentials",  { ...recForm , redirectTo: "/" });
  }
  return (
    <>
     
      <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4 text-gray-800">

        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center mb-2">
            Bon retour 👋
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Connectez-vous à votre compte.
          </p>

          <form action={credentialsAction} className="space-y-5">

            <div>
              <label className="font-medium">Email</label>

              <input
                type="email"
                placeholder="exemple@email.com"
                name="email"
                className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="font-medium">Mot de passe</label>

              <input
                type="password"
                name="password"
                placeholder="********"
                className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              Se connecter
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">
            Pas encore de compte ?

            <Link
              href="/auth/singup"
              className="text-blue-600 font-semibold ml-2"
            >
              S'inscrire
            </Link>

          </p>

        </div>

      </main>
    </>
  );
}
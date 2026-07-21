"use client"
import Link from "next/link";
import Navbar from "@/components/header";
import Footer from "@/components/footer";
import { creeParticipation, inscription } from "@/app/actions";
import { useActionState } from "react";
export default function RegisterPage() {
const initialState = {
  success: false,
  errors: {},
};

const [state, formulAction, pending] = useActionState(
  inscription,
  initialState
);

  return (

    <>


      <main className="min-h-screen flex items-center justify-center bg-slate-100 text-gray-700 px-4">

        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">

          <h1 className="text-3xl font-bold text-center mb-2">
            Créer un compte
             <p className="text-red-500 text-sm mt-1">
              {state.messaage}
              {state.messaageUser}
            </p>
          </h1>


          <p className="text-center text-gray-500 mb-8">
            Rejoignez Student Challenges.
           
          </p>

          <form action={formulAction} className="space-y-5">

            <div>
              <label className="font-medium">Nom complet</label>

              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-red-500 text-sm mt-1">
                {state.error?.name}
              </p>
            </div>

            <div>
              <label className="font-medium">Email</label>

              <input
                type="email"
                name="email"
                placeholder="exemple@email.com"
                className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-red-500 text-sm mt-1">
                {state.error?.email}
              </p>
            </div>

            <div>
              <label className="font-medium">Mot de passe</label>

              <input
                type="password"
                name="password"
                placeholder="********"
                className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-red-500 text-sm mt-1">
                {state.error?.password}
              </p>
            </div>


            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              Créer mon compte
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">
            Vous avez déjà un compte ?

            <Link
              href="/auth/login"
              className="text-blue-600 font-semibold ml-2"
            >
              Se connecter
            </Link>

          </p>

        </div>
       
      </main>
      <Footer/>
    </>
  );
}
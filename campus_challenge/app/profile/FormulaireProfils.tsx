"use client";
import Footer from "@/components/footer";
import { useActionState } from "react";
import { mise_ajour_profils } from "@/app/actions";



export function ProfileForm({ user }: { user: { name: string; email: string } }) {

    const initialState = { success: false, error: {} };
  const [state, formulAction, pending] = useActionState(mise_ajour_profils, initialState)

  return (
    <>


      <main className="min-h-screen text-gray-800 bg-slate-100 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
            {user.name}
          </h1>

          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-5xl">
              👨‍🎓
            </div>
          </div>

          <form action={formulAction} className="space-y-6">

            <div>
              <label className="block mb-2 font-semibold">
                Nom complet
              </label>

              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={user.name}
              />
              <p className="text-red-500 text-sm mt-1">{state.error?.name}</p>
            </div>
            <div>
              <label className="block mb-2 font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={user.email}
              />
              <p className="text-red-500 text-sm mt-1">{state.error?.email}</p>
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Mettre à jour mon profil
            </button>

          </form>

        </div>
      </main>

      <Footer />
    </>
  );
   

}
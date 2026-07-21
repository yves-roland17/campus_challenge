"use client"

import Footer from "@/components/footer";
import { creeEvent } from "../actions";
import { startTransition, useActionState } from "react";
export default function CreerDefis() {
  const initialState = {
  success: false,
  errors: {},
};
   const [state, formAction, pending] = useActionState(
    creeEvent,
    initialState
  );
  
  return (
    <>

      <main className="min-h-screen bg-slate-100 py-10 text-gray-800">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
           
          <h1 className="text-3xl font-bold text-center mb-8">
            🚀 Créer un défi
                 {state.success && (
                   <p className="text-green-500 text-sm">
                      {state.success}
                   </p>
                  )}
          </h1>

          <form action={formAction} className="space-y-6">

            <div>
              <label className="block font-semibold mb-2">
                Titre du défi
              </label>
            

              <input
                type="text"
                name="title"
                placeholder="Ex : Développer une Todo App"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
                 {state.error?.title && (
                   <p className="text-red-500 text-sm">
                      {state.error?.title[0]}
                   </p>
                  )}
            

            <div>
              <label className="block font-semibold mb-2">
                Date limite
              </label>

              <input
                type="date"
                name="date"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              {state.error?.date && (
                   <p className="text-red-500 text-sm">
                      {state.error?.date[0]}
                   </p>)}
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Description
              </label>

              <textarea
                rows="7"
                placeholder="Décrivez le défi..."
                name="description"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
              {state.error?.description && (
                   <p className="text-red-500 text-sm">
                      {state.error?.description[0]}
                   </p>)}
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Image (optionnel)
              </label>

              <input
                type="file"
                name="image"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Publier le défi
            </button>

          </form>

        </div>
      </main>

      <Footer />
    </>
  );
}
"use client";

import { useActionState } from "react";
import { creeParticipation } from "@/app/actions";

export default function FormParticipation({eventId}:{eventId: number}) {
  const initialState = {
    success: false,
    errors: {},
  };

  const [state, formAction, pending] = useActionState(
    creeParticipation,
    initialState
  );

  return (
  <>
        
  
        <main className="min-h-screen bg-slate-100 py-10 text-gray-800">
  
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
  
            <h1 className="text-3xl font-bold text-center mb-8">
              🚀 Participer au défi
              
            </h1>
  
                 <p className="text-red-500 text-sm">
                      {state.message}
                   </p>


            <form className="space-y-6" action={formAction}>
              <input type="hidden" name="eventId" value={eventId} />
              <div>
                <label className="font-semibold block mb-2">
                  Description
                </label>
  
                <textarea
                    name="description"
                  rows={8}
                  placeholder="Expliquez votre réalisation..."
                  className="w-full border rounded-lg p-3"
                ></textarea>
                {state.error?.description && (
                   <p className="text-red-500 text-sm">
                      {state.error?.description[0]}
                   </p>
                )}
              </div>
  
              <div>
                <label className="font-semibold block mb-2">
                  Lien GitHub
                </label>
  
                <input

                  type="url"
                  name="lien"
                  placeholder="https://github.com/..."
                  className="w-full border rounded-lg p-3"
                />
                {state.error?.lien && (
                   <p className="text-red-500 text-sm">
                      {state.error?.lien[0]}
                   </p>
                )}
              </div>
  
              <div>
                <label className="font-semibold block mb-2">
                  Lien de démonstration
                </label>
  
                <input
                  type="url"
                  name="demo"
                  placeholder="https://..."
                  className="w-full border rounded-lg p-3"
                />
                {state.error?.demo && (
                   <p className="text-red-500 text-sm">
                      {state.error?.demo[0]}
                   </p>
                )}
              </div>
  
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                Envoyer ma participation
              </button>
  
            </form>
  
          </div>
  
        </main>
  
      </>
    );
  
}
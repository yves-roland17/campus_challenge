"use client";

import { SupprimerEvent } from "@/app/actions";

export default function supp({ eventId }: { eventId: number }) {
  const Delete = () => {
    const confirmer = confirm("Supprimer ce défi ? Action irréversible.");
    if (!confirmer) return;
    SupprimerEvent(eventId);
  };

  return (
    <button
      className="text-red-500 border-b-2 border-red-500 bg-red-100 hover:bg-red-200 w-20 h-10 rounded"
      onClick={Delete}
    >
      Supprimer
    </button>
  );
}
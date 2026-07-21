
import Footer from "@/components/footer";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { ProfileForm } from "./FormulaireProfils";

export default async function ProfilePage() {
  const session = await auth();


  const user = await prisma.user.findUnique({
    where: { id: Number(session?.user.id) },
    select: { name: true, email: true },
  });

  if (!user) return <p>Utilisateur introuvable</p>;


  return (
    
    <main className=" min-h-screen text-gray-800 bg-slate-100 py-10">
      <ProfileForm user={user} />
    </main>

  )
}
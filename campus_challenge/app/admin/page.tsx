import Footer from "@/components/footer";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Supp  from "./buutonSupprimmer";
export default async function Dashboard() {
const  session = await auth()
let rec=0
const perso= await prisma.user.findUnique({
  where:{id:Number(session?.user.id),},
  include:{
     events :{
      select:{participation:true, title:true, id:true}
     },
     _count:{
      select:{events:true, participation:true}
     },
     participation:true,
  }
})
const par = perso?.events.map((par)=>{
  rec+=par.participation.length
  return rec
}
)
  return (
    <>
      <main className="min-h-screen bg-blue-200 text-gray-800 py-10">

        <div className="max-w-7xl mx-auto">
           <div className="flex justify-between items-center mb-10">
                  <h1 className="text-4xl font-bold mb-8">
                  Tableau de bord
                    </h1>
                    <h2 className="text-4xl font-bold mb-8">{perso?.name}</h2>
          </div>
          <div className="grid md:grid-cols-2 text-center gap-6">

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-gray-500">
                Défis créés
              </h2>

              <p className="text-5xl font-bold mt-4">
                {perso?._count.events}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              
              <h2 className="text-gray-500">
                Participations
              </h2>
              <p className="text-5xl font-bold mt-4">
                {rec}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg mt-10 p-8">
            <h2 className="text-center text-2xl font-bold mb-6">
              Mes défis
            </h2>
            <table className="w-full">

              <thead>
                <tr className="border-b ">

                  <th className="text-center py-3">Titre</th>

                  <th className="text-center">Participants</th>
                   <th className="text-center">actions</th>
                </tr>
              </thead>
              <tbody>
                 {perso?.events.map((defi)=>{
                  return(
                    <tr key={defi.id} className="border-b">

                      <td  className="py-4 text-center">
                        {defi.title}
                      </td>

                      <td className="text-center">
                        {defi.participation.length}
                      </td>
                      <td className="text-center mt-2 flex gap-4 justify-center">
                        <button className="text-blue-500 border-b-2 hover:bg-blue-200 border-blue-500 w-20 h-10 bg-blue-100 rounded">Modifier</button>
                        <Supp eventId={defi.id} />
                      </td>
                    </tr>
                  )
                 })}  
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
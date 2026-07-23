
import Footer from "@/components/footer";
import ChallengeCard from "@/components/defis";
import {prisma} from '@/lib/prisma'

export const dynamic = "force-dynamic";
 
export default async function Home() {
  const challenge= await prisma.event.findMany({
    include:{
      _count:{
       select:{ participation:true,  }
      },
      user:true
    },
    orderBy:{id:'desc'},
  })
  
  return (
    <>
     

      <main className="max-w-7xl mx-auto px-6 py-10 text-gray-800">

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            Défis étudiants
          </h1>

          <p className="text-gray-600 mt-2">
            Découvrez les défis publiés par les étudiants.
          </p>

        </div>

        <input
          type="text"
          placeholder="Rechercher un défi..."
          className="w-full mb-8 rounded-lg border p-3"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
         { challenge.map((defi)=>{
          return(
          <ChallengeCard  key={defi.id} title={defi.title} description={defi.description} date={defi.date}  user={defi.user} id={defi.id}/>
        )
         }) }

        </div>

      </main>

      <Footer />
    </>
  );
}
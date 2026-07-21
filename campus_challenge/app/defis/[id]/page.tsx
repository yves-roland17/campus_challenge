


import Footer from "@/components/footer";
import Link from "next/link";

import { prisma } from "@/lib/prisma"
 interface Props {
  params: Promise<{ id:string }>;
}

export default async function ChallengeDetails({ params }: Props) {

  const { id } = await params ;

  const detail= await prisma.event.findUnique({
    where:{id:Number(id)},
    include:{
      user:true,
      _count:{
        select:{participation:true}
      },
      participation:true
    }
  })


  const par = await prisma.participation.findMany({
    where:{eventId: Number(id)},
    include:{
      user:true
    }
  })
  
  return (
    <>
     

      <main className="min-h-screen bg-slate-100 py-10 text-gray-800">
        <div className="max-w-5xl mx-auto">

          <div className="bg-white rounded-2xl shadow-lg p-8">
           

            <h1 className="text-4xl font-bold mt-4">
              {detail?.title}
            </h1>

            <div className="flex gap-6 mt-4 text-gray-500">
              <p> Publié par {detail?.user?.name}</p>
              <p> Date limite: {detail?.date.toLocaleDateString()}</p>
              
            </div>

            <img
              src="https://picsum.photos/1200/500"
              className="w-full h-72 object-cover rounded-xl my-8"
              alt=""
            />

            <h2 className="text-2xl font-semibold mb-3">
              Description
            </h2>

            <p className="text-gray-700 leading-8">
              {detail?.description}
            </p>

            <Link
              href={`/participation/${detail?.id}`}
              className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
            >
              Participer
            </Link>
              
          </div>

          <div className="bg-white rounded-2xl shadow-lg mt-8 p-8">

            <h2 className="text-2xl font-bold mb-6">
              Participants ({detail?._count.participation})
            </h2>
             {par.map(rec=>{
              return(
                <h3>{rec.user.name}</h3>
              )
             })}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
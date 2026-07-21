import Link from "next/link";
import {prisma} from '@/lib/prisma'
 
type defi={
  title:string,
  description:string,
  date:Date,
  image:string,
  user:{
    name:string
  },
  id:number
}

export default async function ChallengeCard({title,description,date,image,user,id}:defi) {
 
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
   
     
      <h2 className="text-2xl font-bold mb-2">
        {title}
      </h2>
      
      <p className="text-gray-500 mb-4">
        Publié par {user.name}
      </p>

      <p className="text-gray-500">
        {description}
      </p>
     
      <Link
        href={`/defis/${id}`}
        className="inline-block mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
      >
        Voir le défi
      </Link>

      
    </div>
  );
}
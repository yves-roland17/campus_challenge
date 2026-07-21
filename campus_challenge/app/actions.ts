"use server"
import { auth } from "@/auth"
import { Role } from "@prisma/client" 
import { revalidatePath } from "next/cache"
import {prisma} from '@/lib/prisma'
import { eventSchema,participationSchema,loginSchema,registerSchema ,UpdateProfile } from "@/lib/validation"
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs"
 interface Props {
  params: Promise<{ id:string }>;
}

export async function creeEvent(prevState: any,data: FormData) {
 

  const rec = {
    title: data.get("title") as string,
    description: data.get("description") as string,
    date: new Date(data.get("date") as string),
    image: ''
  };
    const session = await auth();
    const comp = eventSchema.safeParse(rec);
    if (!comp.success) {
      return { error: comp.error.flatten().fieldErrors };
    }

  await prisma.event.create({
    data: {
      ...comp.data,
      userId: Number(session?.user.id),
    },
  });

 return { success: 'votre challenge a été créé',};
}


export async function MiseAjourEvent(data:FormData,idEvent:number){
    const rec={
        title:data.get("title") as string,
        description:data.get("description") as string,
        date:new Date(data.get("date") as string),
        image:data.get("image") as string
    }
    const comp= eventSchema.safeParse(rec);
    if(!comp.success){
        return{error:comp.error.flatten().fieldErrors};
        }

    await prisma.event.update({
        where:{id:idEvent},
        data:{
            ...comp.data
        } 
    })
    revalidatePath("/")
    revalidatePath("defis")
    return {success:true}
}   


export async function SupprimerEvent(idEvent:number){
   await prisma.$transaction([
        prisma.participation.deleteMany({ where: { eventId: idEvent } }),
        prisma.event.delete({ where: { id: idEvent } }),
    ])
    revalidatePath("/")
    revalidatePath("defis")
    return {success:true}
}


export async function creeParticipation(prevState: any,data:FormData){
    const rec= {
        description:data.get("description") as string,
        lien:data.get("lien") as string,
        demo:data.get("demo") as string
    }

    const eventId= data.get("eventId")  as string;
    const userId= await auth()
    
    const verification= await prisma.participation.findFirst({
        where:{
             userId: Number(userId?.user.id),
             eventId: Number(eventId)
        },
    })

    if(verification){
        return{message:"vous avez déja participé à cet évènement"}
    }

    const comp= participationSchema.safeParse(rec);
    if(!comp.success){
        return{error:comp.error.flatten().fieldErrors};
        }
    await prisma.participation.create({
        data:{
             ...comp.data,
                eventId:Number(eventId),
                userId:Number(userId?.user.id)
        }
    })

    return {success:true}
}


export async function MiseAjourParticipation(data:FormData,idParticipation:number){
    const rec={
        description:data.get("description") as string,
        lien:data.get("lien") as string,
        demo:data.get("demo") as string
    }
    const comp= participationSchema.safeParse(rec);
    if(!comp.success){
        return{error:comp.error.flatten().fieldErrors};
        }

    await prisma.participation.update({
        where:{id:idParticipation},
        data:{
            ...comp.data
        } 
    })
    return {success:true}
}


export async function inscription(prevState:any,data:FormData ){
const hash = await bcrypt.hash(data.get("password") as string, 10);
    const rec={
        name:data.get("name") as string,
        email:data.get("email") as string,
        password:hash,
    }
    const comp= registerSchema.safeParse(rec);
    if(!comp.success){
        return{error:comp.error.flatten().fieldErrors};
        }
      const existingUser = await prisma.user.findFirst({ where: { name: String(rec.name) } });
    if (existingUser) {
      return { messaageUser: "Ce nom d'utilisateur est déjà utilisé." };
    }


    const existingUserEmail = await prisma.user.findUnique({ where: { email: rec.email } });
    if (existingUserEmail) {
      return { messaage: "Cet e-mail est déjà utilisé." };
    }
    await prisma.user.create({
        data:{
              name: comp.data.name,
              email: comp.data.email,
              password: comp.data.password, 
            role: Role.USER
        }
    })
    redirect("/auth/login")
    return {success:true,
    }
}



export async function mise_ajour_profils(prevState:any,data:FormData){
    const session= await auth()
    const userId= session?.user.id
    const datas ={
        name:data.get("name") as string,
        email:data.get("email") as string
    }
    const comp= UpdateProfile.safeParse(datas);
    if(!comp.success){
        return{error:comp.error.flatten().fieldErrors};
        }


    await prisma.user.update({
        where:{id:Number(userId)},
        data:{
            ...comp.data
        }
    })

     revalidatePath("/admin")
    
    return {success:true}
}


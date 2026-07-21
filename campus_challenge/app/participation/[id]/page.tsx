

import Navbar from "@/components/header";
import Footer from "@/components/footer";
import FormParticipation from "./FormParticipation";
 interface Props {
  params: Promise<{ id:string }>;
}
export default async function Participate({params}: Props) {
const { id } = await params

  return (
    <>

    <FormParticipation eventId={Number(id)} />

      <Footer />
    </>
  );
}
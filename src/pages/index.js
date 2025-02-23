import { Button } from "@/components/ui/button";
import { endPoint } from "@/helper/axios";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast"

export default function App() {
  const router=useRouter();
  const logout = async () => {
    try {
       const url=endPoint.auth.logOut;
      await axios.get(url);
      toast.success("Logout successfully");
      router.push('/auth/signin')
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }
  return (
    <div className="h-screen bg-center p-10" style={{ backgroundImage: "url('bg.png')" }}>
      <nav className="flex justify-between md:w-5/6 w-full m-auto">
        <div className="font-bold text-2xl">Quizzes</div>
        <div onClick={logout}>
          <Button>
            Logout
          </Button>
        </div>
      </nav>
      <main className="flex justify-center md:w-5/6 w-full m-auto items-start gap-8 h-full flex-col">
        <h1 className="text-3xl">
          Let&apos;s start quiz
        </h1>
        <p className="md:w-2/5 w-full">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id cum eius, numquam hic sunt omnis porro minus voluptatem necessitatibus.</p>
        <Button size='lg' className='font-bold text-base'><Link href={'/quiz'}>Start</Link></Button>
      </main>
    </div>
  );
}

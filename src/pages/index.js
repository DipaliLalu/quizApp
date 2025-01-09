import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast"

export default function App() {
  const router=useRouter();
  const logout = async () => {
    try {
      await axios.get('api/users/logout');
      toast.success("Logout successfully");
      router.push('/auth/signin')
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }
  return (
    <div className="h-screen bg-center p-10" style={{ backgroundImage: "url('bg.png')" }}>
      <nav className="flex justify-between w-5/6 m-auto">
        <div className="font-bold text-2xl">Quizzes</div>
        <div onClick={logout}>
          <Button>
            Logout
          </Button>
        </div>
      </nav>
      <main className="flex justify-center w-5/6 m-auto items-start gap-8 h-full flex-col">
        <h1 className="text-3xl">
          Let&apos;s start quiz
        </h1>
        <p className="w-2/5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id cum eius, numquam hic sunt omnis porro minus voluptatem necessitatibus.</p>
        <Button size='lg' className='font-bold text-base'>Start</Button>
      </main>
    </div>
  );
}

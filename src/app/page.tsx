import { Content } from "@/components/shared/Content";
import { Header } from "@/components/shared/Header";


export default function Home() {
  return (
    <main className="flex items-center flex-col">
			<Header/>
			<Content/>
    </main>
  );
}

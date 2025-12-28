import { DesignTypes } from "@/components/config";
import AiFeatures from "@/components/home/ai-features";
import Banner from "@/components/home/banner";
import DesignLogo from "@/components/home/design-types";
import Header from "@/components/home/header";
import RecentDesign from "@/components/home/recent-design";
import HomeSideBar from "@/components/home/sidebar";



export default function Home(){
    return <div className="flex min-h-screen bg-white" >
      <HomeSideBar/>
      <div className="flex-1 flex flex-col ml-[72px]" >
        <Header/>
        <main className='flex-1 p-6 overflow-y-auto pt-20'>
          <Banner/>
          <DesignLogo/>
          <AiFeatures/>
          <RecentDesign/>
       </main>
      </div>
    </div>
}
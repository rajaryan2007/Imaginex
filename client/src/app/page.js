import Header from "@/components/home/header";
import RecentDesign from "@/components/home/recent-design";
import HomeSideBar from "@/components/home/sidebar";


export default function Home(){
    return <div className="flex min-h-screen bg-gray-50" >
      <HomeSideBar/>
      <div className="flex-1 flex flex-col ml-[72px]" >
        <Header/>
        <main className='flex-1 p-6 overflow-y-auto pt-20'>
          <RecentDesign/>
       </main>
      </div>
    </div>
}
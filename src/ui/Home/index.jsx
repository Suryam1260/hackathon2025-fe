import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import SidebarComponent from "../Sidebar/Sidebar"
import ScalerLogo from "@/assets/Scaler_NH7.png"
import HomeSection from "./HomeSection"
import RoadmapGenerationModal from "./RoadmapGenerationModal"
const Home = () => {
  return (
    <SidebarProvider>
      <SidebarComponent />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <img src={ScalerLogo} alt="logo" className="w-fit h-6" />
          </div>
        </header>
        <HomeSection />
      </SidebarInset>
      <RoadmapGenerationModal />
    </SidebarProvider>
  )
}

export default Home;
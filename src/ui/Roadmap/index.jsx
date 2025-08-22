import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSelectedRoadmap } from "@/store/slices/roadmapSlice";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import SidebarComponent from "../Sidebar/Sidebar"
import ScalerLogo from "@/assets/Scaler_NH7.png"
import Graph from "./Graph"
import RoadmapDescription from "./RoadmapDescription"

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useRoadmapChannel from "@/hooks/useRoadmapChannel";

const Roadmap = () => {
  const { id } = useParams();
  console.log('id', id);
  const dispatch = useDispatch();
  const selectedRoadmap = useSelector((state) => state.roadmap?.selectedRoadmap);

  // Subscribe on this page using the route id
  useRoadmapChannel(id);

  useEffect(() => {
    dispatch(getSelectedRoadmap(id));
  }, [id]);

  console.log('selectedRoadma inside Roadmap', selectedRoadmap);


  if (!selectedRoadmap?.title) {
    return <div>Generating...</div>;
  }

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
        <RoadmapDescription roadmap={selectedRoadmap} />
        <Graph roadmap={selectedRoadmap} />
      </SidebarInset>
    </SidebarProvider>
  )
};

export default Roadmap;

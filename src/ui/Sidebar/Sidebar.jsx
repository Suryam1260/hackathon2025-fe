import React, { useEffect } from 'react'

import { Calendar, Home as HomeIcon, Inbox, Search, Settings, Plus, FolderOpen, Database, Server } from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { useSelector } from "react-redux";


// Menu items matching your sidebar design
const items = [
  {
    title: "New Roadmap",
    url: "/#",
    icon: Plus,
  },
]

// const pastRoadmaps = [
//   {
//     title: "SQL",
//     url: "/roadmap",
//     icon: Database,
//   },
//   {
//     title: "DevOps", 
//     url: "/roadmap",
//     icon: Server,
//   },
// ]

const SidebarComponent = () => {
  const roadmap = useSelector((state) => state.roadmap?.allRoadmaps?.roadmaps);

  const pastRoadmaps = roadmap?.map((item) => ({
    id: item.id,
    title: item.title,
    url: `/roadmap/${item.id}`,
  })) || [];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Past Roadmaps</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pastRoadmaps.length > 0 && pastRoadmaps.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default SidebarComponent;
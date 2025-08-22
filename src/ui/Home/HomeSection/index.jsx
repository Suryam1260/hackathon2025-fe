import React, { useState } from 'react'

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { createRoadmap, setUserInput } from "@/store/slices/roadmapSlice"
import { useNavigate } from "react-router-dom"

import {
  BookOpen,
  Briefcase,
} from "lucide-react"

import FrequentData from "./FrequentData"
// import RoadmapGenerationModal from "../RoadmapGenerationModal"

const FREQUENT_DATA = [
  {
    id: 1,
    name: "Concept based",
    icon: <BookOpen className="h-5 w-5" />,
    cards: [
      {
        id: 1,
        title: "SQL",
        description: "HTML, CSS, Javascript ...",
        color: "bg-purple-100 border-purple-200 text-purple-800",
        link: '/roadmap/81'
      },
      {
        id: 2,
        title: "Computer Science",
        description: "Database, servers, APIs...",
        color: "bg-blue-100 border-blue-200 text-blue-800",
        link: '/roadmap/73'
      },
      {
        id: 3,
        title: "React",
        description: "Infrastructure, CI/CD ...",
        color: "bg-green-100 border-green-200 text-green-800",
      },
    ]
  },
  {
    id: 2,
    name: "Role based",
    icon: <Briefcase className="h-5 w-5" />,
    cards: [
      {
        id: 1,
        title: "Frontend",
        description: "HTML, CSS, Javascript ...",
        color: "bg-orange-100 border-orange-200 text-orange-800",
        link: '/roadmap/74'
      },
      {
        id: 2,
        title: "Backend",
        description: "Database, servers, APIs...",
        color: "bg-indigo-100 border-indigo-200 text-indigo-800",
        link: '/roadmap/76'
      },
      {
        id: 3,
        title: "DevOps",
        description: "Infrastructure, CI/CD ...",
        color: "bg-teal-100 border-teal-200 text-teal-800",
        link: '/roadmap/77'
      }
    ]
  }
]

const HomeSection = () => {

  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roadmapGeneration = useSelector((state) => state.roadmap.roadmapGeneration);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setUserInput(search));
    try {
      const response = await dispatch(createRoadmap(search)).unwrap();
      if (response?.roadmap_id) {
        navigate(`/roadmap/${response.roadmap_id}`);
      }
    } catch (err) {
      // Optional: surface an error toast here
      console.error("Failed to create roadmap", err);
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 pt-0 justify-center items-center w-full h-full">
      <div className="text-2xl font-bold">
        Create your roadmap
      </div>
      <div className="flex flex-col gap-2 w-1/2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Enter a topic or career path" 
            className="pl-10" 
            onChange={handleSearch} 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(e);
              }
            }}
            disabled={roadmapGeneration?.status === "generating"}
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 w-full max-w-4xl">
        {
          FREQUENT_DATA.map((item) => (
            <FrequentData key={item.id} data={item} />
          ))
        }
      </div>
      {/* <RoadmapGenerationModal /> */}
    </div>
  )
}

export default HomeSection;
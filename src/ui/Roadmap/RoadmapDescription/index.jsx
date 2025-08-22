import React from 'react'
import { Button } from "@/components/ui/button"
import { 
  Bookmark, 
  Download, 
  Share2, 
  Play 
} from "lucide-react"

import { useSelector } from "react-redux"

const RoadmapDescription = ({ roadmap }) => {
  const roadmapGeneration = useSelector((state) => state.roadmap.roadmapGeneration);


  return (
    <div className="flex flex-col gap-6 p-6 bg-white border-1 border-[#E3E3E3] rounded-lg mx-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {roadmap?.title}
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl">
            {roadmap?.description}
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-between gap-3 h-full">
          {/* Bookmark Button */}
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="p-2 h-10 w-10 rounded-lg border-gray-200 hover:bg-gray-50"
            >
              <Bookmark className="h-4 w-4" />
            </Button>

            {/* Download Button */}
            <Button 
              variant="outline" 
              size="sm"
              className="p-2 h-10 w-10 rounded-lg border-gray-200 hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
            </Button>

            {/* Share Button */}
            <Button 
              variant="outline" 
              size="sm"
              className="p-2 h-10 w-10 rounded-lg border-gray-200 hover:bg-gray-50"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Start Roadmap Button */}
          {/* <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            Start Roadmap
          </Button> */}
          {
            roadmapGeneration?.status === "generating" ? (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                    </div>
                    <div className="text-yellow-600">Generating Roadmap...</div>
                  </div>
                  <div className="text-gray-600">Expected Time: Around 2-5 minutes</div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 text-green-600">
                Roadmap Generation Completed
              </div> 
            )
          }
        </div>
      </div>
    </div>
  )
}

export default RoadmapDescription;
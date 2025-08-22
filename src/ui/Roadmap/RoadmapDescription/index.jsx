import React from 'react'
import { Button } from "@/components/ui/button"
import { 
  Bookmark, 
  Download, 
  Share2, 
  Play 
} from "lucide-react"

const RoadmapDescription = ({ roadmap }) => {
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
        
        <div className="flex items-center gap-3">
          {/* Bookmark Button */}
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
          
          {/* Start Roadmap Button */}
          {/* <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            Start Roadmap
          </Button> */}
        </div>
      </div>
    </div>
  )
}

export default RoadmapDescription;
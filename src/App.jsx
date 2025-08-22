import React, { useEffect } from 'react'
// import Counter from './components/Counter'
import Home from './ui/Home'
import Roadmap from './ui/Roadmap'
import Notes from './ui/Notes'
import Quizzes from './ui/Quizzes'
import Assignments from './ui/Assignments'

import {Routes, Route} from 'react-router-dom'
import { getRoadmapData } from "@/store/slices/roadmapSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoadmapData());
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roadmap/:id" element={<Roadmap />} />
        <Route path="/roadmap/:id/notes" element={<Notes />} />
        <Route path="/roadmap/:id/quizzes" element={<Quizzes />} />
        <Route path="/roadmap/:id/assignments" element={<Assignments />} />
      </Routes>
    </div>
  )
}

export default App;

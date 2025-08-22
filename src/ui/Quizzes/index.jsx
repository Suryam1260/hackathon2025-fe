import React, { useEffect, useState } from 'react'

import {
  useSelector,
} from 'react-redux'

const Quizzes = () => {

  const selectedNode = useSelector((state) => state.roadmap?.selectedNode);

  console.log('selectedNode', selectedNode);

  const [responses, setResponses] = useState({});
  const quizzes = selectedNode?.data?.quizzes ?? [];

  useEffect(() => {
    // Reset responses whenever the selected node changes
    setResponses({});
  }, [selectedNode?.id]);

  const handleSelectOption = (quizId, option) => {
    setResponses((prev) => ({ ...prev, [quizId]: option }));
  };

  const answeredCount = Object.keys(responses).length;
  
  return (
    <div className="flex flex-col gap-4 p-4 pt-0 justify-center items-center w-full h-full">
      <h1 className="text-2xl font-bold">Quizzes</h1>
      <div className="text-sm text-gray-600">{answeredCount} of {quizzes.length} answered</div>
      {quizzes.length === 0 ? (
        <div className="text-gray-500">No quizzes available for this node.</div>
      ) : (
        <div className="flex flex-col gap-4 w-full max-w-3xl">
          {quizzes.map((quiz, idx) => (
            <div key={quiz.id} className="border border-gray-200 rounded-md p-4">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-semibold">
                  {idx + 1}. {quiz.question}
                </h2>
                <div className="text-xs text-gray-500 whitespace-nowrap">
                  {quiz.points ? `${quiz.points} pts` : null}
                </div>
              </div>
              <div className="mt-3 flex flex-col gap-2">
                {(quiz.options ?? []).map((option) => {
                  const isSelected = responses[quiz.id] === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelectOption(quiz.id, option)}
                      className={`text-left rounded-md border p-2 transition-colors ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                          }`}
                        >
                          {isSelected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
                        </span>
                        <span className="text-sm">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              {responses[quiz.id] ? (
                <div className="mt-2 text-xs text-gray-600">
                  Selected: <span className="font-medium">{responses[quiz.id]}</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Quizzes;
import React, { useEffect, useState } from 'react'

import {
  useSelector,
} from 'react-redux'

const Quizzes = () => {

  const selectedNode = useSelector((state) => state.roadmap?.selectedNode);

  console.log('selectedNode', selectedNode);

  const [responses, setResponses] = useState({});
  const quizzes = selectedNode?.data?.quizzes ?? [];
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState({}); // { [quizId]: boolean }
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Reset responses whenever the selected node changes
    setResponses({});
    setSubmitted(false);
    setResults({});
    setScore(0);
  }, [selectedNode?.id]);

  const handleSelectOption = (quizId, option) => {
    if (submitted) return; // lock selections after submit
    setResponses((prev) => ({ ...prev, [quizId]: option }));
  };

  const handleSubmit = () => {
    const totalQuestions = quizzes.length;
    const answered = Object.keys(responses).length;
    if (totalQuestions > 0 && answered !== totalQuestions) {
      alert('Please answer all questions before submitting.');
      return;
    }

    let earnedPoints = 0;
    const evaluation = {};

    quizzes.forEach((quiz) => {
      const isCorrect = responses[quiz.id] === quiz.correct_answer;
      evaluation[quiz.id] = isCorrect;
      const points = quiz?.points ?? 1;
      if (isCorrect) earnedPoints += points;
    });

    setResults(evaluation);
    setScore(earnedPoints);
    setSubmitted(true);
  };

  const handleReset = () => {
    if (!submitted) return;
    setResponses({});
    setSubmitted(false);
    setResults({});
    setScore(0);
  };

//   {
//     "label": "Introduction to API Security",
//     "status": "ready",
//     "difficulty_level": "beginner",
//     "video_url": null,
//     "lectures": "# Introduction to API Security\n\nIn the world of web development, APIs (Application Programming Interfaces) have become the backbone of many services. They allow different software applications to communicate with each other. However, with the convenience also comes the risk of security threats. Hence, learning about API security becomes crucial. In this lecture, we will discuss the need for API security and some common types of API threats.\n\n## Why API Security is Important\n\n1. **Data Breach**: APIs can be a point of vulnerability. If not properly secured, they can be exploited to gain unauthorized access to sensitive data.\n\n2. **Business Continuity**: APIs being the backbone of services, any disruption can affect the functioning of the entire service.\n\n3. **Compliance Requirements**: Certain regulations require businesses to ensure data safety and privacy.\n\n## Common API Threats\n\n1. **Injection Attacks**: These occur when untrusted data is sent as part of a command or query.\n\n2. **Broken Authentication**: If the API fails to verify the user's identity, it could allow unauthorized access.\n\n3. **Sensitive Data Exposure**: APIs may accidentally reveal sensitive data like credit card details, passwords etc.\n\n4. **XML External Entity (XXE) Attacks**: These involve exploiting XML processors by uploading malicious XML.\n",
//     "quizzes": [
//         {
//             "id": 1240,
//             "lecture_id": 848,
//             "question": "What is an Injection Attack?",
//             "options": [
//                 "It is a type of attack where the API is overloaded with requests",
//                 "It is a type of attack where untrusted data is sent as part of a command or query",
//                 "It is a type of attack where the API accidentally reveals sensitive data",
//                 "It is a type of attack where the API fails to verify the user's identity"
//             ],
//             "correct_answer": "It is a type of attack where untrusted data is sent as part of a command or query",
//             "explanation": "Injection attacks occur when untrusted data is sent as part of a command or query, tricking the interpreter into executing unintended commands.",
//             "difficulty": 1,
//             "discarded_at": null,
//             "question_type": "multiple_choice",
//             "points": 10,
//             "metadata": {
//                 "points": 10,
//                 "difficulty": 1,
//                 "explanation": "Injection attacks occur when untrusted data is sent as part of a command or query, tricking the interpreter into executing unintended commands.",
//                 "ai_generated": true,
//                 "generated_at": "2025-08-22T05:30:19Z",
//                 "question_type": "multiple_choice"
//             },
//             "created_at": "2025-08-22T05:30:19.292Z",
//             "updated_at": "2025-08-22T05:30:19.302Z"
//         }
//     ],
//     "problems": [],
//     "isLeaf": true,
//     "isModule": false,
//     "isHeader": false
// }

  const answeredCount = Object.keys(responses).length;
  const maxScore = quizzes.reduce((sum, q) => sum + (q?.points ?? 1), 0);
  const allAnswered = quizzes.length > 0 && answeredCount === quizzes.length;
  
  return (
    <div className="flex flex-col gap-4 p-4 pt-0 justify-center items-center w-full h-full">
      <h1 className="text-2xl font-bold">Quizzes</h1>
      <div className="text-sm text-gray-600">{answeredCount} of {quizzes.length} answered</div>
      {submitted ? (
        <div className="text-sm font-medium">Score: {score} / {maxScore}</div>
      ) : null}
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
                  const optionClass = isSelected
                    ? (submitted
                        ? (results[quiz.id] ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                        : 'border-blue-500 bg-blue-50')
                    : 'border-gray-200 hover:bg-gray-50';
                  const circleClass = isSelected
                    ? (submitted
                        ? (results[quiz.id] ? 'border-green-500 bg-green-500' : 'border-red-500 bg-red-500')
                        : 'border-blue-500 bg-blue-500')
                    : 'border-gray-300';
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelectOption(quiz.id, option)}
                      className={`text-left rounded-md border p-2 transition-colors ${optionClass} ${submitted ? 'cursor-not-allowed' : ''}`}
                      disabled={submitted}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-4 w-4 rounded-full border flex items-center justify-center ${circleClass}`}
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
      <div className="flex items-center gap-2">
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-md ${allAnswered && !submitted ? 'hover:bg-blue-600' : 'opacity-50 cursor-not-allowed'}`}
          onClick={handleSubmit}
          disabled={!allAnswered || submitted}
        >
          Submit
        </button>
        <button
          className={`bg-gray-200 text-gray-800 px-4 py-2 rounded-md ${submitted ? 'hover:bg-gray-300' : 'opacity-50 cursor-not-allowed'}`}
          onClick={handleReset}
          disabled={!submitted}
        >
          Reset Test
        </button>
      </div>
    </div>
  )
}

export default Quizzes;
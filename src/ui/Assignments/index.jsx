import React from 'react'

import {
  useSelector,
} from 'react-redux'

const Assignments = () => {
  const selectedNode = useSelector((state) => state.roadmap?.selectedNode);

  const problems = Array.isArray(selectedNode?.data?.problems) ? selectedNode.data.problems : [];

  const getDifficulty = (problem) => {
    const raw = problem?.difficulty ?? problem?.metadata?.difficulty;
    if (typeof raw === 'number') return raw;
    if (typeof raw === 'string') {
      const lower = raw.toLowerCase();
      if (lower.includes('easy')) return 1;
      if (lower.includes('medium')) return 2;
      if (lower.includes('hard')) return 3;
      const num = parseInt(raw, 10);
      return Number.isNaN(num) ? 0 : num;
    }
    return 0;
  };

  const difficultyInfo = (problem) => {
    const d = getDifficulty(problem);
    if (d <= 1) return { label: 'Easy', classes: 'bg-green-50 text-green-700 ring-green-600/20' };
    if (d === 2) return { label: 'Medium', classes: 'bg-amber-50 text-amber-700 ring-amber-600/20' };
    if (d >= 3) return { label: 'Hard', classes: 'bg-rose-50 text-rose-700 ring-rose-600/20' };
    return { label: 'Unknown', classes: 'bg-gray-50 text-gray-700 ring-gray-600/20' };
  };

  const toArrayTags = (problem) => {
    if (Array.isArray(problem?.metadata?.tags)) return problem.metadata.tags;
    if (typeof problem?.tags === 'string') {
      return problem.tags.split(',').map((t) => t.trim()).filter(Boolean);
    }
    return [];
  };

  const estimatedMinutes = (problem) => problem?.estimated_time_minutes ?? problem?.metadata?.estimated_time_minutes;

  return (
    <div className="flex flex-col gap-6 p-4 pt-0 items-center w-full h-full">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold">Assignments</h1>

        {problems.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed border-gray-300 p-10 text-center">
            <p className="text-gray-600">No assignments for this node yet.</p>
            <p className="text-gray-500 text-sm mt-2">Select a different node or generate problems.</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4">
            {problems.map((problem) => {
              const diff = difficultyInfo(problem);
              const tags = toArrayTags(problem);
              const platform = problem?.platform ?? problem?.metadata?.platform;
              const description = problem?.description ?? problem?.metadata?.description;
              const createdAt = problem?.created_at ?? problem?.createdAt;
              const eta = estimatedMinutes(problem);

              return (
                <div key={problem?.id ?? problem?.problem_url} className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold">{problem?.problem_statement_title ?? 'Untitled Problem'}</h2>
                        {problem?.problem_url && (
                          <a href={problem.problem_url} className="text-sm text-blue-600 hover:underline break-all" target="_blank" rel="noopener noreferrer">
                            {problem.problem_url}
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {platform && (
                          <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset bg-gray-50 text-gray-700 ring-gray-600/20">
                            {platform}
                          </span>
                        )}
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${diff.classes}`}>
                          {diff.label}
                        </span>
                      </div>
                    </div>

                    {description && (
                      <p className="mt-3 text-sm text-gray-600">{description}</p>
                    )}

                    {tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {tags.map((t) => (
                          <span key={t} className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        {eta ? <span>ETA: {eta} min</span> : null}
                        {createdAt ? <span>Added: {new Date(createdAt).toLocaleDateString()}</span> : null}
                      </div>
                      {problem?.problem_url && (
                        <a href={problem.problem_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
                          Open Problem
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Assignments;
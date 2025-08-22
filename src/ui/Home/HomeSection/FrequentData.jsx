import React from 'react'

const FrequentData = ({
  data,
}) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div key={data.id} className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gray-100">
            {data.icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{data.name}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {data.cards.map((card) => (
            <div 
              key={card.id} 
              className={`
                flex flex-col gap-3 p-4 rounded-xl border-2 cursor-pointer
                transition-all duration-200 hover:shadow-md hover:scale-105
                ${card.color}
              `}
            >
              <h4 className="text-base font-semibold">{card.title}</h4>
              <p className="text-sm opacity-80">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FrequentData
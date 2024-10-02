import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather';
type CarouselProps = {
    children: React.ReactNode; // Update the type to React.ReactNode
  };

  const Carousel: React.FC<CarouselProps> = ({ children }) => {
    
  const [curr,setCurr] = useState(0)
  const prev = () => {
    setCurr((curr) => (curr === 0 ? React.Children.count(children) - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === React.Children.count(children) - 1 ? 0 : curr + 1));
  };
  
  return (
    <div className="overflow-hidden relative">
    <div
      className="flex transition-transform ease-out duration-500"
      style={{ transform: `translateX(-${curr * 100}%)` }}
    >
      {React.Children.map(children, (child) => (
        <div className="w-full flex-shrink-0">{child}</div>
      ))}
    </div>
    <div className="absolute inset-0 flex items-center justify-between p-4">
      <button
        onClick={prev}
        className="p-1 rounded-full shadow  opacity-80 text-gray-800 hover:bg-white/50"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="p-1 rounded-full shadow  opacity-80 text-gray-800 hover:bg-white/50"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  </div>
  )
}

export default Carousel

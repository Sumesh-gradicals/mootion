'use client';
import { useState } from "react";
import { useCategories } from "../context/CategoriesContext";
import { useFloatingButton } from "../context/FloatingButtonContext";

const FloatingButton = () => {
  const { categories } = useCategories();
  const { state, toggleExpand, selectCategory } = useFloatingButton();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftClick = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      selectCategory(categories[newIndex]);
    }
  };

  const handleRightClick = () => {
    if (currentIndex < categories.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      selectCategory(categories[newIndex]);
    }
  };

  const handleCategoryClick = (index) => {
    setCurrentIndex(index);
    selectCategory(categories[index]);
  };

  return (
    <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 rounded-full md:rounded-2xl text-white bg-[#383338] shadow-xl">
      
      <div
  className={`transition-transform duration-150 ${
    state.isExpanded ? "translate-y-0 opacity-100 w-[425px] h-[380px] py-6 px-4" : "translate-y-10 opacity-0"
  }`}
>
  {state.isExpanded && (
    <div className="py-6 px-4">
      <h2 className="text-7xl font-bold mb-2 uppercase text-center italic">Mootion</h2>
      <div className="text-xs text-stone-400 font-thin">
        <p>
          is a WIP internal tool developed by GRADICAL to bridge the gap between good and great
          design.
        </p>
        <p className="mt-4">
          This is a repository of cool digital animations that will help designers and developers
          produce high-quality work.
        </p>
        <p className="mt-4">
          If you&apos;re part of the team, welcome to take a look around. If you&apos;re a lost
          traveler, take what you need, check us out, and put in a good word.
        </p>
        <p className="mt-4">Romal.</p>
      </div>
    </div>
  )}
</div>

      <div className="px-2 py-2 rounded-full md:rounded-2xl text-white bg-[#383338] shadow-xl">
        <div className="flex h-[60px] w-[410px] items-center justify-around">
          <button
            className={`px-2 ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            } transition-transform transform active:scale-90`}
            onClick={handleLeftClick}
            disabled={currentIndex === 0}
          >
            <img
              src="/right_arrow.svg"
              alt="Left Arrow"
              className="w-6 rotate-180"
              style={{ width: "10px", height: "24px" }}
            />
          </button>

          {/* Category Buttons */}
          {categories.map((category, index) => (
            <p
              key={index}
              className={`cursor-pointer  transition-all duration-150 hover:text-yellow-300 ${
                state.selectedCategory === category
                  ? "text-yellow-400 text-2xl font-bold italic"
                  : "text-xs font-thin text-slate-200"
              }`}
              onClick={() => handleCategoryClick(index)}
            >
              {category}
            </p>
          ))}

          <button
            className={`${
              currentIndex === categories.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            } transition-transform transform active:scale-90`}
            onClick={handleRightClick}
            disabled={currentIndex === categories.length - 1}
          >
            <img
              src="/right_arrow.svg"
              alt="Right Arrow"
              className="w-6"
              style={{ width: "10px", height: "24px" }}
            />
          </button>

          {/* Divider */}
          <div className="px-[0.5px] py-4 border-white bg-white hidden md:block"></div>

          {/* Toggle Expand Button */}
          <div className="head cursor-pointer hidden md:block" onClick={toggleExpand}>
            <div>
              <div className="eye"></div>
              <div className="eye"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingButton;

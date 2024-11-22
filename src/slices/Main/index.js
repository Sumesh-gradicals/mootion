'use client';

/**
 * @typedef {import("@prismicio/client").Content.MainSlice} MainSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MainSlice>} MainProps
 * @param {MainProps}
 */
import { useState } from 'react';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicLink } from '@prismicio/react';

const Main = ({ slice }) => {
  const [state, setState] = useState({
    isModalOpen: false,
    selectedCard: null,
    selectedCategory: '',
    isExpanded: false,
  });

  const split = (card) => {
    if (!card) return [];
    const tutorials = [];
    if (card.aftereffects_llink?.url) tutorials.push({ name: 'After Effects', link: card.aftereffects_llink });
    if (card.gsap_link?.url) tutorials.push({ name: 'GSAP', link: card.gsap_link });
    if (card.framermotoin_link?.url) tutorials.push({ name: 'Framer Motion', link: card.framermotoin_link });

    return tutorials;
  };

  const categories = [...new Set(slice.primary.card.map((card) => card.category.toUpperCase()))];

  const filteredCards = state.selectedCategory
    ? slice.primary.card.filter((card) => card.category.toUpperCase() === state.selectedCategory.toUpperCase())
    : slice.primary.card;

  const openModal = (card, event) => {
    event.stopPropagation();
    setState((prevState) => ({
      ...prevState,
      isModalOpen: true,
      selectedCard: card,
    }));
  };

  const closeModal = () => {
    setState((prevState) => ({
      ...prevState,
      isModalOpen: false,
      selectedCard: null,
    }));
  };

  const toggleExpand = () => {
    setState((prevState) => ({
      ...prevState,
      isExpanded: !prevState.isExpanded,
    }));
  };

  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div className="md:px-[100px]">
        <ul className="flex flex-wrap justify-center">
          {filteredCards.map((card, index) => (
            <li
              className="px-2 py-3 cursor-pointer"
              key={index}
              onClick={(e) => openModal(card, e)}
            >
              <PrismicNextImage field={card.image} className="w-[400px] h-[300px] rounded-md" />
              <div className="flex items-center justify-between px-3 -mt-9 cursor-pointer">
                <span className="bg-gray-400 text-stone-800 px-2 rounded-full font-medium">
                  {card.name}
                </span>
                <p className="uppercase text-[10px] bg-fuchsia-800 text-fuchsia-500 px-1 rounded-sm">
                  {card.category}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2">
        {state.isExpanded && (
          <div className="bg-[#262526] text-white p-4 rounded-xl shadow-lg -mb-8 mx-auto w-[425px] h-[380px]">
            <div className="py-6 px-4">
              <h2 className="text-7xl font-bold mb-2 uppercase text-center italic">Mootion</h2>
              <div className="text-xs text-stone-400 font-thin">
                <p>
                  is a WIP internal tool developed by GRADICAL to bridge the gap between good and
                  great design.
                </p>
                <p className="mt-4">
                  This is a repository of cool digital animations that will help designers and
                  developers produce high-quality work.
                </p>
                <p className="mt-4">
                  If you&apos;re part of the team, welcome to take a look around. If you’re a lost
                  traveler, take what you need, check us out, and put in a good word.
                </p>
                <p className="mt-4">Romal.</p>
              </div>
            </div>
          </div>
        )}
{/* Floating Button */}
        <div className="px-2 py-2 rounded-2xl text-white bg-[#383338] shadow-xl">
          <div className="flex h-[60px] w-[410px] items-center justify-around">
            {categories.map((category, index) => (
              <p
                key={index}
                className={`cursor-pointer ${
                  state.selectedCategory === category
                    ? 'text-white text-2xl font-bold italic'
                    : 'text-xs font-thin text-slate-200'
                }`}
                onClick={() => setState((prev) => ({ ...prev, selectedCategory: category }))}
              >
                {category}
              </p>
            ))}
            <div className="px-[0.5px] py-4 border-white bg-white"></div>
            <div className="head cursor-pointer" onClick={toggleExpand}>
              <div>
                <div className="eye"></div>
                <div className="eye"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
{/* Modal */}
      {state.isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-4 w-[700px] h-[575px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold text-stone-800">
                  {state.selectedCard.name}
                </h2>
                <PrismicLink field={state.selectedCard.view_live} className="text-xs font-semibold">
                  View Live
                </PrismicLink>
              </div>
              <p className="py-4 text-xs font-thin text-slate-500">
                {state.selectedCard.submitted_by}&apos;s Submission
              </p>
              <PrismicNextImage
                field={state.selectedCard.image}
                className="w-[645px] h-[370px] rounded-md"
              />
            <div className="py-6 text-sm font-thin text-stone-800">
  {split(state.selectedCard)?.length > 0 ? (
    <p>
      Tutorials are available for{' '}
      {split(state.selectedCard)
        .map((tutorial, index, array) => (
          <span key={index}>
            <PrismicLink
              field={tutorial.link}
              className="text-blue-600 hover:underline"
            >
              {tutorial.name}
            </PrismicLink>
            {index < array.length - 1 && (index === array.length - 2 ? ' & ' : ', ')}
          </span>
        ))}
    </p>
  ) : (
    <p>No tutorials available.</p>
  )}
</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Main;

'use client';

import { useCategories } from "../../app/context/CategoriesContext";
import { useFloatingButton } from "../../app/context/FloatingButtonContext";
import { useEffect, useState } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink } from "@prismicio/react";

const Main = ({ slice }) => {
  const { setCategories } = useCategories();
  const { state } = useFloatingButton();
  const [modalState, setModalState] = useState({
    isModalOpen: false,
    selectedCard: null,
  });

 
  const split = (card) => {
    if (!card) return [];
    const tutorials = [];
    if (card.aftereffects_llink?.url) tutorials.push({ name: 'After Effects', link: card.aftereffects_llink });
    if (card.gsap_link?.url) tutorials.push({ name: 'GSAP', link: card.gsap_link });
    if (card.framermotoin_link?.url) tutorials.push({ name: 'Framer Motion', link: card.framermotoin_link });
    return tutorials;
  };


  useEffect(() => {
    if (!slice?.primary?.card) return;
    const uniqueCategories = [
      ...new Set(slice.primary.card.map((card) => card.category.toUpperCase())),
    ];
  
    
    setCategories(uniqueCategories);
  }, [slice, setCategories]);


  const filteredCards = state.selectedCategory
    ? slice.primary.card.filter(
        (card) =>
          card.category.toUpperCase() === state.selectedCategory.toUpperCase()
      )
    : slice.primary.card;

  // Open modal
  const openModal = (card, event) => {
    event.stopPropagation();
    setModalState({
      isModalOpen: true,
      selectedCard: card,
    });
  };

  // Close modal
  const closeModal = () => {
    setModalState({
      isModalOpen: false,
      selectedCard: null,
    });
  };

  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div className="md:px-[100px]">
        {/* Card List */}
        <ul className="flex flex-wrap justify-center">
          {filteredCards.map((card, index) => (
            <li
            className="px-2 py-3 cursor-pointer"
            key={index}
            onClick={(e) => {
              if (modalState.isModalOpen && modalState.selectedCard === card) {
           
                closeModal();
              } else {
               
                openModal(card, e);
              }
            }}
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
              {/* for small screens */}
              {modalState.isModalOpen && modalState.selectedCard === card && (
                <div className="mt-4  rounded-lg md:hidden">

                  <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">{modalState.selectedCard?.name}</h2>
                  <PrismicLink
                    field={modalState.selectedCard?.view_live}
                    className="text-black underline text-sm"
                  >
                    View Live
                  </PrismicLink>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {modalState.selectedCard?.submitted_by}&apos;s Submission
                  </p>
                  <div className="text-sm text-gray-700 mt-2">
                    {split(modalState.selectedCard)?.length > 0 ? (
                      <p>
                        Tutorials are available for{" "}
                        {split(modalState.selectedCard).map((tutorial, index, array) => (
                          <span key={index}>
                            <PrismicLink
                              field={tutorial.link}
                              className="text-slate-800 underline"
                            >
                              {tutorial.name}
                            </PrismicLink>
                            {index < array.length - 1 && (index === array.length - 2 ? " & " : ", ")}
                          </span>
                        ))}
                      </p>
                    ) : (
                      <p>No tutorials available.</p>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>


      </div>

      {/* Modal */}
      {modalState.isModalOpen && (
        <div
          className="fixed inset-0  items-center justify-center bg-black bg-opacity-50 hidden md:flex"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-4 w-[700px] h-[575px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold text-stone-800">
                  {modalState.selectedCard?.name}
                </h2>
                <PrismicLink field={modalState.selectedCard?.view_live} className="text-xs font-semibold">
                  View Live
                </PrismicLink>
              </div>
              <p className="py-4 text-xs font-thin text-slate-500">
                {modalState.selectedCard?.submitted_by}&apos;s Submission
              </p>
              <PrismicNextImage
                field={modalState.selectedCard?.image}
                className="w-[645px] h-[370px] rounded-md"
              />
              <div className="py-6 text-sm font-thin text-stone-800">
                {split(modalState.selectedCard)?.length > 0 ? (
                  <p>
                    Tutorials are available for{' '}
                    {split(modalState.selectedCard).map((tutorial, index, array) => (
                      <span key={index}>
                        <PrismicLink
                          field={tutorial.link}
                          className="text-stone-500 underline"
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

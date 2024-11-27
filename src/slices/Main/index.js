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

    const word = card.submitted_by;
    let letter = word.charAt(0);
    const newData = {...card ,firstLetter:letter}

    
    event.stopPropagation();
    if (newData) {setModalState({
      isModalOpen: true,
      selectedCard: newData,
      
    });}
    return null;
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
        <ul className="flex flex-wrap justify-center pb-48 md:pb-0 ">
          {filteredCards.map((card, index) => (
            <li
            className="px-2 py-8 md:py-4 cursor-pointer transition-all duration-300 transform md:hover:scale-95 hover:opacity-70"
            key={index}
            onClick={(e) => {
              if (modalState.isModalOpen ) {
           
                closeModal();
              } else {
               
                openModal(card, e);
              }
            }}
          >
              <PrismicNextImage field={card.image} className="w-[400px] h-[300px] rounded-md" />
              <div className="flex items-center justify-between px-3 -mt-9 cursor-pointer">
                <span className="bg-gray-400 text-stone-800 px-2 rounded-full text-sm">
                  {card.name}
                </span>
                <p className="uppercase text-[10px] bg-fuchsia-800 text-fuchsia-500 px-1 rounded-sm">
                  {card.category}
                </p>
              </div>
              {/* for small screens */}
              {modalState.isModalOpen &&   modalState.selectedCard.name === card.name &&(
                <div className={`mt-4 rounded-lg md:hidden transition-all  ${
                  modalState.isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}>

                  <div className="flex items-center justify-between">
                  <h2 className="font-bold text-xl mt-6 text-black">{modalState.selectedCard?.name}</h2>
                  <PrismicLink
                    field={modalState.selectedCard?.view_live}
                    className="text-black underline text-sm mt-6"
                  >
                    View Live
                  </PrismicLink>
                  </div>
                  <div className="flex items-center mt-4">
  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-fuchsia-400 text-black font-bold italic">
    {modalState.selectedCard?.firstLetter}
  </div>
  <p className="ml-3 text-xs text-gray-500">
    {modalState.selectedCard?.submitted_by}&apos;s Submission
  </p>
</div>
                  <div className="text-sm text-gray-700 mt-4">
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
          className="fixed inset-0  items-center justify-center bg-black bg-opacity-50  md:z-50 hidden md:flex"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-4 w-[700px] h-[575px] "
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
              <div className="flex items-center py-4">
  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-fuchsia-400 text-black font-bold italic">
    {modalState.selectedCard?.firstLetter}
  </div>
  <p className="ml-3 text-xs font-thin text-slate-500">
    {modalState.selectedCard?.submitted_by}&apos;s Submission
  </p>
</div>
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

export default Main
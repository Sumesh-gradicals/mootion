'use client'

/**
 * @typedef {import("@prismicio/client").Content.MainSlice} MainSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MainSlice>} MainProps
 * @param {MainProps}
 */
import { useState } from 'react';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicLink } from '@prismicio/react';
;
const Main = ({ slice }) => {
    

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [...new Set(slice.primary.card.map((card) => card.category.toUpperCase()))];


  const filteredCards = selectedCategory
    ? slice.primary.card.filter(( (card) => card.category.toUpperCase() === selectedCategory.toUpperCase()))
    : slice.primary.card;


  const openModal = (card,event) => {
    event.stopPropagation();
    setSelectedCard(card);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
   >

   


<div className=' md:px-[100px]'>
<ul className='flex flex-wrap  justify-center '>
{filteredCards.map((card, index) => (<li className='  px-2 py-3 cursor-pointer '    key={index} onClick={(e) => openModal(card,e)}>
  <PrismicNextImage field={card.image} className=' w-[400px] h-[300px] rounded-md'/>
  
  <div className='flex items-center justify-between px-3 -mt-9 cursor-pointer'>
  <span className='bg-gray-400 text-stone-800 px-2 rounded-full font-medium'>{card.name}</span>
  <p className='uppercase text-[10px] bg-fuchsia-800 text-fuchsia-500  px-1 rounded-sm'>{card.category}</p>
  </div>

  </li>))}
</ul>

</div>

<div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 " >
<div className='px-6 py-2 rounded-2xl text-white bg-[#383338] shadow-xl'>

<div className=" flex space-x-6 h-[60px] w-[450px] items-center justify-around ">
  
{categories.map((category, index) => (

            <p
              key={index}
              className={` cursor-pointer   transition-transform transform   ${selectedCategory===category?'text-white text-2xl font-bold  italic': 'text-xs font-thin text-slate-200' } `}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </p>))}
</div>
</div>

</div>
{/* Modal */}

{isModalOpen && (<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={closeModal}>


  <div className="bg-white rounded-lg p-4 w-[700px] h-[575px] "  onClick={(e) => e.stopPropagation()}  >
<div className='px-3 py-4'>
<div className='flex items-center justify-between ' >
<h2 className='text-3xl font-semibold'>{selectedCard.name}</h2>

<PrismicLink field={selectedCard.view_live} className='text-xs font-semibold'>View Live</PrismicLink>
</div>
<p className='py-4 text-xs font-thin text-slate-500'>{selectedCard.submitted_by}&apos;s Submission</p>

<PrismicNextImage field={selectedCard.image}  className=' w-[645px] h-[370px] rounded-md'/>
<p  className='py-6 text-sm font-thin '>Tutorials are available for After Effects, GSAP & Framer Motion</p>
</div>

  </div>


 
</div>










)}
    </section>
  );
};

export default Main;

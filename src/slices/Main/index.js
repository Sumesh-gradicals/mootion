/**
 * @typedef {import("@prismicio/client").Content.MainSlice} MainSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MainSlice>} MainProps
 * @param {MainProps}
 */
import { PrismicNextImage } from '@prismicio/next';

import Image from 'next/image';
const Main = ({ slice }) => {
  
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >


   


<div className=' md:px-[160px]'>
<ul className='flex flex-wrap  justify-center '>
{slice.primary.card.map((card, index) => (<li className='  px-2 py-2 cursor-pointer '    key={index}>
  <PrismicNextImage field={card.image} className=' w-[400px] h-[300px] rounded-md'/>
  
  <div className='flex items-center justify-between px-2 -mt-8 cursor-pointer'>
  <span className='bg-gray-400 text-stone-800 px-2 rounded-full font-medium'>{card.name}</span>
  <p className='uppercase text-[10px] bg-fuchsia-800 text-fuchsia-500  px-1 rounded-sm'>{card.category}</p>
  </div>

  </li>))}
</ul>

</div>


    </section>
  );
};

export default Main;

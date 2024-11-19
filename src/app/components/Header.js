
import Image from 'next/image';
export default  function Header(){

    return(   
    <header className=' flex md:justify-center px-4 py-8 '>
    
      
    <Image
  src="/MOOOTION.svg"
  alt="Logo"
  width={100}
  height={28} 
className='cursor-pointer'/>
    
    </header>
)}
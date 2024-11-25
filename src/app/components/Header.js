
import Image from 'next/image';
export default  function Header(){

    return(   
    <header className=' flex justify-between md:justify-center px-10 py-8 '>
    
      
    <Image
  src="/MOOOTION.svg"
  alt="Logo"
  width={100}
  height={28} 
className='cursor-pointer'/>
     <div className="head cursor-pointer  block  md:hidden">
          <div>
            <div className="eye"></div>
            <div className="eye"></div>
          </div>
          </div>
    </header>
)}
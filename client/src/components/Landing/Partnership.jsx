import { whoPhoto, yayasanJantung, kemenkesPhoto, pmiPhoto, BKKBN } from "../../assets/images"

const Partnership = () => {
  return (
    <div id="partnership" className='w-[80%] mx-auto px-10 py-1 mt-8 rounded-lg bg-lightGrey flex justify-evenly items-center'>
        <img className='max-w-36 grayscale hover:grayscale-0 hover:opacity-100 duration-200 ease-in-out' src={kemenkesPhoto} alt="" />
        <img className='max-w-36 grayscale hover:grayscale-0 hover:opacity-100 duration-200 ease-in-out' src={whoPhoto} alt="" />
        <img className='w-20 grayscale opacity-45 hover:grayscale-0 hover:opacity-100 duration-200 ease-in-out' src={yayasanJantung} alt="" />
        <img className='min-w-52 max-w-36 grayscale opacity-45 hover:grayscale-0 hover:opacity-100 duration-200 ease-in-out' src={pmiPhoto} alt="" />
        <img className='w-32 grayscale opacity-45 hover:grayscale-0 hover:opacity-100 duration-200 ease-in-out' src={BKKBN} alt="" />
    </div>
  )
}

export default Partnership
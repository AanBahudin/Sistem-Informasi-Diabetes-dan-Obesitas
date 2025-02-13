import { MoveRight } from "lucide-react"
import { Link } from "react-router-dom"

const Tagline = () => {
  return (
    <div className="w-full bg-[url('/src/assets/images/gradient.jpg')] bg-no-repeat bg-cover  py-10 px-20 rounded-xl flex justify-between items-center my-20">
        <section className="my-auto">
            <p className='text-md tracking-wider'>Ubah Hidup Anda</p>
            <p className='text-4xl mt-1 font-semibold text-slate-800'> <span className='font-semibold'>It's Time</span> To Change Your <br /> Life Today</p>
        </section>

        <Link to='/login' className='bg-white rounded-lg px-7 py-3 my-auto h-fit text-sm flex items-center gap-x-5 justify-center cursor-default hover:shadow-lg text-slate-700 no-underline duration-200 ease-in-out'>
            Mulai Perjalanan Anda
        </Link>
    </div>
  )
}

export default Tagline
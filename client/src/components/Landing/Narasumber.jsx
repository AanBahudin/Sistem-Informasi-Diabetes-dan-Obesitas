import { narasumber } from '../../utils/constants'
import TeamCard from './TeamCard'

const Narasumber = () => {
  return (
    <div className='-mt-5'>
        <h1 className='text-4xl font-semibold text-slate-800 text-center'>Dukungan dari <span className='text-blue/80'>Ahli</span> Terpercaya</h1>
        <p className='w-[800px] text-center mx-auto my-10 text-slate-700'>Kami percaya bahwa informasi yang akurat harus datang dari sumber yang tepat. Oleh karena itu, kami menggandeng narasumber terpercaya yang ahli di bidang kesehatan untuk memastikan setiap tips dan saran yang kami sampaikan berdasarkan penelitian dan pengalaman nyata.</p>

        <section className="flex flex-wrap gap-10 items-center justify-center px-28">
            {narasumber.map((item, index) => {
                return <TeamCard key={index} {...item} />
            })}
        </section>

        
    </div>
  )
}

export default Narasumber
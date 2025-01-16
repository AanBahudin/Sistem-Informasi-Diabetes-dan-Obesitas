import { aboutPhoto } from '../../assets/images'

const Dukungan = () => {
  return (
    <div className='flex items-center justify-center gap-x-20 w-full'>
        <div>
            <h2 className='text-4xl font-semibold text-slate-800 mb-6'>Kami <span className="text-blue/80"> Mendukung</span> Pasien Diabetes dan  <br/> Obesitas Mencapai Tujuan Mereka</h2>
            <p className='w-[700px] text-slate-700'>Kami memahami bahwa setiap perjalanan kesehatan itu unik. Melalui platform ini, kami menyediakan panduan yang dapat disesuaikan dengan kebutuhan individu, mulai dari edukasi nutrisi, panduan aktivitas fisik, hingga informasi medis terpercaya. Semua langkah dirancang untuk membantu Anda mengelola dan mencegah komplikasi lebih lanjut.</p>

            <p className='ml-10 my-6 px-10 w-[700px] text-slate-700 border-l-2 text-sm font-medium border-blue italic'>Obesitas dan diabetes menjadi tantangan global yang signifikan. Data WHO menunjukkan bahwa pada tahun 2021, lebih dari 420 juta orang di dunia hidup dengan diabetes, dan 39% populasi dewasa mengalami kelebihan berat badan.</p>

            <p className='w-[700px] text-slate-700'>Mencegah dan mengelola obesitas serta diabetes bukan hanya tentang diet atau olahraga semata, tetapi juga tentang pola pikir yang sehat dan dukungan yang konsisten. Kami percaya bahwa dengan akses ke informasi yang benar dan komunitas yang peduli, Anda dapat mengambil langkah nyata untuk mencapai tujuan kesehatan Anda.

</p>

        </div>
        <img className='rounded-lg w-[500px]' src={aboutPhoto} alt="" />
    </div>
  )
}

export default Dukungan
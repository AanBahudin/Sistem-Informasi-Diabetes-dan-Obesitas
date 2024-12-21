import { sehatPhoto } from '../../assets/images'


const Article = () => {
  return (
    <div id='article' className="w-full my-20">
      <h1 className="text-4xl font-medium text-center mb-6">Artikel Terbaru</h1>
      <p className="text-center mx-auto w-[60%]">Dapatkan wawasan terbaru dan tips praktis seputar kesehatan, gaya hidup, dan pencegahan diabetes serta obesitas. Artikel-artikel kami dirancang untuk membantu Anda membuat keputusan yang lebih sehat setiap hari.</p>

      {/* CARDS CONTAINER */}
      <div className="w-[80%] mt-6 grid grid-cols-3 gap-4 mx-auto items-center justify-center flex-wrap">

        <article className="bg-lightGrey rounded-md max-w-[300px] p-4">
          <img className='w-full rounded-sm' src={sehatPhoto} alt="" />
          <h5 className='text-[14px] my-2 font-semibold'>5 Tips Kebiasaan yang Dapat Menurunkan Kadar Gula Pada Tubuh</h5>
          <p className='text-[12px]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi modi dolorum sapiente error optio vel?</p>
        </article>

        <article className="bg-lightGrey rounded-md max-w-[300px] p-4">
          <img className='w-full rounded-sm' src={sehatPhoto} alt="" />
          <h5 className='text-[14px] my-2 font-semibold'>5 Tips Kebiasaan yang Dapat Menurunkan Kadar Gula Pada Tubuh</h5>
          <p className='text-[12px]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi modi dolorum sapiente error optio vel?</p>
        </article>

        <article className="bg-lightGrey rounded-md max-w-[300px] p-4">
          <img className='w-full rounded-sm' src={sehatPhoto} alt="" />
          <h5 className='text-[14px] my-2 font-semibold'>5 Tips Kebiasaan yang Dapat Menurunkan Kadar Gula Pada Tubuh</h5>
          <p className='text-[12px]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi modi dolorum sapiente error optio vel?</p>
        </article>

        <article className="bg-lightGrey rounded-md max-w-[300px] p-4">
          <img className='w-full rounded-sm' src={sehatPhoto} alt="" />
          <h5 className='text-[14px] my-2 font-semibold'>5 Tips Kebiasaan yang Dapat Menurunkan Kadar Gula Pada Tubuh</h5>
          <p className='text-[12px]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi modi dolorum sapiente error optio vel?</p>
        </article>

        <article className="bg-lightGrey rounded-md max-w-[300px] p-4">
          <img className='w-full rounded-sm' src={sehatPhoto} alt="" />
          <h5 className='text-[14px] my-2 font-semibold'>5 Tips Kebiasaan yang Dapat Menurunkan Kadar Gula Pada Tubuh</h5>
          <p className='text-[12px]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi modi dolorum sapiente error optio vel?</p>
        </article>

        <article className="bg-lightGrey rounded-md max-w-[300px] p-4">
          <img className='w-full rounded-sm' src={sehatPhoto} alt="" />
          <h5 className='text-[14px] my-2 font-semibold'>5 Tips Kebiasaan yang Dapat Menurunkan Kadar Gula Pada Tubuh</h5>
          <p className='text-[12px]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi modi dolorum sapiente error optio vel?</p>
        </article>

      </div>
    </div>
  )
}

export default Article
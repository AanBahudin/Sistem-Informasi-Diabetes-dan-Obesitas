import React, { useState } from 'react'
import { sehatPhoto } from "../assets/images"
import { ChevronDown } from 'lucide-react'

const SingleNewsPage = () => {

  const [showReference, setShowReference] = useState(false);

  return (
    <div className='w-[60%] mx-auto py-20'>
      <h5 className='bg-blue round-full w-fit font-medium px-4 rounded-full py-2 text-small text-white'>Hidup Sehat</h5>

      <h1 className='text-3xl font-semibold my-6'>5 Tips Kebiasaan yang Dapat Menurunkan Kadar Gula Pada Tubuh</h1>

      <p>Masih banyak orang yang mengalami kesulitan untuk menurunkan berat badan, padahal sebenarnya ada beberapa cara yang mudah, lho. Selama dilakukan dengan bertahap dan konsisten, cara-cara menurunkan berat badan tersebut tidak akan membuatmu merasa tersiksa.</p>

      <p className='my-10'>Daripada susah-susah menjalani diet yang terlalu ketat, mendingan kamu terapkan cara mudah menurunkan berat badan yang tidak menyiksa, tapi justru lebih efektif. Hanya saja, dalam menjalaninya, kamu butuh komitmen dan disiplin ya, supaya berat badanmu dapat turun dan mencapai berat badan ideal.</p>

      <img className='h-[40vh] w-full object-cover object-top my-10' src={sehatPhoto} alt="" />

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur consequuntur dolorum non accusamus quam, quibusdam deserunt culpa debitis doloribus aperiam soluta? Aspernatur labore dolor earum asperiores nulla ab eum beatae quibusdam tenetur, debitis nihil tempora eaque veniam quidem consequuntur, magnam eius? Voluptatibus quaerat veniam neque nemo similique corrupti inventore aspernatur dignissimos, labore, impedit at, enim perferendis velit ab recusandae quia et omnis hic molestiae. Exercitationem natus deserunt, sunt accusantium quibusdam debitis veritatis non ipsum provident excepturi, soluta nostrum, iste numquam.</p>

      <p className='my-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat magnam voluptate ipsa aut libero non nesciunt necessitatibus, reiciendis recusandae unde explicabo, quas assumenda. Ducimus, animi ex eius officia iure atque, labore placeat facilis quasi nam aut ipsum. Repellat iste accusantium sint dolorem consequatur fuga nostrum reprehenderit maiores optio laudantium, quam itaque distinctio consequuntur repellendus, ipsa beatae cum est? Libero, vero.</p>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur consequuntur dolorum non accusamus quam, quibusdam deserunt culpa debitis doloribus aperiam soluta? Aspernatur labore dolor earum asperiores nulla ab eum beatae quibusdam tenetur, debitis nihil tempora eaque veniam quidem consequuntur, magnam eius? Voluptatibus quaerat veniam neque nemo similique corrupti inventore aspernatur dignissimos, labore, impedit at, enim perferendis velit ab recusandae quia et omnis hic molestiae. Exercitationem natus deserunt, sunt accusantium quibusdam debitis veritatis non ipsum provident excepturi, soluta nostrum, iste numquam.</p>

      <p className='my-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur consequuntur dolorum non accusamus quam, quibusdam deserunt culpa debitis doloribus aperiam soluta? Aspernatur labore dolor earum asperiores nulla ab eum beatae quibusdam tenetur, debitis nihil tempora eaque veniam quidem consequuntur, magnam eius? Voluptatibus quaerat veniam neque nemo similique corrupti inventore aspernatur dignissimos, labore, impedit at, enim perferendis velit ab recusandae quia et omnis hic molestiae. Exercitationem natus deserunt, sunt accusantium quibusdam debitis veritatis non ipsum provident excepturi, soluta nostrum, iste numquam.</p>

      <p>Terakhir kali diperbaharui : 23 September 2023</p>
      <p className='my-2'>Ditinjau Oleh : Dr. Kino Kinora</p>
      <p className='flex gap-x-2' onClick={() => setShowReference(!showReference)}>
        Referensi
        <ChevronDown className={`stroke-gray-500/50  ${showReference ? 'rotate-180' : ''} duration-200 ease-in-out`} />
      </p>

      <div className={`w-[80%] border-[1px] border-gray-700/50 rounded-md px-2 py-4 mt-2 text-medium ${ showReference ? 'visible' : 'hidden' }`}>
        Weiss, E. P., et al. (2017). Effects of Weight Loss on Lean Mass, Strength, Bone, and Aerobic Capacity. Medicine and Science in Sports and Exercise, 49(1), pp 206−217.
        National Health Service UK (2019). 12 Tips to Help You Lose Weight.
        Cleveland Clinic (2018). Are You a Fast Eater? Slow Down to Eat (and Weigh) Less.
        Mayo Clinic (2021). Weight Loss: 6 Strategies for Success.
        Zeratsky, K. Mayo Clinic (2018). Does Eating a Healthy Breakfast Help Control Weight?
        Kelly, D. Health (2020). 14 Portion Control Tips from Nutritionist.
        Sachdev, P. Nourish by WebMD (2022). Slideshow: Best Diet Tips Ever - 22 Ways to Stay on Track.
        Newman, D. Nourish by WebMD (2018). The Benefits of Eating Breakfast.
        Lillien, L. Verywell Fit (2022). What Is a High-Fiber Diet?
        Pritzker, S. Verywell Fit (2022). Why You May Not Want to Skip Breakfast.
      </div>
    </div>
  )
}

export default SingleNewsPage
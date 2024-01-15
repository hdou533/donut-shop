import Hero from './../components/layout/Hero';
import HomeMenu from './../components/layout/HomeMenu';
import SectionHeader from './../components/layout/SectionHeader';

export default function Home() {
  
  return (
    <>
      <Hero />
      <HomeMenu />
      <section id='about' className='text-center my-16'>
        <SectionHeader subHeader={'Our story'} mainHeader={'About us'} />
        <div className='max-w-2xl mx-auto my-8 text-gray-500 flex flex-col gap-8'>
          <p>Welcome to CrispyCrown Donut, where passion for flavors meets a commitment to excellence. Established in 2020, we are more than just a donut shop. We&apos;re creators of indulgent experiences, crafting each donut with precision and love. Our journey began with a simple belief: that every moment deserves to be celebrated with a touch of sweetness. Our team, a blend of culinary enthusiasts and industry experts, strives to deliver not just a product but a symphony of taste and delight. Join us as we continue to develope new products and create memories, one exquisite bite at a time.</p>
          <p >At CrispyCrown Donut, sustainability is at the heart of our craft. We pride ourselves on sourcing the finest ingredients while maintaining an unwavering commitment to eco-friendly practices. From our kitchen to your table, indulge guilt-free, knowing that each delightful creation is not just an exquisite treat but a step towards a greener, sweeter future. Thank you for being a part of our flavorful journey. Enjoy the experience!</p>
        </div>
       
      </section>

      <section id='contact' className='text-center my-16'>
        <SectionHeader subHeader={'Don\'t hesitate'} mainHeader={'Contact us'} />
        <div className="text-4xl my-8 text-gray-500 italic">
          <a  href="tel:+123 456 789">+123 456 789</a>
        </div>
        
      </section>

    </>
  )
}

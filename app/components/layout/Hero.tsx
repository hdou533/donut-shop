import Image from "next/image";
import { Right } from "../icons/Right";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="hero py-4 w-full h-[calc(100vh-80px)] flex flex-col sm:flex-row sm:h-[426px]">
      <div className="py-8 w-full h-1/2 order-2 sm:w-1/2 sm:order-1">
        <h1 className="text-4xl font-semibold">
          Crafted with
          <br />
          <span className="text-primary">Love</span>
        </h1>
        <p className="my-10 text-gray-500">
          Our donuts are more than treats; they&apos;re an expression of our
          dedication to quality. Each one is handcrafted with love, using the
          finest ingredients to ensure a melt-in-your-mouth experience with
          every bite.
        </p>

        <div className="flex gap-8 text-sm">
          <Link
            href="/menu"
            className="bg-primary w-1/2 flex gap-2 items-center justify-center text-white px-4 py-2 rounded-full uppercase"
          >
            Order now
            <Right />
          </Link>
          {/* <button className='flex gap-2 px-6 py-2 items-center text-gray-500 border-none hover:text-primary transition-all rounded-full font-semibold'>
                        Learn more
                        <Right />
                    </button> */}
        </div>
      </div>
      <div className="w-full h-2/5 order-1 sm:w-1/2 sm:order-2 sm:h-full">
        <div className="relative w-full h-full">
          <Image
            src={"/hero.jpg"}
            alt="donut"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

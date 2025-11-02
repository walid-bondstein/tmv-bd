import Header from "@/components/shared/Header";
import Image from "next/image";
import CurrentOffer from "./CurrentOffer";
import Icons from "./Icons";

export default function Landing() {
  return (
    <section
      className={`lg:bg-[url("/images/group.png")] relative lg:bg-no-repeat lg:bg-[length:50%_100%] lg:bg-[position:100%_0%] bg-secondary section-padding-y min-h-[100vh] flex flex-col`}
      aria-labelledby="hero-heading"
    >
      <Icons />
      <CurrentOffer />
      <Header />
      <div className="mx-auto component-container lg:grid flex flex-col grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 items-center lg:flex-1">
        <div className="lg:h-full h-auto w-full lg:flex justify-start items-center">
          <div className="space-y-2 lg:space-y-10 text-left lg:-translate-y-10">
            <Image
              src={"/images/award.png"}
              alt="Award"
              width={150}
              height={130}
              className="w-16 h-14 md:w-[9rem] md:h-[8.125rem] md:mt-0 mt-7"
            />
            <h1 className="font-semibold text-[clamp(28px,4.0625vw,78px)] leading-[1.03]">
              Track your vehicle. <br />
              anytime. anywhere.
            </h1>
            <div className="flex justify-start items-center gap-4 lg:gap-6 ">
              <button
                className="bg-submit lg:w-[9.7rem] xs:w-[9.8rem] xs:h-13 w-28 h-8 lg:font-bold rounded-lg tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)]"
                type="submit"
              >
                Buy Now
              </button>
              <button className="bg-btn-info lg:w-[9.7rem] xs:w-[9.8rem] xs:h-13 w-28 h-8 lg:font-bold rounded-lg tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)]">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div
          className={`h-full w-full flex-1 relative bg-[url("/images/group.png")] lg:bg-none bg-no-repeat bg-size-[100%_100%] bg-position-[100%_0%] lg:block hidden`}
        >
          <Image
            src="/images/background1.png"
            alt="Hero visual"
            fill
            priority
            className="h-full lg:ml-auto lg:mx-0 mx-auto rounded-xl object-contain lg:pt-8 lg:translate-x-23 xl:translate-x-28 2xl:translate-x-44"
          />
        </div>
      </div>
      <div
        className={`mt-4 h-full w-full flex-1 relative bg-[url("/images/bg-mobile.png")] lg:bg-none bg-no-repeat bg-size-[100%_100%] object-cover bg-position-[100%_100%] block lg:hidden`}
      >
        <Image
          src="/images/background1.png"
          alt="Hero visual"
          fill
          priority
          className="h-full mx-auto object-contain pt-24"
        />
      </div>
    </section>
  );
}

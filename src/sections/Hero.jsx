import { arrowRight } from "../assets/icons";
import { shoes, statistics } from "../constants";
import { bigShoe1 } from "../assets/images";
import ShoeCard from "../components/ShoeCard";
function Hero() {
  return (
    <section className="w-full flex flex-col lg:flex-row min-h-screen gap-5 max-w-screen-wide">
      <div className="xl:w-2/5 flex flex-col items-start w-full  pt-28">
        <p className="text-orange-500"> Our summer collections</p>
        <h1 className="text-8xl font-semibold max-sm:text-[72px] max-sm:leading-[82]">
          <span>The new arrival</span>
          <br />
          <span className=" text-orange-500"> Nike </span>
          shoes
        </h1>
        <p className="text-slate-700 text-lg leading-8 sm:max-w-sm">
          Discover stylish nike quality shoes
        </p>
        <button className="rounded-full bg-orange-500 text-white px-5 py-2 border-none mt-10 flex justify-between gap-5">
          Shop now
          <img
            src={arrowRight}
            alt="arrow right icon"
            className=" rounded-full w-5 h-6"
          />
        </button>

        <div className="flex gap-20 items-center justify-center mt-10">
          {statistics.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <p className="font-semibold text-3xl font-palanquin">
                {" "}
                {stat.value}{" "}
              </p>
              <p className="text-xs"> {stat.label} </p>
            </div>
          ))}
        </div>
      </div>
      {/* shoe display image */}
      <div className=" flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-indigo-50">
        <img
          src={bigShoe1}
          alt="shoe1"
          width={600}
          height={500}
          className="object-contain  z-10"
        />
      </div>
      <div className="flex gap-4 ">
        {shoes.map((shoe, index) => (
          <div key={index}>
            <ShoeCard imgUrl={shoe} changeBigShoeImg={() => {}} bigShoeImg="" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hero;

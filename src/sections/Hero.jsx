import { arrowRight } from "../assets/icons";
function Hero() {
  return (
    <section className="w-full bg-indigo-50 border-2 border-black flex flex-col lg:flex-row min-h-screen gap-5 max-w-screen-wide">
      <div className="xl:w-2/5 flex flex-col items-start w-full max-xl:p-10 pt-28">
        <p className="text-orange-500"> our summer collections</p>
        <h1 className="text-4xl font-bold ">
          <span>The new arrival</span>
          <br />
          <span className=" text-orange-500"> Nike </span>
          shoes
        </h1>
        <p>Discover stylish nike quality shoes</p>
        <button className="rounded-full bg-orange-500 text-white px-5 py-2 border-none flex justify-between gap-5">
          Shop now
          <img
            src={arrowRight}
            alt="arrow right icon"
            className=" rounded-full w-5 h-6"
          />
        </button>
      </div>
    </section>
  );
}

export default Hero;

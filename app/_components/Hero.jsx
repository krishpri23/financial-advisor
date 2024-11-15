import { ContainerScroll } from "@/components/ui/containerScroll";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="bg-slate-100 flex flex-col items-center overflow-hidden ">
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Manage your money with AI driven <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-primary pb-10">
                  Finance Advisor
                </span>
              </h1>
            </>
          }
        >
          <Image
            src="/project.png"
            alt="hero"
            height={700}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </section>
  );
};

export default Hero;

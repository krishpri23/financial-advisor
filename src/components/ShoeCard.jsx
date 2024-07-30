import React from "react";

function ShoeCard({ imgUrl, changeBigShoeImg, bigShoeImg }) {
  const handleClick = () => {
    // change shoe img on click

    if (bigShoeImg !== imgUrl.bigShoeImg) {
      changeBigShoeImg(imgUrl.bigShoeImg);
    }
  };
  return (
    <div
      className={` px-5 py-3 rounded-xl ${
        bigShoeImg === imgUrl ? "border-orange-500" : "border-transparent"
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-center items-center bg-indigo-100 sm:w-40 sm:h-40 rounded-xl max-sm:p-4">
        <img
          src={imgUrl.thumbnail}
          alt="shoe collection"
          width={120}
          height={100}
        />
      </div>
    </div>
  );
}

export default ShoeCard;

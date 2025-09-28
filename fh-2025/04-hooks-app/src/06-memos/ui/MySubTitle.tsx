import React from "react";

interface MySubTitle {
  subTtitle: string;
  callMyAPI: (subtitulo: string) => void;
}

export const MySubTitle = React.memo(({ subTtitle, callMyAPI }: MySubTitle) => {
  console.log("<MySubTitle /> Rerendered!");
  return (
    <>
      <h6 className="text-2xl">{subTtitle}</h6>
      <button
        className="bg-indigo-600 text-white px-2 py-2 cursor-pointer rounded-md"
        onClick={() => callMyAPI(subTtitle)}
      >
        Llamar a funcion
      </button>
    </>
  );
});

import { useCallback, useState } from "react";
import { MyTitle } from "./ui/MyTitle";
import { MySubTitle } from "./ui/MySubTitle";

export const MemoHook = () => {
  const [title, setTitle] = useState<string>('Hola');
  const [subTitle, setSubTitle] = useState<string>('Mundo');

  // Esta funcion se rerenderiza cada vez que das click en cambiar titulo, pero eso no deberia de pasar para eso es el use callback por que la funcion no cambia no hay necesitdad de que rerenderice
  const handleMyAPI = useCallback(() => {
    console.log('LLamar a mi API!' + subTitle);
  }, [subTitle]); // UseCallback lleva el arreglo de dependencias como el useEffect, solo se renderizara si cambia un parametro en el arreglo de dependencias

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-thin text-white">Memo App</h1>

      <MyTitle title={title} />
      <MySubTitle subTtitle={subTitle} callMyAPI={handleMyAPI}/>

      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setTitle('Hello' + new Date().getTime())}
      >
        Cambiar titulo
      </button>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setSubTitle('World')}
      >
        Cambiar subtitulo
      </button>
    </div>
  );
};

import { useCounter } from "@/hooks/useCounter"
import { useMemo } from "react";

const heavyStuff = (iteration: number) => {
  console.time('HEAVY_STUFF_STARTED');
  for (let i=0;i < iteration; i++) {
    console.log('Ahi vamos!!!!');
  }
  console.timeEnd('HEAVY_STUFF_STARTED');
  return `${iteration} realizadas`;
}

export const MemoCounter = () => {
  const { increment, counter } = useCounter(4000);
  const { increment: increment2, counter: counter2 } = useCounter(4000);

  const myHeavyValue = useMemo(() => {
    heavyStuff(counter)
  }, [counter]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Memo - useMemo</h1>
      <hr />
      <h4>
        Counter: {counter}
      </h4>
      <h4>
        Counter: {counter2}
      </h4>
      <button onClick={increment} className="bg-blue-500 text-white px-4 cursor-pointer rounded-md py-2">
        +1
      </button>

      <button onClick={increment2} className="bg-blue-500 text-white px-4 cursor-pointer rounded-md py-2">
        +1
      </button>
    </div>
  )
}
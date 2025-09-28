import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import { InstagromApp } from "./07-useOptimistic/InstagromApp";
import { Toaster } from "sonner";
import { ProfessionalApp } from "./09-useContext/ProfessionalApp";
// import { ClientInformation } from "./08-use-suspense/ClientInformation";
// import { getUserActions } from "./08-use-suspense/api/get-user.action";
// import { MemoHook } from "./06-memos/MemoHook";
// import { MemoCounter } from "./06-memos/MemoCounter";
// import { TasksApp } from "./05-useReducer/TaskApp";
// import { ScrambleWords } from "./05-useReducer/ScrambleWorlds";
// import { FocusScreen } from "./04-useRef/FocusScreen";
// import { PokemonPage } from "./03-examples/PokemonPage";
// import { HooksApp } from "./HooksApp";
// import { TrafficLightWithEffect } from "./02-useEffect/TrafficLightWithEffect";
// import { TrafficLightWithHook } from "./02-useEffect/TrafficLightWithHook";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    {/* <HooksApp /> */}
    {/* <TrafficLightWithEffect /> */}
    {/* <TrafficLightWithHook /> */}
    {/* <PokemonPage /> */}
    {/* <FocusScreen /> */}
    {/* <TasksApp /> */}
    {/* <ScrambleWords /> */}
    {/* <MemoHook /> */}
    {/* <MemoCounter /> */}
    {/* <InstagromApp /> */}'
    {/* <Suspense
      fallback={
        <div className="bg-gradient flex flex-col ">
          <h1 className="text-2xl">Cargando...</h1>
        </div>
      }
    >
      <ClientInformation getUser={getUserActions(1000)}/>
    </Suspense> */}
    <ProfessionalApp />
  </StrictMode>
);

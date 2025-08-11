import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UpTasksRouter from "./routers/UpTasksRouter";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UpTasksRouter />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);

// SECCION 42 ME QUEDE 544

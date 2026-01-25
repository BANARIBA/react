import { Button } from "@/components/ui/button";

export const HomePage = () => {
  return (
    <>
      <h1>Hello</h1>
      <h1 className="font-monserrat font-thin">Hello</h1>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    </>
  );
};

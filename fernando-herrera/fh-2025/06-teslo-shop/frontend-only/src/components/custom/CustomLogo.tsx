import { Link } from "react-router";

interface CustomLogoProps {
  subtitle?: string;
}

export const CustomLogo = ({ subtitle = "Shop" }: CustomLogoProps) => {
  return (
    <Link className="flex items-center no-wrap" to="/">
      <span className="font-monserrat font-bold text-xl m-0 whitespace-nowrap">
        Teslo |
      </span>
      <p className="text-muted-foreground m-0 px-2 whitespace-nowrap">
        {subtitle}
      </p>
    </Link>
  );
};

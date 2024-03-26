import { Button } from "@radix-ui/themes";
import * as React from "react";

interface Props {
  variant?: "classic" | "solid" | "soft" | "surface" | "outline" | "ghost";
  onClick?: () => void;
  children?: React.ReactNode;
  svgIcon?: React.ReactNode;
  color?:
    | "gray"
    | "gold"
    | "bronze"
    | "brown"
    | "yellow"
    | "amber"
    | "orange"
    | "tomato"
    | "red"
    | "ruby"
    | "crimson"
    | "pink"
    | "plum"
    | "purple"
    | "violet"
    | "iris"
    | "indigo"
    | "blue"
    | "cyan"
    | "teal"
    | "jade"
    | "green"
    | "grass"
    | "lime"
    | "mint"
    | "sky"
    | undefined;
}

const CustomButton: React.FC<Props> = ({
  variant = "surface",
  children,
  svgIcon,
  color,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      className="flex items-center gap-2 min-w-[143px] py-3 cursor-pointer"
      color={color}
      variant={variant}
    >
      {svgIcon && <>{svgIcon}</>}
      {children}
    </Button>
  );
};

export default CustomButton;

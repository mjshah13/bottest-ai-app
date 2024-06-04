import { Button } from "@radix-ui/themes";
import * as React from "react";

interface Props {
  variant?: "classic" | "solid" | "soft" | "surface" | "outline" | "ghost";
  onClick?: () => void;
  children?: React.ReactNode;
  svgIcon?: React.ReactNode;
  isWidth?: boolean;
  disabled?: boolean | undefined;
  isPrimary?: boolean;
  isDanger?: boolean;
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
  isWidth = false,
  disabled,
  isPrimary,
  isDanger,
}) => {
  return (
    <Button
      onClick={onClick}
      className={` ${isWidth && "w-full"} ${isPrimary ? "text-white" : "text-black"
        } ${isDanger ? "text-danger" : "text-black"}
      ${disabled
          ? "text-disabledGray cursor-not-allowed"
          : "text-black cursor-pointer"
        }
      text-black py-4 font-poppin font-normal flex items-center gap-2 min-w-[143px] rounded-md dark:text-white`}
      color={color}
      variant={variant}
      disabled={disabled}
    >
      {svgIcon && <>{svgIcon}</>}
      {children}
    </Button>
  );
};

export default CustomButton;

import { useStateContext } from "@/Contexts/ThemeContext";
import React, { ComponentProps } from "react";

type props = ComponentProps<"button"> & {
  icon?: any;
  bgColor?: any;
  color?: any;
  bgHoverColor?: any;
  size?: any;
  text?: any;
  borderRadius?: any;
  width?: any;
  fontSize?: any;
};
const Button = (props: props) => {
  const { setIsClicked, initialState } = useStateContext();

  return (
    <button
      {...props}
      type={props.type ?? "button"}
      onClick={async (e) => {
        if (props.onClick) await props.onClick(e);

        setIsClicked(initialState);
      }}
      style={{
        backgroundColor: props.bgColor,
        color: props.color,
        borderRadius: props.borderRadius,
        fontSize: props.fontSize,
      }}
      className={` text-${props.size} p-3 w-${props.width} hover:drop-shadow-xl hover:bg-${props.bgHoverColor} flex items-center gap-1`}
    >
      {props.icon} {props.text}
    </button>
  );
};

export default Button;

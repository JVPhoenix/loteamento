import { twMerge } from "tailwind-merge";

interface ButtonProps {
  className: string;
  onClick: () => void;
}

export const Button = (props: React.PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={twMerge(
        "flex justify-center items-center font-bold w-26 p-4",
        "ease-in-out duration-200 select-none active:duration-100",
        "border border-solid rounded-tr-lg rounded-bl-lg rounded-tl-2xl rounded-br-2xl mb-2",
        "hover:text-yellow1 hover:scale-110 active:scale-90 hover:border-yellow1 border-white text-white",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

import { twMerge } from "tailwind-merge";

export const HorizonalBorder = ({ className }: { className?: string }) => {
  return <hr className={twMerge("w-full border-top-[1px] flex-[1]", className)}></hr>;
};

import React from "react";

export const MainLayout: React.FC<{ children: React.ReactNode }> = (props) => {
  return <div className="px-20  pb-20 w-full">{props.children}</div>;
};

"use client";

import clsx from "clsx";

const Container = ({ ref, className, children, fluid, position, padding, ...props }) => {
  const containerClass = clsx(
    fluid ? "container-fluid" : "container",
    `position-${position ?? "relative"}`,
    padding ?? "px-3 px-sm-4 px-lg-5",
    className
  );

  return (
    <div ref={ref} className={containerClass} {...props}>
      {children}
    </div>
  );
};

export default Container;

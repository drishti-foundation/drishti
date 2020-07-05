import React, { useRef, useState, useEffect } from "react";

type obj = {
  [key: string]: any;
};

interface AnimateIntoViewProps extends obj {
  children?: any;
  threshold?: number;
  type: keyof React.ReactHTML;
}

function AnimateIntoView({
  children,
  threshold = 0.15,
  type,
  className,
  ...props
}: AnimateIntoViewProps) {
  const ref = useRef<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setShow((show) => entry.isIntersecting || show);
        },
        { threshold }
      );

      observer.observe(ref.current);

      return () => observer.disconnect();
    }
  }, [ref]);

  return React.createElement(
    type,
    {
      ...props,
      className: classNames(className, show ? "-show" : "-hide"),
      ref: ref,
    },
    children
  );
}

export default AnimateIntoView;

const classNames = (...props: (string | null | undefined)[]) =>
  props.filter((c) => c !== null && c !== undefined).join(" ");

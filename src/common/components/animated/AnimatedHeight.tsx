import AnimateHeight from "react-animate-height";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
  classNameOnActive?: string;
  isOpen: boolean;
}

const AnimatedHeight = (props: Props) => {
  const { children, className, classNameOnActive, isOpen = false } = props;

  return (
    <div
      className={clsx("flex flex-col", className, isOpen && classNameOnActive)}
    >
      <AnimateHeight
        id="example-panel"
        duration={500}
        height={isOpen ? "auto" : 0}
      >
        {children}
      </AnimateHeight>
    </div>
  );
};

export default AnimatedHeight;

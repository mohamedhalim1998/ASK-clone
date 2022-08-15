import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import {
  animated,
  useSpring,
  config,
  useSpringRef,
  useChain,
} from "react-spring";

const Checkbox: React.FC<
  {
    label: string;
    isChecked?: boolean;
    setIsChecked?: (checked: boolean) => void;
    register?: UseFormRegisterReturn;
  } & React.HTMLAttributes<HTMLDivElement>
> = (params) => {
  const checkboxAnimationRef = useSpringRef();
  const checkboxAnimationStyle = useSpring({
    backgroundColor: params.isChecked ? "#EB3D43" : "#fff",
    borderColor: params.isChecked ? "#EB3D43" : "#ddd",
    config: config.gentle,
    ref: checkboxAnimationRef,
  });

  const [checkmarkLength, setCheckmarkLength] = useState(0);

  const checkmarkAnimationRef = useSpringRef();
  const checkmarkAnimationStyle = useSpring({
    x: params.isChecked ? 0 : checkmarkLength,
    config: config.gentle,
    ref: checkmarkAnimationRef,
  });

  useChain(
    params.isChecked
      ? [checkboxAnimationRef, checkmarkAnimationRef]
      : [checkmarkAnimationRef, checkboxAnimationRef],
    [0, 0.1]
  );

  return (
    <label className="text-xs">
      <input type="checkbox" {...params.register} />
      <animated.svg
        style={checkboxAnimationStyle}
        className={`checkbox ${params.isChecked ? "checkbox--active" : ""}`}
        aria-hidden="true"
        viewBox="0 0 15 11"
        fill="none"
      >
        <animated.path
          d="M1 4.5L5 9L14 1"
          strokeWidth="2"
          stroke="#fff"
          ref={(ref) => {
            if (ref) {
              setCheckmarkLength(ref.getTotalLength());
            }
          }}
          strokeDasharray={checkmarkLength}
          strokeDashoffset={checkmarkAnimationStyle.x}
        />
      </animated.svg>
      {params.label}
    </label>
  );
};

export default Checkbox;

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  iconName: IconProp;
}

export default function NavButton(props: Props) {
  return (
    <button
      className="inline-flex items-center px-2 py-1 mx-2 mt-2 font-medium transition-colors duration-200 transform rounded-md md:mt-0 text-gray-200 hover:bg-gray-700"
      {...props}
    >
      {props.text}
      <FontAwesomeIcon className="ml-2" width={18} icon={props.iconName} />
    </button>
  );
}

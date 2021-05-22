import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useField } from "formik";
import { useState } from "react";
import { Popover } from "react-tiny-popover";
import ErrorPopover from "./ErrorPopover";

interface Props {
  label: string;
  name: string;
  minLength?: number;
  maxLength: number;
  type?: string;
}

export default function PlanTableSubElement({
  label,
  type = "text",
  ...props
}: Props) {
  const [field, meta] = useField(props);

  const [isPopOpen, setisPopOpen] = useState(false);

  return (
    <Popover isOpen={isPopOpen} content={<ErrorPopover error={meta.error} />}>
      <div
        className="flex flex-col"
        onMouseEnter={() => setisPopOpen(true)}
        onMouseLeave={() => setisPopOpen(false)}
      >
        <label className="font-semibold mb-1 cursor-default">{label}</label>
        <div className="inline-flex relative items-center">
          <input
            className={`${
              meta.error
                ? "bg-gray-100 border border-red-500 "
                : "bg-gray-100 border border-gray-400 "
            }w-36 text-black px-2 py-1 rounded-md shadow-inner`}
            type={type}
            {...field}
            {...props}
          />
          {meta.error && (
            <FontAwesomeIcon
              className="absolute right-2"
              width={18}
              color="red"
              icon="exclamation-circle"
            />
          )}
        </div>
      </div>
    </Popover>
  );
}

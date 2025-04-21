import { Input, InputProps, Textarea, TextAreaProps } from "@heroui/react";
import { Controller, useFormContext } from "react-hook-form";

type FormInputProps = {
  name: string;
  type?: "text" | "email" | "password" | "textarea" | string;
  props?: InputProps | TextAreaProps;
};

export default function FormInput({
  name,
  type = "text",
  props = {},
}: FormInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMsg = errors[name]?.message as string;
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          type === "textarea" ? (
            <Textarea
              {...(props as TextAreaProps)}
              maxRows={4}
              label={props.label || ""}
              placeholder={props.placeholder || ""}
              {...field}
            />
          ) : (
            <Input
              {...(props as InputProps)}
              type={type}
              label={props.label || ""}
              placeholder={props.placeholder || ""}
              {...field}
            />
          )
        }
      />
      {errorMsg && (
        <div className="mt-2">
          <p className="text-red-500 text-xs">{errorMsg}</p>
        </div>
      )}
    </div>
  );
}

"use client";
import request from "@/utils/AxiosUtils";
import { POST_CONTACT } from "@/utils/AxiosUtils/api";
import { addToast, Button, Divider, Spinner } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { BiCheckCircle } from "react-icons/bi";
import * as yup from "yup";
import FormInput from "../FromInputs/FormInput";
import "./form.css";

export default function ContactForm() {
  const { mutate, isLoading } = useMutation({
    mutationKey: [POST_CONTACT],
    mutationFn: async (data) =>
      await request({ url: POST_CONTACT, method: "POST", data }),
    onSuccess: (data) => {
      if (data?.response?.status === 500) {
        const errData = data?.response?.data;
        addToast({
          type: "error",
          title: errData?.message,
          description: errData?.error,
          color: "danger",
        });
      } else {
        addToast({
          type: "success",
          title: "Success",
          description: "Message sent successfully",
          color: "success",
          icon: <BiCheckCircle />,
        });
      }
    },
    onError: (error) => {
      const errData = error?.response?.data;
      if (errData) {
        addToast({
          type: "error",
          title: errData?.message,
          description: errData?.error,
          color: "danger",
        });
      }
      addToast({
        type: "error",
        title: error?.message,
        color: "danger",
      });
    },
  });
  const schema = yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    contactNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Contact Number must be exactly 10 digits")
      .required("Contact Number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    message: yup.string().required("Message is required"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const submitHandler = (data) => {
    mutate(data);
  };
  return (
    <div className="from-component">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitHandler)}>
          <div className="space-y-4">
            <FormInput
              name="fullName"
              props={{
                label: "Full Name",
                variant: "bordered",
                color: "secondary",
                size: "sm",
              }}
              label="Full Name"
            />
            <FormInput
              name="contactNumber"
              props={{
                label: "Contact Number",
                variant: "bordered",
                color: "secondary",
                size: "sm",
              }}
            />
            <FormInput
              name="email"
              props={{
                label: "Email",
                variant: "bordered",
                color: "secondary",
                size: "sm",
              }}
            />
            <FormInput
              name="message"
              type="textarea"
              props={{
                label: "Message",
                variant: "bordered",
                color: "secondary",
                size: "sm",
              }}
            />
          </div>
          <Divider className="my-6" />
          <div className="flex items-end gap-4 justify-end">
            <Button type="submit">Submit</Button>
            {isLoading && <Spinner color="secondary" />}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

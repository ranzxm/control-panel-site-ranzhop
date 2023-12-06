"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import FormAddUser from "./form-add-user";
import FormEditUser from "./form-edit-user";

interface FormCreateUpdateProps {
  buttonState: string;
  statusDialog: React.Dispatch<React.SetStateAction<boolean>>;
  formUser: UseFormReturn<
    {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      role: string;
    },
    any,
    undefined
  >;
  formUserUpdate: UseFormReturn<
    {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      role: string;
    },
    any,
    undefined
  >;
}

const FormCreateUpdate = ({
  formUser,
  formUserUpdate,
  buttonState,
  statusDialog,
}: FormCreateUpdateProps) => {
  return (
    <>
      {buttonState === "create" ? (
        <FormAddUser form={formUser} statusDialog={statusDialog} />
      ) : (
        <FormEditUser form={formUserUpdate} />
      )}
    </>
  );
};

export default FormCreateUpdate;

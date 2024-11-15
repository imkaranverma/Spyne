import React from "react";
import { FormProvider as Form, UseFormReturn } from "react-hook-form";

interface FormProviderInterface {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  className?: string;
  onSubmit?: () => void;
}

export default function FormProvider<T>({ children, onSubmit, methods, className }: FormProviderInterface) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} className={className}>
        {children}
      </form>
    </Form>
  );
}

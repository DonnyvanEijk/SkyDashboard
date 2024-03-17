// components/Form.tsx
import { FormEvent, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const Form = ({ onSubmit }: FormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <Input type="text" name="name" placeholder="Enter your username" />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
"use client";

import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function SearchInput({
  placeholder,
  value,
  onChange,
  className
}: SearchInputProps) {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
}
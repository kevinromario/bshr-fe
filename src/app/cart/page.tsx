"use client";
import { useAuth } from "src/hooks/useAuth";
import { capitalizeFirstLetter } from "src/utils/string";

export default function Cart() {
  const { user } = useAuth();
  return <div>{capitalizeFirstLetter(user?.name.firstname || "")}</div>;
}

"use client";
import { CenteredContainer } from "src/components/CenteredContainer";
import { LoginForm } from "./LoginForm";
import React from "react";

export default function Login() {
  React.useEffect(() => {
    document.title = "Login - E-Commerce";
  }, []);

  return (
    <CenteredContainer>
      <LoginForm />
    </CenteredContainer>
  );
}

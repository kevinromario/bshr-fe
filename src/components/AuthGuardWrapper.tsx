"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { protectedRoutes } from "src/constants";
import { useAuth } from "src/hooks/useAuth";

export function AuthGuardWrapper({ children }: { children: React.ReactNode }) {
  const { user, authStateLoaded } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (!authStateLoaded) return;

    const isProtected = protectedRoutes.includes(pathname);

    if (isProtected && !user) {
      router.replace("/login");
    } else if (pathname === "/login" && user) {
      router.replace("/cart");
    } else {
      setCanRender(true);
    }
  }, [user, pathname, router, authStateLoaded]);

  if (!canRender) return null;
  return children;
}

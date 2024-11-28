"use client";

import { ReactNode, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface NavbarWrapperProps {
  children: ReactNode;
}

export default function NavbarWrapper({ children }: NavbarWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);

  const isAboveMedium = useMediaQuery("(min-width: 768px)", {
    defaultValue: undefined,
    initializeWithValue: false
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div>
        {children}
      </div>
    );
  }

  if (isAboveMedium) {
    return (
      <div>
        <div>isAboveMedium</div>
        {children}
      </div>
    );
  }
  
  return (
    <div>
      <div>isBelowMedium</div>
      {children}
    </div>
  );
}
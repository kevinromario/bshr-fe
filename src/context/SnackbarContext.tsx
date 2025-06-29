"use client";

import React, { createContext, useCallback, useState } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

type SnackbarState = {
  id: number;
  message: string;
  severity: AlertColor;
};

type SnackbarContextType = {
  showSnackbar: (options: Omit<SnackbarState, "id">) => void;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [snackbars, setSnackbars] = useState<SnackbarState[]>([]);

  const showSnackbar = useCallback(
    ({ message, severity }: Omit<SnackbarState, "id">) => {
      const id = Date.now();
      setSnackbars((prev) => [...prev, { id, message, severity }]);
    },
    []
  );

  const handleClose = (id: number) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      {snackbars.map((snackbar) => (
        <Snackbar
          key={snackbar.id}
          open
          autoHideDuration={3000}
          onClose={() => handleClose(snackbar.id)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          sx={{ mb: 2 }}
        >
          <Alert
            onClose={() => handleClose(snackbar.id)}
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      ))}
    </SnackbarContext.Provider>
  );
};

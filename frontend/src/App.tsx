import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./constants/query-client";
import { AuthProvider } from "./context/AuthContext";
import RoutesWrapper from "./routes/RoutesWrapper";
import { SnackbarProvider } from "notistack";

const App: React.FC = () => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      autoHideDuration={3000}
      className="bg-white"
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RoutesWrapper />
        </AuthProvider>
      </QueryClientProvider>
    </SnackbarProvider>
  );
};

export default App;

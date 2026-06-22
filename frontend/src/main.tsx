import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

const publishableKey =
  import.meta.env.CLERK_PUBLISHABLE_KEY;
console.log("Clerk Publishable Key:", publishableKey);

if (!publishableKey) {
  throw new Error("Missing Clerk Publishable Key");
}

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
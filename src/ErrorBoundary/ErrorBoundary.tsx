import { useState, type FC, type PropsWithChildren } from "react";
import {
  ErrorBoundary as ErrorBoundaryComponent,
  type ErrorBoundaryProps,
} from "react-error-boundary";
import UnexpectedError from "../components/UnexpectedError";

const ErrorBoundary: FC<PropsWithChildren> = ({ children }) => {
  const [someKey, setSomeKey] = useState(null);

  const resetErrorBoundary: ErrorBoundaryProps["onReset"] = () =>
    setSomeKey(null);

  const logErrorToService: ErrorBoundaryProps["onError"] = (error, info) => {
    console.error("Caught an error:", error, info);
  };

  return (
    <ErrorBoundaryComponent
      FallbackComponent={UnexpectedError}
      onError={logErrorToService}
      onReset={resetErrorBoundary} // reset the state of your app here
      resetKeys={[someKey]} // when changed, will trigger a reset of the error boundary.
    >
      {children}
    </ErrorBoundaryComponent>
  );
};

export default ErrorBoundary;

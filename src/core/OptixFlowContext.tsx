import React from "react";
import type { OptixFlowConfig } from "../types";

/**
 * Context for sharing OptixFlow configuration with image components
 */
export const OptixFlowContext = React.createContext<OptixFlowConfig | undefined>(
  undefined
);

/**
 * Provider component for OptixFlow configuration
 */
export function OptixFlowProvider({
  children,
  config,
}: {
  children: React.ReactNode;
  config?: OptixFlowConfig;
}) {
  return (
    <OptixFlowContext.Provider value={config}>
      {children}
    </OptixFlowContext.Provider>
  );
}

/**
 * Hook to access OptixFlow configuration
 */
export function useOptixFlowConfig(): OptixFlowConfig | undefined {
  return React.useContext(OptixFlowContext);
}

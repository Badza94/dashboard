import * as React from "react";
type TGenerateReportData = {
  from: string;
  to: string;
  projectId: string;
  gatewayId: string;
};
type TAction = { type: "generateReport"; payload: TGenerateReportData };
// eslint-disable-next-line no-unused-vars
type TDispatch = (action: TAction) => void;
type TState = { data: TGenerateReportData };
type TLandingPageProviderProps = { children: React.ReactNode };

const GlobalContext = React.createContext<
  { state: TState; dispatch: TDispatch } | undefined
>(undefined);

function globalReducer(state: TState, action: TAction) {
  switch (action.type) {
    case "generateReport": {
      return { data: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function GlobalProvider({ children }: TLandingPageProviderProps) {
  const [state, dispatch] = React.useReducer(globalReducer, {
    data: {
      from: "",
      to: "",
      projectId: "",
      gatewayId: "",
    },
  });

  const value = { state, dispatch };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
function useGlobal() {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
}
export { GlobalProvider, useGlobal };

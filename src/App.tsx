import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "./components/layout";
import { CollapseTable } from "./modules/table";
import { QueryClient, QueryClientProvider } from "react-query";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  return (
    <GlobalProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Layout>
            <CollapseTable />
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
    </GlobalProvider>
  );
}

export default App;

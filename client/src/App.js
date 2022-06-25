import { useSelector } from "react-redux"
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components"

import { AdminPanel } from "./views/admin"
import { VendingMachine } from "./views/user"
import theme from "./theme";

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`

const ProtectedRoute = ({ children, jwt }) => {
  // if (!jwt) {
  if (false/* Mock */) { 
    return <Navigate to="/" replace />
  }

  return children;
}

const ProtectedAdminPanel = ({ userData }) => (
  <ProtectedRoute {...userData}>
    <AdminPanel />
  </ProtectedRoute>
)

function App() {
  const { userData } = useSelector(state => state.user)

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<VendingMachine />} />
            <Route path="/admin" element={<ProtectedAdminPanel {...userData} />} />
          </Routes>
        </BrowserRouter>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

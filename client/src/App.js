import { useEffect } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components"

// import { AdminLogin, AdminPanel } from "./views/admin"
import { VendingMachine } from "./views/user"
import theme from "./theme";

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`

const ProtectedRoute = ({ children, jwt }) => {
  if (!jwt) {
    return <Navigate to="/" replace />
  }

  return children;
}

// const ProtectedAdminPanel = ({ userData }) => (
//   <ProtectedRoute {...userData}>
//     <AdminPanel />
//   </ProtectedRoute>
// )

function App() {
  const { userData } = useSelector(state => state.user)

  useEffect(() => {
    // get localstorage currency

    // check for admin password and if logged in redirect
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<VendingMachine />} />
            {/* <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-panel" element={<ProtectedAdminPanel {...userData} />} /> */}
          </Routes>
        </BrowserRouter>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

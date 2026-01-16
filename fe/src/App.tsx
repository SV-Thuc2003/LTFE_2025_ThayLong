import AppRoutes from "./routes/router";
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { AuthProvider } from "./contexts/AuthProvider";
function App() {

  return (
   <AuthProvider>
      <BrowserRouter>
         <AppRoutes />
      </BrowserRouter>
   </AuthProvider>
  )
}

export default App

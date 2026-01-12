import AppRoutes from "./routes/router";
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartProvider";
function App() {

   return (
      <AuthProvider>
         <CartProvider>
            <BrowserRouter>
               <AppRoutes />
            </BrowserRouter>
         </CartProvider>
      </AuthProvider>
   )
}

export default App

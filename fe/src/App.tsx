import AppRoutes from "./routes/router";
import { BrowserRouter } from "react-router-dom";
import './index.css'

function App() {

  return (
   <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App

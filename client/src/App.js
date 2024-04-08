import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Information from "./pages/information/Information";
import Checkout from "./pages/checkout/Checkout";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <h1>Something went wrong</h1>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/information" element={<Information />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import MealForm from "./components/MealForm";
import MealTable from "./components/MealTable";
import UserTable from "./components/UserTable";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Login />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meal/create"
            element={
              <ProtectedRoute>
                <MealForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meal"
            element={
              <ProtectedRoute>
                <MealTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserTable />
              </ProtectedRoute>
            }
          />


        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

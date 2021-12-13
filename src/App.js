import "./App.css";
import Axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./layouts/Register";
import Login from "./layouts/Login";
import Dashboard from "./layouts/Dashboard";
import NotFound from "./layouts/NotFound";

Axios.defaults.baseURL = "http://localhost:4000/";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="dashboard/*" element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

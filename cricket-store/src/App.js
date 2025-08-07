import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import MainLayout from "./layout/MainLayout";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </Router>
    </Provider>
  );
}

export default App;

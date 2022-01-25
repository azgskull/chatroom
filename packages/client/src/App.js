import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Room from "./views/Room";
import Rooms from "./views/Rooms";

import style from "./app.module.css";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import SideUser from "./components/SideUsers";
import IfAuthenticated from "./components/IfAuthenticated";
import IfNotAuthenticated from "./components/IfNotAutenticated";
import { useEffect } from "react";
import { configureFetchClient } from "./common/utils";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    configureFetchClient(navigate);
  }, [navigate]);

  return (
    <div className={style.wrapper}>
      <Header />
      <div className={style.body}>
        <div className={style.view}>
          <Routes>
            <Route
              path="/"
              element={
                <IfNotAuthenticated redirect>
                  <Home />
                </IfNotAuthenticated>
              }
            />
            <Route
              path="/rooms"
              element={
                <PrivateRoute>
                  <Rooms />
                </PrivateRoute>
              }
            />
            <Route
              path="/rooms/:roomName"
              element={
                <PrivateRoute>
                  <Room />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <IfAuthenticated>
          <SideUser />
        </IfAuthenticated>
      </div>
    </div>
  );
}

export default App;

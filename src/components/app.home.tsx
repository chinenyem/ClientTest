import styled from "@emotion/styled";
import {CSSProperties, FC, useState} from "react";
import {  mapProps } from "../engine/redux";
import AppNav from "./app.navbar";
import AppTasks from "./app.tasks";
import AppLoader from "./app.loader";


const AppHome: FC = () => {
  const ready = mapProps((state) => state.user.isAuthenticated);
    let [loading, setLoading] = useState(true);

    return (
    <Styled>
      <div className="navbar">
        <AppNav />
      </div>
      <div className="tasks">{ready ? <AppTasks /> : <AppLoader loading={loading}  size={150} />}</div>
    </Styled>
  );
};

const Styled = styled.div`
  height: 100%;
  display: grid;
  grid-template:
    "navbar" 80px
    "tasks " 1fr
    / 1fr;
  & > .navbar {
    grid-area: navbar;
    width: 70%;
    justify-self: center;
  }
  & > .tasks {
    grid-area: tasks;
    width: 70%;
    justify-self: center;
  }
`;
export default AppHome;

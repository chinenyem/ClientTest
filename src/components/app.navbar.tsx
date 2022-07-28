import styled from "@emotion/styled";
import { FC,  useEffect } from "react";
import {mapDispatch, mapProps} from "../engine/redux";
import logo from "../index.svg";
import {$authenticateUser} from "../engine/slices/user.slice";


const AppNav: FC = () => {
    const dispatch = mapDispatch();
    useEffect(() => {
        dispatch($authenticateUser())
    }, [dispatch])

  const username = mapProps((state) => state.user.displayName);
  return (
    <Styled>
      <h1>TASKS</h1>
      <div className="navSub">
        <img src={logo} className="logo" alt="logo" />
        <div>{username}</div>
      </div>
    </Styled>
  );
};

const Styled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  & h1 {
    opacity: 0.85;
  }
  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.2em;
    text-transform: uppercase;
    font-weight: 500;
  }
  & div.createTask{
  }
  & div.navSub{
    margin-left: 152%;
  }
`;
export default AppNav;

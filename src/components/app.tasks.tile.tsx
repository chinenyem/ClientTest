import styled from "@emotion/styled";
import { FC, useState } from "react";
import { TaskDetailsModel } from "../engine/proxies/task.proxy";
import { mapProps } from "../engine/redux";
import CoreButton from "./controls/button";

type Props = {
  task: TaskDetailsModel;
};

const AppTasksTile: FC<Props> = (props) => {
  const groupid = props.task.groupId;
  const group = mapProps((state) => state.tasking.taskGroups.find((inst) => inst.id === groupid));
  
  if (props.task) {
    return (
      <Styled>
        <div className="description">{props.task.description}</div>
        <div className="group">{group && group.name}</div>
        <div className="complete">
          <CoreButton text="Mark Complete" click={() => {}} />
        </div>
      </Styled>
    );
  }
  return null;
};

const Styled = styled.div`
  display: grid;
  grid-template:
    "description  complete" 1fr
    "group        complete" auto
    / 1fr auto;
  & > .description {
    grid-area: description;
    font-size: 1.2em;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  & > .group {
    grid-area: group;
    opacity: 0.56;
    font-weight: 500;
  }
  & > .complete {
    grid-area: complete;
  }
`;
export default AppTasksTile;

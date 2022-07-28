import styled from "@emotion/styled";
import { FC, useState, CSSProperties } from "react";
import { TaskDetailsModel } from "../engine/proxies/task.proxy";
import {mapDispatch, mapProps} from "../engine/redux";
import CoreButton from "./controls/button";
import {$deleteTask, $getTasks} from "../engine/slices/tasking.slice";
import AppLoader from "./app.loader";

type Props = {
  task: TaskDetailsModel;
};

const AppTasksTile: FC<Props> = (props) => {
    const dispatch = mapDispatch();
    const groupid = props.task.groupId;
    const group = mapProps((state) => state.tasking.taskGroups.find((inst) => inst.id === groupid));
    let [loading, setLoading] = useState(false);

    const completeTask = (id?:number) => {
        setLoading(true);
        if (id){
            dispatch($deleteTask(id)).then((data) => {
                dispatch($getTasks()).then((data) => {
                    setLoading(false);
                })
            }).catch((e) => {
                console.log(e);
            });
        }
    };

  if (props.task) {
    return (
      <Styled>
          {loading ? <AppLoader loading={loading}  size={150} /> : ""}
        <div className="description">{props.task.description}</div>
        <div className="group">{group && group.name}</div>
        <div className="complete">
          <CoreButton text="Mark Complete" click={() => completeTask(props.task.id)} />
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

import styled from "@emotion/styled";
import { FC, useState } from "react";
import { TaskGroupModel } from "../engine/proxies/task.proxy";


type Props = {
  taskGroup: TaskGroupModel;
  select?: (selected: boolean) => void;
  groupTypeID: number;
  setGroupTypeFn: (type: number) => void;
};

const AppTasksGroup: FC<Props> = (props) => {
  const [selected, setSelected] = useState(false);

  if (props.taskGroup) {
    const select = (id:string) => {
      props.setGroupTypeFn(parseInt(id));
      if (props.select) props.select(!selected);
      setSelected(!selected);
    }
    return (
      <Styled className={props.taskGroup.id  === props.groupTypeID ? "selected" : ""}  onClick={() => select(`${props.taskGroup.id}`)}>
        <div>{`${props.taskGroup.name}`}</div>
        <div className="filter-label">Filter</div>
      </Styled>
    );
  }
  return null;
};

const Styled = styled.div`
  cursor: pointer;
  display: inline-block;
  border-radius: 17px;
  border: 2px solid transparent;
  background-color: lightgray;
  color: #343434;
  font-weight: 700;
  line-height: 1;
  padding: 3px 10px 5px 10px;
  &.selected {
    border-color: #1bfa1b;
    color: #129212;
  }
  &.non-selected {
    border-color: none;
    color: #129212;
  }
  & > .filter-label {
    font-size: 0.8em;
    opacity: 0.86;
    font-weight: 500;
  }
`;
export default AppTasksGroup;

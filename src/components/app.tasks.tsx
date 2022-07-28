import styled from "@emotion/styled";
import { FC, useEffect, useState } from "react";
import { mapDispatch, mapProps } from "../engine/redux";
import { $getTaskGroups, $getTasks } from "../engine/slices/tasking.slice";
import AppTasksTile from "./app.tasks.tile";
import AppTasksGroup from "./app.tasks.group";
import CoreButton from "./controls/button";
import { useNavigate }  from "react-router-dom";

const AppTasks: FC = () => {
  const navigate = useNavigate();
  const tasks = mapProps((state) => state.tasking.activeTasks);
  const groups = mapProps((state) => state.tasking.taskGroups);
  const [groupType , setGroupType ] = useState(0);
  const createTask = () => {
    navigate("/task");
  };

  const dispatch = mapDispatch();

  useEffect((): void => {
    dispatch($getTaskGroups());
    dispatch($getTasks());
  }, [dispatch]);


  if (tasks && tasks.length) {
    let tasktiles = null;
    //define initial tasks to show
    if (groupType == 0){
      tasktiles = tasks.map((task) => <AppTasksTile key={task.id} task={task} />);
    }else{
      //filter task by selected groupType, which is the group id
      tasktiles = tasks.filter((task) => task.groupId === groupType).map((task) => <AppTasksTile key={task.id} task={task} />);
    }
    const taskgroups = groups.map((group) => <AppTasksGroup key={group.id}
                                                            taskGroup={group}
                                                            groupTypeID={groupType}
                                                            setGroupTypeFn={setGroupType} />);
    return (
      <Styled>
        <div className="createTask">
          <CoreButton text="Create New Task" click={() => createTask()} />
        </div>
        <div className="groups">{taskgroups}</div>
        <div className="tasks">{tasktiles}</div>
      </Styled>
    );
  }
  return <h3>No Tasks</h3>;
};

const Styled = styled.div`
  height: 100%;
  display: grid;
  grid-template:
   "createTask" auto
    "groups" auto
    "tasks" 1fr
    / 1fr;
  & > .groups {
    grid-area: groups;
    display: flex;
    flex-direction: row;
    column-gap: 4px;
  }
  & > .tasks {
    grid-area: tasks;
    & > div {
      margin: 10px 0;
    }
  }& > .createTask {
    grid-area: createTask;
    & > div {
      margin: 10px 0;
    }
  }
`;
export default AppTasks;

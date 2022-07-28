import styled from "@emotion/styled";
import { FC, useEffect, useState } from "react";
import { mapDispatch, mapProps } from "../engine/redux";
import { $getTaskGroups, $getTasks } from "../engine/slices/tasking.slice";
import AppTasksTile from "./app.tasks.tile";
import AppTasksGroup from "./app.tasks.group";
import CoreButton from "./controls/button";
import { useNavigate }  from "react-router-dom";
import AppLoader from "./app.loader";


const AppTasks: FC = () => {
  const navigate = useNavigate();
  const tasks = mapProps((state) => state.tasking.activeTasks);
  const groups = mapProps((state) => state.tasking.taskGroups);
  const [groupType , setGroupType ] = useState(0);
  let [loading, setLoading] = useState(true);

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
        {taskgroups && tasktiles ?
            <div>
              <div className="groups">{taskgroups}</div>
              <div className="tasks">{tasktiles}</div>
            </div>
            : <AppLoader loading={loading}  size={150} />}
      </Styled>
    );
  }
  return <h3><AppLoader loading={loading}  size={150} /></h3>;
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

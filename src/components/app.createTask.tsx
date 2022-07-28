import styled from "@emotion/styled";
import { FC, useEffect, useState } from "react";
import { useNavigate }  from "react-router-dom";
import { mapDispatch, mapProps } from "../engine/redux";
import AppNav from "./app.navbar";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {$getTaskGroups, $saveTask , $getTasks  } from "../engine/slices/tasking.slice";
import {TaskDetailsModel} from "../engine/proxies/task.proxy";

type Props = {
    task: TaskDetailsModel;
};

const AppCreateTask: FC =  () => {
    const navigate = useNavigate();
    const dispatch = mapDispatch();
    const groups = mapProps((state) => state.tasking.taskGroups);
    const tasks = mapProps((state) => state.tasking.activeTasks);
    const [validated, setValidated] = useState(false);
    const cancleCreateTask = () => {
        navigate("/");
    };


    useEffect((): void => {
        dispatch($getTaskGroups());
        dispatch($getTasks());
    }, [dispatch]);

    const saveTask = (e: any) => {
        e.preventDefault();
        setValidated(true);
        const task = {
            description:e.target.description.value,
            groupId:parseInt(e.target.groupId.value),
            id: Math.floor(Math.random() * 100),
        }
        dispatch($saveTask(task)).then((data) => {
            navigate("/");
        }).catch((e) => {
            console.log(e);
        });
    }

    return (
        <Styled>
            <div className="navbar">
                <AppNav />
            </div>
            <div className="tasks">
                <h2>Create Task</h2>
            </div>
            <div className="createTaskFrom">
                <Form className="w-50" onSubmit={saveTask}>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea"  name="description" placeholder="task description" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a description.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="taskGroup">
                        <Form.Label>Select Task Group</Form.Label>
                        <Form.Select aria-label="task group selections" name="groupId" required>
                            <option value="">- select -</option>
                            {groups.map((group, i) => (
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please select a group type.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Save
                    </Button>
                    <Button className="m-3" variant="danger" onClick={() => cancleCreateTask()}>
                        Cancel
                    </Button>
                </Form>
            </div>
        </Styled>
    );
};

const Styled = styled.div`
  height: 100%;
  display: grid;
  grid-template:
    "navbar" 80px
    "tasks " auto
    "createTaskFrom" auto
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
  & > .createTaskFrom {
    grid-area: createTaskFrom;
    width: 70%;
    justify-self: center;
  }
  & div.navSub{
    margin-left: 152%;
  }
`;
export default AppCreateTask;
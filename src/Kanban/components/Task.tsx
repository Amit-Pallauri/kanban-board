import React from "react";
import { TaskProps } from "../types/cardTypes";
const { Draggable } = require("react-beautiful-dnd");

/**
 * @description Component that renders task inside card.
 */

const Task: React.FC<TaskProps> = (taskData) => {
  return (
    <Draggable draggableId={taskData?.id} index={taskData?.dragKey}>
      {(provided: any, snapshot: any) => (
        <div
          className="task-container"
          snapshot={snapshot}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3 className="title">{taskData?.title}</h3>
          {/* <img src="./images/edit.png" alt="" /> */}
        </div>
      )}
    </Draggable>
  );
};

export default Task;

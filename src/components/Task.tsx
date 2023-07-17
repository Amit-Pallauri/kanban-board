import React from "react";
import { TaskProps } from "../types/cardTypes";
const { Draggable } = require("react-beautiful-dnd");

const Task: React.FC<TaskProps> = (taskData) => {
  return (
    <Draggable
      // key={taskData?.id}
      draggableId={taskData?.id}
      index={taskData?.dragKey}
    >
      {(provided: any, snapshot: any) => (
        <div
          className="task-container"
          snapshot={snapshot}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3 className="title">{taskData?.title}</h3>
        </div>
      )}
    </Draggable>
  );
};

export default Task;

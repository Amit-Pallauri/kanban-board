import React from "react";
import Task from "./Task";
import AddCard from "./AddCard";
import { CardsProps, TaskProps } from "../types/cardTypes";
const { Droppable } = require("react-beautiful-dnd");

const Card: React.FC<CardsProps> = (cardData) => {
  return (
    <div className="card-container">
      <Droppable droppableId={cardData?.id}>
        {(provided: any) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <h2 className="card-title">{cardData?.title}</h2>
            {cardData?.tasks.map((task: TaskProps, index: any) => (
              <Task
                key={index}
                id={`${cardData?.id}-task_${index}`}
                title={task.title}
                dragKey={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddCard handleSubmit={cardData.handleSubmit} />
    </div>
  );
};

export default Card;

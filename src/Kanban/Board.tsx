import React, { useMemo, useState } from "react";
import Card from "./components/Card";
import { CardsProps } from "./types/cardTypes";
import AddCard from "./components/AddCard";
const { DragDropContext } = require("react-beautiful-dnd");

/**
 * @description Kanban board with moveable cards
 */

const Board = () => {
  // Taking data from localstorage for the first load
  const kanbanFromLocalStorage = localStorage.getItem("kanban");
  const initialData =
    typeof kanbanFromLocalStorage === "string"
      ? JSON.parse(kanbanFromLocalStorage)
      : [];
  const [taskData, setTaskData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * @description Function for removing items from an array
   * @example removeFromList([1,2,3,4], 1)
   * @returns 2, [1, 3, 4]
   */
  const removeFromList = (list: any, index: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  /**
   * @description Function for adding items from an array
   * @example addToList([1,2,3,4], 1, 5)
   * @returns [1, 5, 2, 3, 4]
   */
  const addToList = (list: any, index: any, element: any) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  /**
   * @description Function for rearraging data when the drag ends
   */
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const tempTasks = [...taskData];

    // source cards and destination cards indexs
    const sourceCardIndex = result.source?.droppableId?.split("_")[1];
    const destCardIndex = result.destination?.droppableId?.split("_")[1];

    // source tasks and destination tasks indexs
    const sourceTaskIndex = result.source?.index;
    const destTaskIndex = result.destination?.index;

    // source cards and destination cards
    const sourceCard: any = tempTasks[sourceCardIndex];
    const destCard: any = tempTasks[destCardIndex];

    // if the source list and destination list are same.
    const sameCardSwap =
      result.source?.droppableId === result.destination?.droppableId;

    if (sameCardSwap) {
      // remove from the source list
      const [removed] = sourceCard.tasks?.splice(sourceTaskIndex, 1);
      // add it to the destination list ( which is also the source list )
      sourceCard.tasks = addToList(sourceCard.tasks, destTaskIndex, removed);
      // reupdate the tasksList
      setTaskData(tempTasks);
    } else {
      let sourceTasks = sourceCard.tasks;
      // remove from the source list
      const [removedElement, newSourceList] = removeFromList(
        sourceTasks,
        sourceTaskIndex
      );
      // update the removed new source list
      sourceCard.tasks = newSourceList;
      let destTasks = destCard.tasks;
      // update the destination list with removed source list item
      destCard.tasks = addToList(destTasks, destTaskIndex, removedElement);
      setTaskData(tempTasks);
    }

    // setting localstorage after the operation
    localStorage.setItem("kanban", JSON.stringify(taskData));
  };

  /**
   * @description Function for adding cards to the list
   */
  const handleCardSubmit = (cardData: any, cardIndex: any) => {
    const temp = [...taskData];
    const selectedCard = temp[cardIndex];
    const res: object[] = selectedCard.tasks;
    // created new entry with the given title of the list
    const obj = {
      title: cardData,
    };
    res.push(obj);
    setTaskData(temp);
    // re updated the locastorage
    localStorage.setItem("kanban", JSON.stringify(temp));
  };

  /**
   * @description Function for adding lists to the board
   */
  const handleListSubmit = (data: string) => {
    const obj = {
      title: data,
      tasks: [],
    };
    const temp = [...taskData];
    temp.push(obj);
    setTaskData(temp);
    localStorage.setItem("kanban", JSON.stringify(temp));
  };

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  /**
   * @description to close the card
   */
  const handleCardClose = (cardIndex: number) => {
    const [_, list] = removeFromList(taskData, cardIndex);
    setTaskData(list);
    localStorage.setItem("kanban", JSON.stringify(list));
  };

  const removeTask = (taskIndex: number, cardIndex: number) => {
    const tempCards = [...taskData];
    const card = tempCards.find((el: any, i: number) => i === cardIndex);
    const [_, tasks] = removeFromList(card.tasks, taskIndex);
    card.tasks = tasks;
    setTaskData(tempCards);
  };
  useMemo(() => {
    if (searchQuery.length > 1) {
      const query = searchQuery.toLowerCase();
      // filtering the tasksdata with the search query
      const filteredData: [] = taskData.map((card: CardsProps) => {
        const tasks = card.tasks.filter((task) => {
          return task.title.toLowerCase().includes(query) ? task : null;
        });
        return {
          ...card,
          tasks,
        };
      });
      setTaskData(filteredData);
    } else {
      setTaskData(initialData);
    }
  }, [searchQuery]);

  return (
    <div className="app-container">
      <div className="kanban-header">
        <h1>Kanban Board</h1>
        <div className="search-container">
          <input
            value={searchQuery}
            type="text"
            placeholder="Enter a keyword..."
            onChange={handleSearchChange}
          />
          <img src="./images/search.png" alt="" className="searchicon" />
        </div>
      </div>
      <div className="kanban-fluid">
        <div className="kanban-content">
          <DragDropContext onDragEnd={handleDragEnd}>
            {taskData.map((card: CardsProps, index: any) => (
              <Card
                id={`card_${index}`}
                title={card.title}
                tasks={card.tasks}
                handleSubmit={(data: string) => handleCardSubmit(data, index)}
                handleCardClose={() => handleCardClose(index)}
                handleTaskClose={(taskId: any) => removeTask(taskId, index)}
              />
            ))}
          </DragDropContext>
          <AddCard toAddList={true} handleSubmit={handleListSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Board;

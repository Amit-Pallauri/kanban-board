import React, { useMemo, useState } from "react";
import "./styles/style.scss";
import Card from "./components/Card";
import { CardsProps } from "./types/cardTypes";
import AddCard from "./components/AddCard";
const { DragDropContext } = require("react-beautiful-dnd");
const initialData = [
  {
    title: "To Do",
    tasks: [
      {
        title: "qwewe",
      },
      {
        title: "sjdfjkhsdkjfhskjdhfksd",
      },
      {
        title: "2123213123kjn1kj2n3kj23",
      },
      {
        title: "amitwaaa",
      },
      {
        title: "11111111",
      },
    ],
  },
  {
    title: "Development",
    tasks: [
      {
        title: "qwewe",
      },
      {
        title: "sjdfjkhsdkjfhskjdhfksd",
      },
    ],
  },
];

const App = () => {
  const [taskData, setTaskData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");

  const removeFromList = (list: any, index: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = (list: any, index: any, element: any) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  const handleDragEnd = (result: any) => {
    console.log(result, "resultsss");

    if (!result.destination) return;

    const tempTasks = [...taskData];

    const sourceCardIndex = result.source?.droppableId?.split("_")[1];
    const destCardIndex = result.destination?.droppableId?.split("_")[1];

    const sourceTaskIndex = result.source?.index;
    const destTaskIndex = result.destination?.index;

    const sourceCard: any = tempTasks[sourceCardIndex];
    const destCard: any = tempTasks[destCardIndex];

    const sameCardSwap =
      result.source?.droppableId === result.destination?.droppableId;

    if (sameCardSwap) {
      const [removed] = sourceCard.tasks?.splice(sourceTaskIndex, 1);
      sourceCard.tasks.splice(destTaskIndex, 0, removed);

      setTaskData(tempTasks);
    } else {
      let sourceTasks = sourceCard.tasks;
      const [removedElement, newSourceList] = removeFromList(
        sourceTasks,
        sourceTaskIndex
      );
      sourceCard.tasks = newSourceList;

      let destTasks = destCard.tasks;
      destCard.tasks = addToList(destTasks, destTaskIndex, removedElement);
      setTaskData(tempTasks);
    }
  };

  const handleCardSubmit = (cardData: any, cardIndex: any) => {
    const temp = [...taskData];
    const selectedCard = temp[cardIndex];
    const res: object[] = selectedCard.tasks;
    const obj = {
      title: cardData,
    };
    res.push(obj);
    setTaskData(temp);
  };

  const handleListSubmit = (data: string) => {
    const obj = {
      title: data,
      tasks: [],
    };
    const temp = [...taskData];
    temp.push(obj);
    setTaskData(temp);
  };

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  useMemo(() => {
    if (searchQuery.length > 1) {
      const filteredData: any = taskData.map((card) => {
        const tasks = card.tasks.filter((task) => {
          return task.title.includes(searchQuery) ? task : null;
        });
        console.log(tasks, "tasksss");
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
            autoFocus={true}
            type="text"
            placeholder="Enter a keyword..."
            onChange={handleSearchChange}
          />
          <img src="./images/search.png" alt="" className="searchicon" />
        </div>
      </div>
      <div className="kanban-content">
        <DragDropContext onDragEnd={handleDragEnd}>
          {taskData.map((card: CardsProps, index) => (
            <Card
              id={`card_${index}`}
              title={card.title}
              tasks={card.tasks}
              handleSubmit={(data: string) => handleCardSubmit(data, index)}
            />
          ))}
        </DragDropContext>
        <AddCard toAddList={true} handleSubmit={handleListSubmit} />
      </div>
    </div>
  );
};

export default App;

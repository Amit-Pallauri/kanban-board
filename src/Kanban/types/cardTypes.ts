export interface CardsProps {
  id?: string;
  title: string;
  tasks: Array<any>;
  handleSubmit?: Function;
  handleCardClose?: any;
  handleTaskClose?: any;
}

export interface TaskProps {
  id: string;
  title: string;
  dragKey: any;
  handleTaskClose?: any;
}

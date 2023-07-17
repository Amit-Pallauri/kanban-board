export interface CardsProps {
  id?: string;
  title: string;
  tasks: Array<any>;
  handleSubmit?: Function;
}

export interface TaskProps {
  id: string;
  title: string;
  dragKey: any;
}

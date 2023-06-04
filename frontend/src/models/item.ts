export interface Item {
    uuid: string;
    name: string;
    ram: number;
    cpu: number;
    state: State;
  }
  export interface State {
    id: number;
    state: string;
  }
  
export interface IProcessStep {
  title: string;
  text: string;
}

export interface IProcess {
  title: string;
  steps: IProcessStep[];
}


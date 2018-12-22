export class Resource {
    id: number;
    title: string;
    autor: string;
    anyo: number;
    content: string;
    free: string;
    category: {
      id: number;
      name: string;
    };
    type: {
      id: number;
      name: string;
    };
    cover: string;

  }

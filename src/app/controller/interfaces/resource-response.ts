export interface ResourceResponse {
  id: number;
  title: string;
  autor: string;
  anyo: number;
  url: string;
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

export interface UserResponse {

  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  notes: string;
  role: string;
  recursos: [{
    id: number,
    title: string,
    autor: string,
    anyo: number,
    url: string,
    content: string,
    free: boolean
  }];
}

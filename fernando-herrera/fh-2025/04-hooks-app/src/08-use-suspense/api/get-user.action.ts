export interface User {
  id: number;
  name: string;
  location: string;
  role: string;
}

export const getUserActions = async (id: number) => {
  await new Promise(res => setTimeout(res, 2000));
  return {
    id: id,
    name: 'Bryan',
    location: 'Ottawa Canada',
    role: 'Developer',
  }
}
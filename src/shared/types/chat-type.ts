export type TChat = {
  id: string;
  name: string;
  description: string;
};

export type TChatCreate = {
  userIds: string[];
  name?: string;
  description?: string;
};

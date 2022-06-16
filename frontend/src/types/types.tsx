export type Invitation = {
  id: string;
  sender: string;
  receiver: string;
  projects_id: string;
  created_at: Date;
  seen: boolean;
  firstname: string;
  lastname: string;
  project_name: string;
};

export type project = {
  id: string;
  name: string;
  description?: string | null | undefined;
  created_at: Date;
  favorite: string;
  status_id: string;
  status: string;
};

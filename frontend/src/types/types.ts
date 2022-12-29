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

export type task = {
  id: string;
  sections_id: string;
  priorityId: string;
  priorityName: string;
  sectionsName: string;
  statusId: string;
  statusName: string;
  title: string;
  description: string;
  start_date: Date;
  due_date: Date;
  budget: number;
  progress: number;
  created_at: Date;
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

export type member = {
  id: string;
  project_id: string;
  user_id: string;
  email: string;
  firstname: string;
  lastname: string;
  color: string;
};

export type section = {
  id: string;
  name: string;
};

export type session = {
  id: string;
  projects_id: string;
  name: string;
  date: Date;
  start: Date;
  end: Date;
  description: string | null | undefined;
  created_at: Date;
  place: string | null;
};

export type file = {
  id: string;
  projects_id: string;
  title: string;
  description: string;
  size: number;
  file_mimetype: string;
  created_at: Date;
  folders_id: string | null;
};

export type folder = {
  title: string;
  id: string;
  total_files: number;
};

export type tag = {
  id: string;
  projects_id: string;
  name: string;
  color: string;
};

export type time_record = {
  id: string;
  tasks_id: string;
  members_id: string;
  start: Date;
  end: Date;
  created_at: Date;
  total: number;
  description: string | null;
  task_title: string;
  section_name: string;
};

export type log = {
  id: string;
  projects_id: string;
  members_id: string;
  sender: string;
  type: string;
  title: string;
  text: string;
  created_at: Date;
  seen: string;
  comment: string | null;
  firstname: string;
  lastname: string;
  email: string;
  color: string;
};

export type option = {
  id: string;
  polls_id: string;
  text: string;
  total: number;
};

export type poll = {
  id: string;
  messages_id: string;
  question: string;
  created_at: Date;
  optionArray: option[];
};

export type message = {
  id: string;
  text: string;
  created_at: Date;
  firstname: string;
  lastname: string;
  color: string;
  pollData: poll[];
};

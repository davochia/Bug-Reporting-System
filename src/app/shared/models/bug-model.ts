import { IComment } from './bug-comment';

export interface IBugs {
  id?: string;
  title?: string;
  description?: string;
  priority?: number;
  reporter?: string;
  status?: string;
  updatedAt?: string;
  createdAt?: string;
  comments?: IComment[];
}

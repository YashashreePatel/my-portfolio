export interface IProject {
  name: string;
  completion_date: string;
  description: string;
  problem?: string;
  built?: string;
  impact?: string;
  tech_stack: string[];
  project_link?: string;
  image: string;
  image_source: string;
}

export interface ProjectTypeItem {
  _id: string;
  key: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface ProjectImage {
  _id?: string;
  img: string;
  public_id?: string;
}

export interface TechItem {
  _id?: string;
  tech: string;
  name: string;
}

export interface ProjectDuration {
  startingDate?: string;
  endingDate?: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  type: ProjectTypeItem;
  project_img: ProjectImage[];
  tech_list: TechItem[];
  visit_link: string;
  git_link: string;
  duration?: ProjectDuration;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface ProjectFilterOption {
  key: string;
  name: string;
}

export interface ExperienceDuration {
  joiningDate: string;
  leavingDate?: string;
}

export interface ExperienceSkill {
  _id: string;
  key: string;
  title: string;
}

export interface ExperienceItem {
  _id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  des: string;
  position: string;
  duration: ExperienceDuration;
  skills: ExperienceSkill[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface ExperiencesApiResponse {
  success: number;
  message: string;
  data: ExperienceItem[];
}


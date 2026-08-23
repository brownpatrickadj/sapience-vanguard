export type SiteContent = {
  key: string;
  value: Record<string, string>;
  updated_at: string;
  updated_by: string | null;
};

export type Project = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  why_text: string | null;
  accent_color: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type JobOpening = {
  id: string;
  title: string;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  description: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type ApplicationStatus =
  | "new"
  | "reviewing"
  | "interviewing"
  | "rejected"
  | "hired";

export type Application = {
  id: string;
  job_opening_id: string | null;
  position_title: string | null;
  applicant_name: string;
  email: string;
  phone: string | null;
  resume_path: string | null;
  cover_note: string | null;
  status: ApplicationStatus;
  submitted_at: string;
  reviewed_by: string | null;
  notes: string | null;
};

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: "admin";
  created_at: string;
};

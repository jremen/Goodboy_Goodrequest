export interface Shelter {
  id: number;
  name: string;
}

export interface SheltersResponse {
  shelters: Shelter[];
}

export interface Stats {
  contributors: number;
  contribution: number;
}

export interface ContributeContributor {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface ContributePayload {
  contributors: ContributeContributor[];
  shelterID: number | null;
  value: number;
}

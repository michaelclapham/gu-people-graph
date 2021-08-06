import { User } from "./index";
export interface ProductAndEngineeringStream {
    name: string;
    teams: ProductAndEngineeringTeam[];
}

export interface ProductAndEngineeringTeam {
    name: string;
    githubTeamSlug?: string;
    teamMembers?: User[];
}

export interface ProductAndEngineeringTeamMember {
    name: string;
    githubUsername: string;
    githubAvatarUrl: string;
}

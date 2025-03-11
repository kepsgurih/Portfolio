

export interface IWork {
    id?: string;
    created_at?: Date;
    title:string;
    period:string;
    company: string;
    location: string;
    description: string;
    tags: string[];
    achievement: string[];
    pos: number
}
export interface IWorkInput {
    id?: string;
    created_at?: Date;
    title:string;
    period:string;
    company: string;
    location: string;
    description: string;
    tags: string[];
    achievement: string[];
}

export interface IProject {
    id: number;
    created_at: Date;
    title: string;
    description: string;
    tags: string[];
    githubLink: string;
    demoLink: string;
    image: string;
}

export interface ISkill {
    id: string;
    created_at: Date;
    title: string;
    icon: string;
    tags: string[];
}
export interface ISkillInput {
    id?: string;
    title: string;
    icon: string;
    tags: string[];
}

export interface IMenu {
    title: string
    url: string
    icon: string
}

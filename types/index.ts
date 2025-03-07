

export interface IWork {
    id: number;
    created_at: Date;
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
    technologies: string[];
    achievements: string[];
    pos: number;
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
    id: number;
    created_at: Date;
    title: string;
    icon: string;
    skills: string[];
}

export interface IMenu {
    title: string
    url: string
    icon: string
}

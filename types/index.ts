

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

export interface IConfig {
    id?: string
    description: string
    whoami: string
    journey: string
    yearsExperience: number
    projectCompleted: number
    happyClient: number
    technologies: number
    socialMedia: Array<{
        url: string
        icon: string
    }>
    contactInfo: Array<{
        label: string
        value: string
        icon: string
    }>
    allowRegister: boolean
    code: number
    image?: string
    banner?: string
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
    id: string;
    title: string;
    description: string;
    tags: string[];
    githubLink: string;
    demoLink: string;
    image: string;
}

export interface IProjectInput {
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

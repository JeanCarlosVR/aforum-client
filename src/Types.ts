export interface InteractionUser {
    id: number
    date: number
}

export interface User {
    id: number | null
    username: string | null
    email: string | null
    created_at: number | null
    verified: boolean
    permissions: any[]
    profile: {
        display_name: string | null
        avatar: string | null
        description: string | null
        badges: any[]
        contact_mail: string | null
        contact_phone_number: {
            country_identificator: number | null
            number: number | null
        }
        social_networks: {
            twitter: string | null
            instagram: string | null
            youtube: string | null
            discord: string | null
            github: string | null
        }
        reputation: InteractionUser[]
        likes: InteractionUser[]
    }
    preferences: {
        receive_direct_messages: boolean
        blocked_users: number|any[]
    }
    posts: any[]
    security: {
        verification: {
            verified_email: boolean
            verified_number_phone: boolean
        }
    }
    logged: boolean
}

export enum ForumType {
    "only_admins_write" = 0,
    "only_vips_write" = 1,
    "everyone_write" = 2
}

export interface Comment {
    id: number
    author: {
        id: number
    }
    content: string
    created_at: number
}

export interface Thread {
    id: number
    author: {
        id: number
    }
    title: string
    description: string
    tags: string[]
    comments: Comment[]
    created_at: number
    forum: string
}

export interface ForumSchema {
    name: string
    type: 0
    threads: Thread[]
}
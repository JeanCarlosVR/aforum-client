import { gql } from '@apollo/client';

export async function getUser(apolloClient: any, token: string | null) {
    let _r: any = await apolloClient.query({
        variables: { token },
        query: gql`
            query Query0001($token: String) {
                getUser(token: $token) {
                    data
                }
            }
        `
    });

    return _r.data.getUser.data || null;
}

export async function getProfile(apolloClient: any, usernameOrID: string | number | null) {
    let _r: any = await apolloClient.query({
        variables: { usernameOrID },
        query: gql`
            query Query0002($usernameOrID: String) {
                getProfile(usernameOrID: $usernameOrID) {
                    data
                }
            }
        `
    });

    return _r.data.getProfile.data || null;
}

export async function signIn(apolloClient: any, data: {
    usernameOrEmail: string | null
    password: string | null
}) {
    let _r: any = await apolloClient.mutate({
        variables: {
            usernameOrEmail: `${data.usernameOrEmail}`,
            password: `${data.password}`
        },
        mutation: gql`
            mutation Mutation0002($usernameOrEmail: String, $password: String) {
                signIn(usernameOrEmail: $usernameOrEmail, password: $password) {
                    token
                    message
                    exited_code
                }
            }
        `
    });

    return _r.data.signIn || null;
}

export async function createUser(apolloClient: any, data: {
    username: string | null
    email: string | null
    password: string | null
    confirm_password: string | null
    pin: number | null
}) {
    let _r: any = await apolloClient.mutate({
        variables: {
            username: `${data.username}`,
            email: `${data.email}`,
            password: `${data.password}`,
            confirm_password: `${data.confirm_password}`,
            pin: `${data.pin}`
        },
        mutation: gql`
            mutation Mutation0001($username: String, $email: String, $password: String, $confirm_password: String, $pin: String) {
                createUser(username: $username, email: $email, password: $password, confirm_password: $confirm_password, pin: $pin) {
                    token
                    user
                    message
                    exited_code
                }
            }
        `
    });

    return _r.data.createUser || null;
}

export async function createThread(apolloClient: any, data: {
    token: string
    title: string
    description: string
    tags: string[],
    forum: string
}) {
    let _r: any = await apolloClient.mutate({
        variables: {
            token: `${data.token}`,
            title: `${data.title}`,
            description: `${data.description}`,
            tags: data.tags,
            forum: `${data.forum}`
        },
        mutation: gql`
            mutation Mutation0001($token: String, $title: String, $description: String, $tags: [String], $forum: String) {
                createThread(token: $token, title: $title, description: $description, tags: $tags, forum: $forum) {
                    message
                    exited_code
                }
            }
        `
    });

    return _r.data.createThread || null;
}
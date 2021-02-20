export const globalName = "Forum";
export const forums = [
    {
        name: "Announcements",
        description: "You can check this for new things on the forum",
        type: 0
    },
    {
        name: "Events",
        description: "Here we made events and giveaways",
        type: 0
    },
    {
        name: "General",
        description: "Chat about interesting topics with everyone",
        type: 0
    }
];

export const EmailRegex: any = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export function decode(data: string) {
    let _d = JSON.parse(Buffer.from(`${data}`, 'base64').toString()) || {};

    return _d;
}
import Images from './Images';

export default {
    home: `/`,
    signin: `/accounts/signin`,
    signup: `/accounts/signup`,
    threads: {
        _: `/threads`,
        popular: `/threads/popular`,
        new: `/threads/new`,
        hot: `/threads/hot`,
    },
    profile: {
        1: `/user`,
        2: `/profile`,
        3: `/u`
    },
    search: `/search`,
    forum: `/forum`,
    premium: `/premium`
}

export const default_profile_picture = `${Images.default_user_picture}`;
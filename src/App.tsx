import { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { getUser } from './graphql/Requests';
import { decode } from './Util';
import Images from './Images';
import { User } from './Types';
import URLs from './URL';

import Home from './pages/main/Home';

import SignUp from './pages/auth/Signup';
import SignIn from './pages/auth/Signin';

import UserProfile from './pages/user/Profile';

import Menu from './components/Menu';
import Footer from './components/Footer';

export interface Properties {
    apolloClient: ApolloClient<NormalizedCacheObject>
}
export interface State {
    user: User
    loading: boolean,
    error: {
        has: boolean
        message: string | null
    }
}
export default class App extends Component<Properties, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            user: {
                id: null,
                username: null,
                email: null,
                created_at: null,
                verified: false,
                permissions: [],
                profile: {
                    display_name: null,
                    avatar: null,
                    description: null,
                    badges: [],
                    contact_mail: null,
                    contact_phone_number: {
                        country_identificator: null,
                        number: null,
                    },
                    social_networks: {
                        twitter: null,
                        instagram: null,
                        youtube: null,
                        discord: null,
                        github: null,
                    },
                    reputation: [],
                    likes: []
                },
                preferences: {
                    receive_direct_messages: false,
                    blocked_users: [],
                },
                posts: [],
                security: {
                    verification: {
                        verified_email: false,
                        verified_number_phone: false
                    }
                },
                logged: false
            },
            loading: true,
            error: {
                has: false,
                message: null
            }
        }

        this.setLoading = this.setLoading.bind(this);
        this.setError = this.setError.bind(this);
    }

    public async componentDidMount() {
        if(window.localStorage.getItem("token")) {
            let _user: any = await getUser(this.props.apolloClient, window.localStorage.getItem("token"));
 
            if(_user) { 
                let _parsedUser = decode(`${_user}`);
                if(_parsedUser && _parsedUser.id) {
                    window.localStorage.setItem("info", JSON.stringify({
                        lastUserFetched: Date.now()
                    }));
                    _parsedUser.logged = true;

                    if(! _parsedUser.profile.avatar)  _parsedUser.profile.avatar = `${Images.default_user_picture}`;
                    await this.setState({
                        user: _parsedUser
                    });
                }
            }
        }

        this.setState({
            loading: false
        });
    }

    public async setLoading(data: {
        to: boolean
    }): Promise<void> {
        this.setState({
            loading: data.to
        });
    }

    public async setError(data: {
        to: boolean,
        message: string
    }): Promise<void> {
        this.setState({
            error: {
                has: data.to,
                message: `${data.message}`
            }
        });
    }

    public get getRouter() {
        return (
            <>
                <Router history={createBrowserHistory()}>
                    <Route exact path={`${URLs.home}`}>
                        <Menu user={this.state.user} />
                        <Home user={this.state.user} apolloClient={this.props.apolloClient} setError={this.setError} />
                        <Footer />
                    </Route>

                    <Route exact path={`${URLs.profile[1]}/:username`} component={(props: any) => {
                        return (
                            <>
                                <Menu user={this.state.user} />
                                <UserProfile apolloClient={this.props.apolloClient} setError={this.setError} match={props.match} />
                                <Footer />
                            </>
                        )
                    }}/>

                    <Route exact path={`${URLs.signup}`}>
                        <SignUp apolloClient={this.props.apolloClient} user={this.state.user} setLoading={this.setLoading} setError={this.setError} />
                        <Footer />
                    </Route>
                    <Route exact path={`${URLs.signin}`}>
                        <SignIn apolloClient={this.props.apolloClient} user={this.state.user} setLoading={this.setLoading} setError={this.setError} />
                        <Footer />
                    </Route>
                    
                    <Route exact path={`${URLs.forum}/:forumName`}>

                    </Route>
                </Router>
            </>
        );
    }

    public render(): React.ReactFragment {
        if (!this.state.loading && this.state.user && !this.state.error.has) {
            return (
                <>
                    {this.getRouter}
                </>
            );
        } else if (!this.state.loading && this.state.error.has && this.state.error.message) {
            return (
                <>
                    <h1>ERROR: {this.state.error.message || "Error inside another error? Wth?"}</h1>
                </>
            );
        } else {
            return (
                <>
                    loading...
                </>
            );
        }
    }
}
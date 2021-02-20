import { Component } from 'react';
import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client';
import { getProfile } from '../../graphql/Requests';
import { decode } from '../../Util';
import Images from '../../Images';
import { default_profile_picture } from '../../URL';
import { User } from '../../Types';
import '../../assets/css/pages/user/Profile.scss';

export interface Properties {
    apolloClient: ApolloClient<NormalizedCacheObject>
    setError: Function
    match: any
}
export interface State {
    user: User
    loading: boolean
    error: {
        has: boolean
        message: string | null
    }
}
export default class Profile extends Component<Properties, State> {
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
    }

    public async componentDidMount() {
        let user = decode(await getProfile(this.props.apolloClient, this.props.match.params["username"])) || null;
        if(!user || (user && !(user.id || user.username || user.profile || user.posts))) return this.props.setError({
            to: true,
            message: `unknown profile`
        });

        if(!user.profile.avatar) user.profile.avatar = `${default_profile_picture}`;
        
        this.setState({
            user,
            loading: false
        });
    }

    public render(): React.ReactFragment {
        if(this.state.user && this.state.user.id && !this.state.loading) {
            return (
                <>
                    <div className="profile-xUayM">
                        <div className="profile-container-aQy">
                            <div className="profile-header-rEzXm">
                                <div className="profile-user-picture-lQxY">
                                    <img id="profile-user-picture-aYxQ" src={this.state.user.profile.avatar || ""} alt="user profile picture" />
                                </div>
                                <div>
    
                                </div>
                                <div className="profile-username-NmQr">
                                    <div className="profile-username-item-TqE">
                                        <h1 id="profile-user-username-sYxM">{this.state.user.username} {this.state.user.verified ? <img id="profile-user-badge-verified-inline-for-username-AqJ" className="global-badge-verified-tQn" src={`${Images.badges.verified}`} alt="verified" loading="lazy" /> : ""}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="profile-xUayM">
                        <div className="profile-container-aQy">
                            <div className="profile-header-rEzXm">
                                <div className="profile-user-picture-lQxY">
                                    <span className="loading-input-QxN "></span>
                                </div>
                                <div>
    
                                </div>
                                <div className="profile-username-NmQr">
                                    <div className="profile-username-item-TqE">
                                        <span className="loading-input-QxN "></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
}
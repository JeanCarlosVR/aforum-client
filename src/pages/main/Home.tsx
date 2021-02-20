import { Component } from 'react';
import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client';
import { createThread, getForums } from '../../graphql/Requests';
import Images from '../../Images';
import { forums } from '../../Util';
import { User } from '../../Types';
import '../../assets/css/pages/main/Home.scss';

export interface Properties {
    user: User
    apolloClient: ApolloClient<NormalizedCacheObject>
    setError: Function
}
export interface State {
    forums: any[]
    error: {
        has: boolean
        message: string | null
    }
}
export default class Home extends Component<Properties, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            forums: [],
            error: {
                has: false,
                message: null
            }
        }
    }

    public async componentDidMount() {
        /*let _r = await createThread(this.props.apolloClient, {
            //@ts-ignore
            token: window.localStorage.getItem("token") || null,
            title: "hello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckershello motherfuckers",
            description: "testing",
            tags: ["fucker"],
            forum: "announcements"
        });*/
        let _r = await getForums(this.props.apolloClient);
        if(!_r) return this.props.setError({
            to: true,
            message: `There are no forums`
        });

        let _forums: any[] = [];
        for(let forum of _r) {
            let _rp = JSON.parse(forum);
            if(_rp && _rp.name) {
                _forums.push(_rp);   
            }
            console.log(_forums)
        }
        let _n = 0;
        for(let forum of _forums) {
            _n = _n + 1;
            _forums.push(<div className={`home-forum-list-forum-kQe ${_n != 1 ? "lIqVmGaXdPq" : ""}`} key={`${_n}`}>
            <section className="home-forum-list-forum-name-description-QwN">
                <div className="home-forum-icon-container-qN home-forum-container-Qe">
                    {forum.type === 0 &&
                        <img className="home-forum-icon-Qm" src={`${Images.icons.home.announcements}`} />
                    }
                </div>
                <div className="home-forum-name-description-container-bQC home-forum-container-Qe">
                    <h1 className="home-forum-name-yQt">{forum.name}</h1>
                    <br/>
                    <p className="home-forum-description-gAq">{forum.description}</p>
                    <span className="home-forum-last-post-QmR">
                        <img className="home-forum-last-post-avatar-iVn home-forum-last-post-element-YqN" src={`${this.props.user.profile.avatar}`} alt="last post user avatar" />
                        <p className="home-forum-last-post-text-xQc home-forum-last-post-element-YqN">{this.props.user.username} started a thread: <span>Hello motherfuckers</span></p>
                    </span>
                </div>
                <div className="home-forum-stats-container-QyE home-forum-container-Qe">
                    <div className="home-forum-stats-data-container-QnW">
                        <i className="home-forum-stats-icon-hQn fas fa-comments"></i>
                        <br />
                        <p className="home-forum-stats-text-uYq">{forum.threads || 0} Threads</p>
                    </div>
                    <div className="home-forum-stats-data-container-QnW">
                        <i className="home-forum-stats-icon-hQn fas fa-thumbs-up"></i>
                        <br />
                        <p className="home-forum-stats-text-uYq">{forum.likes || 0} Likes</p>
                    </div>
                    <div className="home-forum-stats-data-container-QnW">
                        <i className="home-forum-stats-icon-hQn fas fa-eye"></i>
                        <br />
                        <p className="home-forum-stats-text-uYq">{forum.views || 0} Views</p>
                    </div>
                </div>
            </section>
        </div>);
        }

        this.setState({
            forums: _forums
        });
    }

    public render(): React.ReactFragment {
        return (
            <>
                <div className="home-qTyM">
                    <div className="home-header-oLx">

                    </div>
                    <div className="home-content-Qr">
                        <div className="home-content-left-bQt">
                            <div className="home-forum-list-QuM">
                                {this.state.forums.map((e) => e)}
                            </div>
                        </div>
                        <div className="home-content-modules-mNq">
                            <div className="home-forum-module-kQe">
        
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
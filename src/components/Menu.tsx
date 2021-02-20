import { Component } from 'react';
import { Link } from 'react-router-dom';
import URLs from '../URL';
import Images from '../Images';
import { User } from '../Types';
import '../assets/css/components/Menu.scss';

export interface Properties {
    user: User
}
export interface State {}
export default class Menu extends Component<Properties, State> {

    private toggleBurger() {
        let _ = document.querySelector('.navbar-menu');
        if(!_) return;

        _.classList.toggle('is-active');

        return true;
    }

    public render(): React.ReactFragment {
        return (
            <>
                <div className="menu-xATqM">
                    <nav className="navbar-aKyMx navbar">
                        <div className="navbar-brand">
                            <Link to="/" className="navbar-item">
                                <img src={`${Images.logo}`} alt="brand logo" loading="eager" width="30px" height="30px" />
                            </Link>
                            <div className="navbar-burger" data-target="nav-bar-main-aIxYM" onClick={() => this.toggleBurger()}>
                            <span></span>
                            <span></span>
                            <span></span>
                            </div>
                        </div>

                        <div id="nav-bar-main-aIxYM" className="navbar-menu">
                            <div className="navbar-start">
                                <Link to={`${URLs.home}`} className="navbar-item">
                                    Home
                                </Link>
                                <Link to={`${URLs.threads._}`} className="navbar-item">
                                    Threads
                                </Link>
                                <Link to={`${URLs.search}`} className="navbar-item">
                                    Search
                                </Link>
                                <Link to={`${URLs.premium}`} className="navbar-item">
                                    Premium
                                </Link>
                            </div>

                            <div className="navbar-end">
                                <div className="navbar-item">
                                    {this.props.user.logged &&
                                        <div className="field is-grouped">
                                            <p className="control">
                                                <Link to={`${URLs.profile[1]}/${this.props.user.username}`} className="is-transparent">
                                                    <span className="icon">
                                                        <img id="menu-user-profile-qMer" src={`${this.props.user.profile.avatar}`} alt="user profile picture" />
                                                    </span>
                                                </Link>
                                            </p>
                                        </div>
                                    }
                                    {!this.props.user.logged &&
                                        <div className="field is-grouped">
                                            <p className="control">
                                                <Link to={`${URLs.signin}`} className="bd-tw-button button">
                                                    <span className="icon">
                                                        <i className="fas fa-key"></i>
                                                    </span>
                                                    <span>Sign In</span>
                                                </Link>
                                            </p>
                                            <p className="control">
                                                <Link to={`${URLs.signup}`} className="button is-primary">
                                                    <span className="icon">
                                                        <i className="fas fa-lock-alt"></i>
                                                    </span>
                                                    <span>Sign Up</span>
                                                </Link>
                                            </p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </nav>

                    
                </div>
            </>
        );
    }
}
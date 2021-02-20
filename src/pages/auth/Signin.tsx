import { Component } from 'react';
import { Link } from 'react-router-dom';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { signIn } from '../../graphql/Requests';
import { User } from '../../Types';
import URLs from '../../URL';
import { globalName } from '../../Util';
import '../../assets/css/pages/auth/Signin.scss';

export interface Properties {
    apolloClient: ApolloClient<NormalizedCacheObject>
    user: User
    setLoading: Function
    setError: Function
}
export interface State {
    data: {
        usernameOrEmail: string | null
        password: string | null
    }
    error: {
        has: boolean
        message: string | null
    }
}
export default class Signin extends Component<Properties, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            data: {
                usernameOrEmail: null,
                password: null,
            },
            error: {
                has: false,
                message: null
            }
        }
    }

    public async componentDidMount() {
        document.title = `Accounts`;

        let _sessionToken = window.localStorage.getItem("token") || null;
        let _id = window.localStorage.getItem("id") || null;
        if(_sessionToken && _id) return window.location.assign(`/logged`);

        let _button: any = document.getElementById("signin-button-signin-sAyxM");
        if(_button) {
            _button.disabled = true;
        }

        this.props.setLoading({
            to: false
        });
    }

    public async login(data: {
        usernameOrEmail: string | null
        password: string | null
    }): Promise<any> {

        let _button: any = document.getElementById("signin-button-signin-sAyxM");
        if(_button) {
            _button.classList.add("is-loading");
        }
    
        let _signIn: any = await signIn(this.props.apolloClient, data);

        _button.classList.remove("is-loading");
        if(_signIn.token && _signIn.exited_code === 0) {
            window.localStorage.setItem("token", `${_signIn.token}`);
        } else {
            if(!_signIn.message) return this.props.setError({
                to: true,
                message: "Invalid response from server."
            });

            return this.setState({
                error: {
                    has: true,
                    message: `${(_signIn.message.slice(0, 1).toUpperCase() + _signIn.message.slice(1)) || "Unknown error."}`
                }
            });
        }

        return window.location.assign(`${URLs.home}`);
    }

    public async onChange(event: any) {
        let _button: any = document.getElementById("signin-button-signin-sAyxM");
        if(_button && typeof (this.state.data.usernameOrEmail && this.state.data.password) === "string") {
            _button.disabled = false;
        } else {
             _button.disabled = true;
        }

        if(!event.target.value.length || (event.target.value.length && event.target.value.length <= 0)) event.target.value = null;
        this.setState((props: any) => ({
            ...props,
            data: {
                ...props.data,
                [event.target.name]: event.target.value || null
            }
        }));
    }

    public render(): React.ReactFragment {
        return (
            <>
                <div className="signin-main-container-uAtxH">
                    <div className="signin-form-container-sYxn">
                        <div className="signin-form-header-section-xAusM">
                            <p id="signin-form-header-title-uAy">{globalName}</p>
                            <br />
                        </div>
                        <div className="signin-form-inputs-section-yAtz">
                            <div className="signin-form-error-UySm">
                                <p>{this.state.error.has && this.state.error.message}</p>
                            </div>
                            <div className="signin-form-input-aUm">
                                <input className="input-style-xyRm-unique input" id="signup-input-usernameOrEmail-zYqrN" type="text" name="usernameOrEmail" placeholder="Username or Email" maxLength={120} onChange={(event) => this.onChange(event)} />
                            </div>

                            <div className="signin-form-input-aUm">
                                <input className="input-style-xyRm input" id="signin-input-password-zYqrN" type="password" name="password" placeholder="Password" maxLength={500} onChange={(event) => this.onChange(event)} />
                            </div>
                        </div>
                        <div className="signin-submit-button-xSy buttons">
                            <button id="signin-button-signin-sAyxM" className="button" onClick={() => this.login(this.state.data)}>Sign In</button>
                        </div>
                    </div>

                    <div className="signin-forget-password-aYxN">
                        <div className="signin-forget-password-container-tArx">
                            <Link className="signin-forget-password-text-sYxm" to="/accounts/forget/password">Forget your password?</Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
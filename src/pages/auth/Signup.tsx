import { Component } from 'react';
import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client';
import { createUser } from '../../graphql/Requests';
import { User } from '../../Types';
import URLs from '../../URL';
import { globalName, EmailRegex, decode } from '../../Util';
import '../../assets/css/pages/auth/Signup.scss';

export interface Properties {
    apolloClient: ApolloClient<NormalizedCacheObject>
    user: User
    setLoading: Function
    setError: Function
}
export interface State {
    data: {
        username: string | null
        email: string | null
        password: string | null
        confirm_password: string | null
        pin: number | null
    }
    labels: {
        username: string | null
        email: string | null
        password: string | null
        confirm_password: string | null
        pin: string | null
    }
    error: {
        has: boolean
        message: string | null
    }
}
export default class Signup extends Component<Properties, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            data: {
                username: null,
                email: null,
                password: null,
                confirm_password: null,
                pin: null
            },
            labels: {
                username: null,
                email: null,
                password: null,
                confirm_password: null,
                pin: null
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

        let _button: any = document.getElementById("signup-button-signup-uAYxm");
        if(_button) {
            _button.disabled = true;
        }
        this.props.setLoading({
            to: false
        });
    }

    public async register(data: {
        username: string | null
        email: string | null
        password: string | null
        confirm_password: string | null
        pin: number | null
    }): Promise<any> {

        let _button: any = document.getElementById("signup-button-signup-uAYxm");
        if(_button) {
            _button.classList.add("is-loading");
        }
    
        let _createUser: any = await createUser(this.props.apolloClient, data);
        _button.classList.remove("is-loading");
        if(_createUser.token && _createUser.exited_code === 0) {

            _createUser.user = decode(`${_createUser.user}`);
            if(!_createUser.user || (_createUser.user && !_createUser.user.id)) return this.props.setError({
                to: true,
                message: `invalid response from server`
            });

            window.localStorage.setItem("token", `${_createUser.token}`);
            window.localStorage.setItem("id", `${_createUser.user.id}`);

            return window.location.assign(`${URLs.home}`);
        } else {
            if(!_createUser.message) return this.props.setError({
                to: true,
                message: "invalid response from server."
            });

            return this.setState({
                error: {
                    has: true,
                    message: `${(_createUser.message.slice(0, 1).toUpperCase() + _createUser.message.slice(1)) || "Unknown error."}`
                }
            });
        }
    }

    public async switchLabelError(data: { 
        input: string
        label: string
        labelID: string
        to: boolean
        error: any
    }) {

        const _input: any = document.getElementById(`signup-input-${data.input}-zYqrN`);
        const _label: any = document.getElementById(`${data.labelID}`);
        if(!_input) return;
        if(!_label) return;

        await this.setState((props) => ({
            ...props,
            labels: {
                ...props.labels,
                [data.label]: data.error
            }
        }));

        if(data.to) {
            _input.classList.add("is-danger");
            _input.classList.remove("is-success");
        } else {
            _input.classList.add("is-success");
            _input.classList.remove("is-danger");
        }

        let _button: any = document.getElementById("signup-button-signup-uAYxm");
        if(_button && typeof (this.state.data.username && this.state.data.email && this.state.data.password && this.state.data.confirm_password && this.state.data.pin) === "string" && !(this.state.labels.username && this.state.labels.email && this.state.labels.password && this.state.labels.confirm_password && this.state.labels.pin)) {
            _button.disabled = false;
        } else {
             _button.disabled = true;
        }
        return _label.style.display = data.to === true ? "block" : "none";
    }

    public async onChange(event: any) {
        const _verifyPassword = async (): Promise<boolean> => {
            if(event.target.value.length < 6) {
                await this.switchLabelError({
                    input: "password",
                    label: "password",
                    labelID: `label-for-signup-input-password-zYqrN`,
                    to: true,
                    error: `The password must be longer than 6 characters`
                });

                return true;
            } else if(event.target.value.length > 500) {
                 await this.switchLabelError({
                    input: "password",
                    label: "password",
                    labelID: `label-for-signup-input-password-zYqrN`,
                    to: true,
                    error: `The password must be shorter than 500 characters`
                });

                return true;
            } else {
                await this.switchLabelError({
                    input: "password",
                    label: "password",
                    labelID: `label-for-signup-input-password-zYqrN`,
                    to: false,
                    error: null
                });
            }

            return true;
        }

        const _verifyConfirmedPasword = (_old?: string | null, _new?: string | null) => {
            if((_old || event.target.value) !== (_new || this.state.data.password)) return this.switchLabelError({
                    input: "confirm-password",
                    label: "confirm_password",
                    labelID: `label-for-signup-input-confirm-password-zYqrN`,
                    to: true,
                    error: `The password doesn't match`
                });
            else this.switchLabelError({
                    input: "confirm-password",
                    label: "confirm_password",
                    labelID: `label-for-signup-input-confirm-password-zYqrN`,
                    to: false,
                    error: null
            });
        }

        switch (event.target.name) {
            case "username":
                if(!/^[A-Za-z0-9_-]*$/g.test(event.target.value)) {
                    return this.switchLabelError({
                        input: "username",
                        label: "username",
                        labelID: `label-for-signup-input-username-zYqrN`,
                        to: true,
                        error: "Username only can be contain letters, numbers and undescores."
                    });
                } else this.switchLabelError({
                    input: "username",
                    label: "username",
                    labelID: `label-for-signup-input-username-zYqrN`,
                    to: false,
                    error: null
                });
                break;
            case "email":
                if(!EmailRegex.test(`${event.target.value}`)) {
                    return this.switchLabelError({
                        input: "email",
                        label: "email",
                        labelID: `label-for-signup-input-email-zYqrN`,
                        to: true,
                        error: `Invalid email`
                    });
                } else this.switchLabelError({
                    input: "email",
                    label: "email",
                    labelID: `label-for-signup-input-email-zYqrN`,
                    to: false,
                    error: null
                });

                break;
            case "password":
                await _verifyPassword();


                if(this.state.data.confirm_password && this.state.data.confirm_password.length && this.state.data.confirm_password.length >= 1) {
                    _verifyConfirmedPasword(this.state.data.confirm_password, event.target.value);
                }

                break;
            case("confirm_password"):
                _verifyConfirmedPasword();
                break;
            case("pin"):
                if(event.target.value < 1 || event.target.value > 9999) {
                    this.switchLabelError({
                        input: "pin",
                        label: "pin",
                        labelID: `label-for-signup-input-pin-zYqrN`,
                        to: true,
                        error: `The pin range is 1-9999`
                    });
                } else {
                    this.switchLabelError({
                        input: "pin",
                        label: "pin",
                        labelID: `label-for-signup-input-pin-zYqrN`,
                        to: false,
                        error: null
                    });
                }

                break;
        }

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
                <div className="signup-main-container-xkaUyM">
                    <div className="signup-form-container-iyTzm">
                        <div className="signup-form-header-section-zuSm">
                            <p id="signup-form-header-title-uAy">{globalName}</p>
                            <br />
                        </div>
                        <div className="signup-form-inputs-section-yAtz">
                            <div className="signup-form-error-UySm">
                                <p>{this.state.error.has && this.state.error.message}</p>
                            </div>
                            <div className="signup-form-input-aUm">
                                <input className="input-style-xyRm-unique input" id="signup-input-username-zYqrN" type="text" name="username" placeholder="Username" maxLength={20} onChange={(event) => this.onChange(event)} />

                                <label className="signup-label-style-xKamQ" id="label-for-signup-input-username-zYqrN" htmlFor="signup-input-username-zYqrN">{this.state.labels.username || ""}</label>
                            </div>
                            <div className="signup-form-input-aUm">
                                <input className="input-style-xyRm input" id="signup-input-email-zYqrN" type="text" name="email" placeholder="Email" maxLength={120} onChange={(event) => this.onChange(event)} />

                                <label className="signup-label-style-xKamQ" id="label-for-signup-input-email-zYqrN" htmlFor="signup-input-email-zYqrN">{this.state.labels.email || ""}</label>
                            </div>

                            <div className="signup-form-input-aUm">
                                <input className="input-style-xyRm input" id="signup-input-password-zYqrN" type="password" name="password" placeholder="Password" maxLength={500} onChange={(event) => this.onChange(event)} />

                                <label className="signup-label-style-xKamQ" id="label-for-signup-input-password-zYqrN" htmlFor="signup-input-password-zYqrN">{this.state.labels.password || ""}</label>
                            </div>
                            <div className="signup-form-input-aUm">
                                <input className="input-style-xyRm input" id="signup-input-confirm-password-zYqrN" type="password" name="confirm_password" placeholder="Confirm Password" maxLength={100} onChange={(event) => this.onChange(event)} />

                                <label className="signup-label-style-xKamQ" id="label-for-signup-input-confirm-password-zYqrN" htmlFor="signup-input-confirm-password-zYqrN">{this.state.labels.confirm_password || ""}</label>
                            </div>

                            <div className="signup-form-input-aUm">
                                <input className="input-style-xyRm input" id="signup-input-pin-zYqrN" type="text" name="pin" placeholder="Pin" maxLength={4} onChange={(event) => this.onChange(event)} />

                                <label className="signup-label-style-xKamQ" id="label-for-signup-input-pin-zYqrN" htmlFor="signup-input-pin-zYqrN">{this.state.labels.pin || ""}</label>
                            </div>
                        </div>
                        <div className="signup-submit-button-xSy buttons">
                            <button id="signup-button-signup-uAYxm" className="button" onClick={() => this.register(this.state.data)}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
import { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/components/Footer.scss';

export interface Properties {}
export interface State {}
export default class Footer extends Component<Properties, State> {
    public render(): React.ReactFragment {
        return (
            <>
                <div className="footer-uXnQm">
                    <section className="footer-elements-SyM">
                        <Link className="footer-element-href-xUysm" to="/about">
                            <span className="footer-element-text-xYsM">About</span>
                        </Link>
                        <Link className="footer-element-href-xUysm" to="/blog">
                            <span className="footer-element-text-xYsM">Blog</span>
                        </Link>
                        <Link className="footer-element-href-xUysm" to="/jobs">
                            <span className="footer-element-text-xYsM">Jobs</span>
                        </Link>
                        <Link className="footer-element-href-xUysm" to="/help">
                            <span className="footer-element-text-xYsM">Help</span>
                        </Link>
                        <Link className="footer-element-href-xUysm" to="/business">
                            <span className="footer-element-text-xYsM">Business</span>
                        </Link>
                        <Link className="footer-element-href-xUysm" to="/help/api">
                            <span className="footer-element-text-xYsM">API</span>
                        </Link>
                        <Link className="footer-element-href-xUysm" to="/privacy">
                            <span className="footer-element-text-xYsM">Privacy</span>
                        </Link>
                        <Link className="footer-element-href-xUysm" to="/terms">
                            <span className="footer-element-text-xYsM">Terms</span>
                        </Link>
                        <Link className="footer-element-href-xUysm" to="/threads">
                            <span className="footer-element-text-xYsM">Threads</span>
                        </Link>
                        <Link className="footer-element-href-xUysm" to="/top/users">
                            <span className="footer-element-text-xYsM">Top Users</span>
                        </Link>
                    </section>
                </div>
            </>
        );
    }
}
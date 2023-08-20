import React from "react";
import { Link } from "react-router-dom";
import '../styles/LandingPage.css';
import linkedin from '../styles/img/linkedin.png';
import github from '../styles/img/github.png';
import correo from '../styles/img/correo.png';


export default function landingPage() {
    return (
        <div id="contentLanding">
            <div>
                <div>
                    <h1>Dogypedia</h1>
                    <p><img src='https://i.pinimg.com/originals/de/14/1a/de141ac94bf118f396a4ba4cc8f0ae2d.gif' alt='' id="gif"></img></p>
                    <Link to='/home'>
                        <button id="btnLanding">WELCOME</button>
                    </Link>
                </div>
                <div className="links">
                    <aside>
                        <a href="https://www.linkedin.com/in/paula-yedro-200479222/" target="_blank" rel="noreferrer">
                            <img src={linkedin} alt='linkedin' className="icon"></img>
                        </a>
                        <a href="https://github.com/pauyedro" target="_blank" rel="noreferrer">
                            <img src={github} alt='github' className="icon"></img>
                        </a>
                        <a href="mailto:pawyedro@gmail.com" target="_blank" rel="noreferrer">
                            <img src={correo} alt='correo' className="icon"></img>
                        </a>
                    </aside>
                </div>
            </div>
        </div>
    )
}
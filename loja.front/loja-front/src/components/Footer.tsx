import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"
import "../styles/footer.css";

export function Footer(){

    return(
        <footer className="text-center text-white info">

            <div className="container p-4 pb-0">

                <section className="mb-4">

                    {/* Google */}
                    <a
                        className="btn btn-primary btn-floating m-1 google"
                        href="#!"
                        role="button"
                        ><FontAwesomeIcon icon={faGoogle} />
                    </a>

                    {/* Linkedin */}
                    <a
                        className="btn btn-primary btn-floating m-1 linkedin"
                        href="#!"
                        role="button"
                        ><FontAwesomeIcon icon={faLinkedin} />
                    </a>

                    {/* Github */}
                    <a
                        className="btn btn-primary btn-floating m-1 github"
                        href="#!"
                        role="button"
                        ><FontAwesomeIcon icon={faGithub} />
                    </a>
                </section>
            </div>

            <div className="text-center p-3 copyright">
                Isaque de Oliveira Dornelas Barbosa -
                <a className="text-white" href="https://www.base2.com.br/"> Base 2</a>
            </div>

        </footer>
    );
}
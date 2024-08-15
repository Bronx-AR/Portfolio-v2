import React from 'react'
import { footerData } from './FooterData';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="pb-4">
                <div className="container-fluid">
                    <div className="row g-1">
                        <div className="col-12 col-sm-6 text-center text-sm-start">
                            <p>&copy; {currentYear} {footerData.name}, {footerData.copyWriteText}</p>
                        </div>
                        <div className="col-12 col-sm-6 text-center text-sm-end">
                            <a className="scrolltotop sm-heading link-hover" href="#">Back to Top</a>
                        </div>
                    </div> {/* end row */}
                </div> {/* end container-fluid */}
            </div>
        </footer>
    )
}

export default Footer
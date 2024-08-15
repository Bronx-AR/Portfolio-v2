import React from 'react'
import { contactData } from './ContactData'

const ContactInfo = () => {
    return (
        <div className="section-sm">
            <div className="container-fluid text-center">
                <h1 className="display-1 fw-normal fst-italic text-black-02 mb-0"><span className="d-inline-block">{contactData.contactInfo.title}</span><span className="d-inline-block">{contactData.contactInfo.emailDomain}</span></h1>
            </div> {/*end container-fluid --> */}
        </div>
    )
}

export default ContactInfo
import React, { useState } from 'react';
import { contactData } from './ContactData';
import { Map } from '..';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        subject: '',
    });

    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitStatus('pending');

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.status === 200) {
            setSubmitStatus('success');
        } else {
            setSubmitStatus('error');
        }
    };

    return (
        <>
            <div className="section-xs">
                <div className="container-fluid text-center">
                    <h1 className="display-1 fw-medium mb-0">{contactData.mainData.title}</h1>
                </div>
            </div>

            {/* Contact Info */}
            <div className="container-fluid">
                <div className="row g-4 icon-3xl">
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="d-flex align-items-center mb-1">
                            <div className="d-inline-block pe-3">
                                <i className="bi bi-telephone text-black-02"></i>
                            </div>
                            <h2 className="fw-medium fst-italic text-black-02 mb-0">Phone</h2>
                        </div>
                        <p>{contactData.mainData.phone}</p>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="d-flex align-items-center mb-1">
                            <div className="d-inline-block pe-3">
                                <i className="bi bi-envelope text-black-02"></i>
                            </div>
                            <h2 className="fw-medium fst-italic text-black-02 mb-0">Email</h2>
                        </div>
                        <p>{contactData.mainData.email}</p>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="d-flex align-items-center mb-1">
                            <div className="d-inline-block pe-3">
                                <i className="bi bi-whatsapp text-black-02"></i>
                            </div>
                            <h2 className="fw-medium fst-italic text-black-02 mb-0">Whatsapp</h2>
                        </div>
                        <p>{contactData.mainData.whatsapp}</p>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="d-flex align-items-center mb-1">
                            <div className="d-inline-block pe-3">
                                <i className="bi bi-geo-alt text-black-02"></i>
                            </div>
                            <h2 className="fw-medium fst-italic text-black-02 mb-0">Address</h2>
                        </div>
                        <p>{contactData.mainData.address}</p>
                    </div>
                </div> {/* end row */}
            </div> {/* end container-fluid */}
            {/* end Contact Info */}


            {/* Maps & Contact Form */}
            <div className="section-sm">
                <div className="container-fluid">
                    <div className="row g-5">
                        <div className="col-12 col-lg-6">
                            <Map />
                        </div>
                        <div className="col-12 col-lg-6">
                            {/* Contact Form */}
                            <div className="contact-form text-xl-end">
                                <form method="post" id="contactform" onSubmit={handleSubmit}>
                                    <div className="row gx-3 gy-0">
                                        <div className="col-12 col-md-6">
                                            <input type="text" id="name" name="name" placeholder="Name" required />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <input type="email" id="email" name="email" placeholder="E-Mail" required />
                                        </div>
                                    </div>
                                    <input type="text" id="subject" name="subject" placeholder="Subject" required />
                                    <textarea name="message" id="message" placeholder="Message"></textarea>
                                    <button className={`button button-dot ${submitStatus === 'pending' ? 'non-disabled' : ''}`} type="submit" disabled={submitStatus === 'pending'}>
                                        <span data-text="Send Message">Send Message</span>
                                    </button>
                                </form>
                                {/* Submit result */}
                                <div className="submit-result">
                                    {submitStatus === 'success' && (
                                        <span id="success">Thank you! Your Message has been sent.</span>
                                    )}
                                    {submitStatus === 'error' && (
                                        <span id="error">Something went wrong. Please try again!</span>
                                    )}
                                </div>
                            </div> {/* end contact-form */}
                        </div>
                    </div> {/* end row */}
                </div>
            </div>
            {/* end Maps & Contact Form */}
        </>
    );
};

export default Contact;

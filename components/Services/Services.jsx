import React from 'react'
import { servicesData } from './ServicesData'

const Services = () => {
    return (
        <div className="section">
            <div className="container-fluid">
                <div className="row g-5 icon-3xl">
                    {servicesData.services.map((item, index) => (
                        <div key={index} className="col-12 col-lg-4">
                            <div className="col-12">
                                <h6 className="sm-heading">{item.number}.</h6>
                                <div className="d-flex align-items-center mb-2">
                                    <div className="d-inline-block pe-3">
                                        <i className={`${item.bootstrapIcon} text-black-02`}></i>
                                    </div>
                                    <h2 className="fw-medium fst-italic text-black-02 mb-0">{item.title}</h2>
                                </div>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div> {/* end row */}
            </div> {/* end container */}
        </div>
    )
}

export default Services
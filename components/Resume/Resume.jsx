import React from 'react'
import { resumeData } from './ResumeData'

const Resume = () => {
    return (
        <div className="container-fluid">
            <span></span>
            <div className="row custom-spacing">
                <div className="col-12 col-xl-6 custom-col">
                    <h2 className="display-5 fw-medium mb-4 text-center">{resumeData.mainData.title}</h2>
                    {/* Education box  */}
                    {resumeData.educations.map((item, index) => (
                        <div key={index} className={`styled-box ${index % 2 !== 0 ? 'style-2' : ''}`}>
                            <h6 className="sm-heading">{item.date}</h6>
                            <h4 className="mt-2">{item.title}</h4>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
                <div className="col-12 col-xl-6 custom-col">
                    <h2 className="display-5 fw-medium mb-4 text-center">{resumeData.mainData.title2}</h2>
                    {/* Experience box */}
                    {resumeData.experiences.map((item, index) => (
                        <div key={index} className={`styled-box ${index % 2 === 0 ? 'style-2' : ''}`}>
                            <h6 className="sm-heading">{item.date}</h6>
                            <h4 className="mt-2">{item.title}</h4>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>{/* end row */}
        </div>
    )
}

export default Resume
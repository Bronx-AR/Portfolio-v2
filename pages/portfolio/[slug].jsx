import React, { useState } from 'react'
import { Lightbox } from '@/components'
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import { portfolioData } from '@/components/Portfolio/PortfolioData';

const ProjectPage = ({ project, prevProject, nextProject }) => {
    const [lightboxImage, setLightboxImage] = useState(null);

    const openLightbox = (image) => {
        setLightboxImage(image);
    };

    const closeLightbox = () => {
        setLightboxImage(null);
    };

    return (
        <>
            <Head>
                <title>{project.title}</title>
                <meta name="description" content={project.description} />
                <meta name="keywords" content={project.keywords} />
            </Head>

            <main>
                <div className="section-xs">
                    <div className="container-fluid text-center">
                        <h1 className="display-1 fw-medium mb-0">{project.title}</h1>
                    </div>
                </div>

                {/* Project Info */}
                <div className="section-xs pt-0">
                    <div className="container-fluid">
                        <div className="row g-0 g-lg-5 align-items-end">
                            <div className="col-12 col-lg-6 order-lg-1 col-xl-3">
                                <div className="styled-box">
                                    <h5>Services:</h5>
                                    <p>{project.services}</p>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 order-lg-3 col-xl-3">
                                <div className="styled-box style-2">
                                    <h5>Project Link:</h5>
                                    <a className="link-hover" href={project.projectLink.url}>{project.projectLink.title}</a>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 order-lg-2 col-xl-3">
                                <div className="styled-box">
                                    <h5>Client:</h5>
                                    <p>{project.client}</p>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 order-lg-4 col-xl-3">
                                <div className="styled-box style-2">
                                    <h5>Duration:</h5>
                                    <span>{project.duration}</span>
                                </div>
                            </div>
                        </div>{/* end row */}
                    </div>{/* end container-fluid */}
                </div>
                {/* end Project Info */}

                {/* Project text */}
                <div className="section-xs pt-0">
                    <div className="container-fluid">
                        <div className="fs-3" dangerouslySetInnerHTML={{ __html: project.content }} />
                    </div>{/* end container-fluid */}
                </div>
                {/* end Project text */}

                {/* project Media */}
                <div className="section-xs pt-0">
                    <div className="container-fluid">
                        <div className="row custom-spacing">
                            {project.images.map((item, index) => (
                                <div key={index} className="col-12 col-md-6 custom-col">
                                    <Image src={item.image} alt={item.alt} className="w-100" />
                                </div>
                            ))}

                            {/* Images Lightbox */}
                            {project.imagesLightbox.map((item, index) => (
                                <div key={index} className="col-12 col-md-6 custom-col">
                                    <div className="lightbox-item" onClick={() => openLightbox(item.image)}>
                                        <div className="glightbox">
                                            <Image src={item.image} alt={item.alt} placeholder="blur" />
                                            <div className="lightbox-icon">
                                                <i className="bi bi-arrows-fullscreen"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>{/* end row */}
                    </div>{/* end container-fluid */}
                </div>
                {/* end project Media */}

                {/* Prev/Next project */}
                <div className="section-xs pt-0">
                    <div className="container-fluid">
                        <div className="row">
                            {prevProject ? (
                                <div className="col-6">
                                    <Link href={`/portfolio/${prevProject.slug}`} className="button button-outline">
                                        <span data-text="Prev project">Prev Project</span>
                                    </Link>
                                </div>
                            ) : (
                                <div className="col-6">
                                    <button className="button button-outline non-disabled" disabled>
                                        <span data-text="Prev project">Prev Project</span>
                                    </button>
                                </div>
                            )}
                            {nextProject ? (
                                <div className="col-6 text-end">
                                    <Link href={`/portfolio/${nextProject.slug}`} className="button button-outline">
                                        <span data-text="Next project">Next Project</span>
                                    </Link>
                                </div>
                            ) : (
                                <div className="col-6 text-end">
                                    <button className="button button-outline non-disabled" disabled>
                                        <span data-text="Next project">Next Project</span>
                                    </button>
                                </div>
                            )}
                        </div>{/* end row */}
                    </div>{/* end container-fluid */}
                </div>
                {/* end Prev/Next project */}
                {lightboxImage && (
                    <Lightbox image={lightboxImage} closeLightbox={closeLightbox} />
                )}
            </main>
        </>
    )
}

export async function getStaticPaths() {
    // Generate paths for all your portfolio project
    const paths = portfolioData.projects.map((project) => ({
        params: { slug: project.slug },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const slug = params.slug;

    // Search for the portfolio project with the matching slug
    const project = portfolioData.projects.find((project) => project.slug === slug);

    if (!project) {
        return {
            notFound: true,
        };
    }

    const currentIndex = portfolioData.projects.findIndex((p) => p.slug === slug);
    const prevProject = currentIndex > 0 ? portfolioData.projects[currentIndex - 1] : null;
    const nextProject = currentIndex < portfolioData.projects.length - 1 ? portfolioData.projects[currentIndex + 1] : null;

    return {
        props: {
            project,
            prevProject,
            nextProject,
        },
    };
}


export default ProjectPage
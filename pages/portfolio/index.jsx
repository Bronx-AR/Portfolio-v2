import React, { useState } from 'react'
import { portfolioData } from '@/components/Portfolio/PortfolioData';
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'

const PortfolioPage = () => {
    const [selectedFilter, setSelectedFilter] = useState('');

    const filteredProjects = selectedFilter === ''
        ? portfolioData.projects
        : portfolioData.projects.filter((item) => item.category.toLowerCase() === selectedFilter);

    return (
        <>
            <Head>
                <title>{portfolioData.seoPage.title}</title>
                <meta name="description" content={portfolioData.seoPage.description} />
                <meta name="keywords" content={portfolioData.seoPage.keywords} />
            </Head>
            <main>
                <div className="section-xs">
                    <div className="container-fluid text-center">
                        <h1 className="display-1 fw-medium mb-0">My Latest Works</h1>
                    </div>
                </div>
                {/* Portfolio section */}
                <div className="pb-5">
                    <div className="container-fluid">
                        <div className="filter text-center mb-4">
                            <ul>
                                <li
                                    onClick={() => setSelectedFilter('')}
                                    className={selectedFilter === '' ? 'mixitup-control-active' : ''}
                                >
                                    Show All
                                </li>
                                {portfolioData.navigationList.map((listItem, index) => (
                                    <li
                                        key={index}
                                        onClick={() => setSelectedFilter(listItem.dataFilter.slice(1))}
                                        className={selectedFilter === listItem.dataFilter.slice(1) ? 'mixitup-control-active' : ''}
                                    >
                                        {listItem.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="row portfolio-grid custom-spacing">
                            {filteredProjects.map((item, index) => (
                                <div key={index} className="col-12 col-md-6 portfolio-item category-1">
                                    <div className="portfolio-box" data-hover-caption={item.title}>
                                        <Link href={`/portfolio/${item.slug}`}>
                                            <div className="portfolio-img">
                                                <Image src={item.mainImage} alt={item.title} />
                                            </div>
                                            {/* Mobile Caption */}
                                            <div className="portfolio-mobile-caption">
                                                <h4>{item.title}</h4>
                                                <span>{item.category}</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> {/* end container-fluid */}
                </div>
                {/* end Portfolio section */}

            </main>
        </>
    )
}

export default PortfolioPage
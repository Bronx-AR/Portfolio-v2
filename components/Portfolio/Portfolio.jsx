import React from 'react';
import { portfolioData } from './PortfolioData';
import Image from 'next/image';
import Link from 'next/link';


const Portfolio = () => {
    return (
        <div className="container-fluid">
            <div className="row portfolio-grid custom-spacing">
                {/* Portfolio Item */}
                {portfolioData.projects.map((item, index) => (
                    item.trending && (
                        <div key={index} className="col-12 col-md-6 portfolio-item">
                            <div className="portfolio-box" data-hover-caption={item.title}>
                                <Link href={`portfolio/${item.slug}`}>
                                    <div className="portfolio-img">
                                        <Image src={item.mainImage} alt={item.title} placeholder="blur" />
                                    </div>
                                    {/* Mobile Caption */}
                                    <div className="portfolio-mobile-caption">
                                        <h4>{item.title}</h4>
                                        <span>{item.category}</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )
                ))}
            </div> {/* end row */}
            <div className="text-center">
                <Link className="button button-lg button-outline mt-4 mt-md-5" href="/portfolio">View All Works</Link>
            </div>
        </div>
    )
}

export default Portfolio
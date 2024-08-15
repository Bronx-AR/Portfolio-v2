import Head from 'next/head'
import { mainData } from '@/lib/data'
import { About, Clients, ContactInfo, Portfolio, Resume, Services } from '@/components'

export default function Home() {
    return (
        <>
            <Head>
                <title>{mainData.websiteTitle}</title>
                <meta name="description" content={mainData.description} />
                <meta name="keywords" content={mainData.keywords} />
            </Head>
            <main>
                {/* About section */}
                <About />
                {/* Portfolio section */}
                <Portfolio />
                {/* Services section */}
                <Services />
                {/* Clients section */}
                <Clients />
                {/* Resume section */}
                <Resume />
                {/* Contact Info section */}
                <ContactInfo />
                {/* Footer section */}
            </main>
        </>
    )
}

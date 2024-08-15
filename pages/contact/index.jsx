import React from 'react'
import Head from 'next/head'
import { Contact } from '@/components'
import { contactData } from '@/components/Contact/ContactData'

const ContactPage = () => {
    return (
        <>
            <Head>
                <title>{contactData.seoPage.title}</title>
                <meta name="description" content={contactData.seoPage.description} />
                <meta name="keywords" content={contactData.seoPage.keywords} />
            </Head>
            <main>
                <Contact />
            </main>
        </>
    )
}

export default ContactPage
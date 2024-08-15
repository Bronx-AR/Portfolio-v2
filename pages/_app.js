import React from 'react'
import Head from 'next/head'
import { mainData } from '@/lib/data'
import { Cursor, Footer, Header, LoadingScreen } from '@/components'
import 'bootstrap/dist/css/bootstrap.css'
import 'swiper/css';
import 'swiper/css/navigation';
import '@/styles/theme.scss'
import '@/styles/all.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function App({ Component, pageProps }) {
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
    }, []);

    return (
        <>
            {loading ? (
                <React.Fragment>
                    <Head>
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <link rel="shortcut icon" href={mainData.favicon.src} />
                    </Head>

                    {/* Cursor */}
                    <Cursor />

                    {/* Header */}
                    <Header />

                    <Component {...pageProps} />

                    {/* Footer */}
                    <Footer />

                </React.Fragment>
            ) : (
                <LoadingScreen />
            )}
        </>
    )
}

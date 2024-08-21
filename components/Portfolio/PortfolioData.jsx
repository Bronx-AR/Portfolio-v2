import PortfolioImg from '@/public/images/portfolio.png';
import MainImageBooki from '@/public/images/work_main/Auberge-la-Canebiere.webp';
import PortfolioImgBooki1 from '@/public/images/work/Booki1.webp';
import PortfolioImgBooki2 from '@/public/images/work/Booki2.webp';
import MainImageOhMyFood from '@/public/images/work_main/jay-wennington-N_Y88TWmGwA-unsplash.webp';
import PortfolioImgOhMyFood from '@/public/images/work/Ohmyfood.webp';
import PortfolioImgOhMyFood1 from '@/public/images/work/Ohmyfood1.webp';
import MainImagePrintit from '@/public/images/work_main/colors.webp';
import PortfolioImgPrintit from '@/public/images/work/Print-it.webp';
import PortfolioImgPrintit1 from '@/public/images/work/Print-it1.webp';
import MainImageSophieBluel from '@/public/images/work_main/sophie-bluel.webp';
import PortfolioImgSophieBluel from '@/public/images/work/Sophie-Bluel.webp';
import MainImageKasa from '@/public/images/work_main/Kasa 1654513af767e6d7b860.webp';
import PortfolioImgKasa from '@/public/images/work/Kasa.webp';
import PortfolioImgKasa1 from '@/public/images/work/Kasa1.webp';
import MainImageNina from '@/public/images/work_main/nina.webp';
import PortfolioImgNina from '@/public/images/work/Nina-Carducci.webp';
import PortfolioImgNina1 from '@/public/images/work/Nina-Carducci1.webp';
import MainImage724 from '@/public/images/work_main/hall-expo.webp';
import PortfolioImg724Events from '@/public/images/work/724-Events.webp';
import PortfolioImg724Events1 from '@/public/images/work/724-Events1.webp';
import MainImageArgentBank from '@/public/images/work_main/Arbre bancaire.webp';
import PortfolioImgArgentBank from '@/public/images/work/Argent-Bank.webp'
import PortfolioImgArgentBank1 from '@/public/images/work/Argent-Bank1.webp'

export const portfolioData = {
    mainData: {
        title: "My Latest Works",
    },
    seoPage: {
        title: 'Portfolio',
        description: 'My Latest Works',
        keywords: 'key1, key2, key3',
    },
    navigationList: [
        {
            title: "HTML/CSS",
            classes: "html/css",
            dataFilter: ".html/css"
        },
        {
            title: "SASS",
            classes: "sass",
            dataFilter: ".sass"
        },
        {
            title: "JavaScript",
            classes: "js",
            dataFilter: ".js"
        },
        {
            title: "React",
            classes: "react",
            dataFilter: ".react"
        },
        {
            title: "SEO",
            classes: "seo",
            dataFilter: ".seo"
        },
        {
            title: "Debug",
            classes: "debug",
            dataFilter: ".debug"
        },
    ],
    projects: [
        {
            title: 'Booki',
            slug: 'Booki',
            description: 'OpenClassrooms web integrator training project.',
            keywords: 'key1, key2, key3',
            category: 'HTML/CSS',
            services: 'Website',
            client: 'Booki',
            duration: '60 hours',
            projectLink: {
                title: 'Code preview',
                url: 'https://github.com/Bronx-AR/Booki'
            },
            content: 'The company wanted to develop a website that allows its users to find accomodation and activities in the city of their choice. For the project I intefrated the site interface in HTML and CSS, I had Figma models for mobile, tablet and desktop, as well as images and a summary note on the specifies of the project. This allowed me to develop essential skills in responsive design, integrate a site according to a model as well as install a front-end development environment.',
            mainImage: MainImageBooki,
            images: [
                {
                    image: PortfolioImgBooki2,
                    alt: 'Image Alt'
                },
                {
                    image: PortfolioImgBooki1,
                    alt: 'Image Alt'
                },
            ],
            imagesLightbox: [
                {
                    image: PortfolioImg,
                    alt: 'Image Alt'
                },
                {
                    image: PortfolioImg,
                    alt: 'Image Alt'
                },
            ],
            trending: true
        },
        {
            title: 'OhMyFood',
            slug: 'OhMyFood',
            description: 'OpenClassrooms web integrator training project.',
            keywords: 'key1, key2, key3',
            category: 'sass',
            services: 'Website',
            client: 'Envato',
            duration: '60 hours',
            projectLink: {
                title: 'Code Preview',
                url: 'https://github.com/Bronx-AR/Ohmyfood'
            },
            content: 'For this project, the client wanted a website that lists the menus of gourmet restaurants, the mission was to integrate the site in mobile-first, as well as to make the tablet and desktop version in accordance with the Figma models which were provided, while using SASS and including animations to enrich the user experience of the site, all by versioning the site on GitHub. This allowed me to develop skills in mobile-first responsive design, use of SASS as well as the use of GitHub.',
            mainImage: MainImageOhMyFood,
            images: [
                {
                    image: PortfolioImgOhMyFood,
                    alt: 'Image Alt'
                },
                {
                    image: PortfolioImgOhMyFood1,
                    alt: 'Image Alt'
                },
            ],
            imagesLightbox: [
                {
                    image: PortfolioImg,
                    alt: 'Image Alt'
                },
                {
                    image: PortfolioImg,
                    alt: 'Image Alt'
                },
            ],
            trending: true
        },
        {
            title: 'Print-it',
            slug: 'Print-it',
            description: 'OpenClassrooms web integrator training project.',
            keywords: 'key1, key2, key3',
            category: 'js',
            services: 'Website',
            client: 'Print-it',
            duration: '60 hours',
            projectLink: {
                title: 'Code Preview',
                url: 'https://github.com/Bronx-AR/Print-it'
            },
            content: 'For this project the client, Print-in which is a printing company, wanted to dynamize their static website by adding an interactive carousel. So my mission was to update the existing HTML code and add a carousel in JavaScript. This project allowed me to work on the fundamentals of JavaScript.',
            mainImage: MainImagePrintit,
            images: [
                {
                    image: PortfolioImgPrintit,
                    alt: 'Image Alt'
                },
                {
                    image: PortfolioImgPrintit1,
                    alt: 'Image Alt'
                },
            ],
            imagesLightbox: [
                {
                    image: PortfolioImg,
                    alt: 'Image Alt'
                },
                {
                    image: PortfolioImg,
                    alt: 'Image Alt'
                },
            ],
            trending: true
        },
        {
            title: 'Sophie Bluel',
            slug: 'Sophie Bluel',
            description: 'OpenClassrooms web integrator training project.',
            keywords: 'key1, key2, key3',
            category: 'JavaScript',
            services: 'Portfolio',
            client: 'Sophie Bluel',
            duration: '60 hours',
            projectLink: {
                title: 'Code Preview',
                url: 'https://github.com/Bronx-AR/Sophie-Bluel'
            },
            content: 'For this portfolio site of an interior designer: Sophie Bluel, the mission was to integrate the dynamic part of the site, such as the creation of a gallery, the creation of a user login page as well as the possibility of managing images (add or delete), using javascript language and an API. This project allowed me to strengthen my knowledge of JavaScript as well as learn to communicate with a database.',
            mainImage: MainImageSophieBluel,
            images: [
                {
                    image: PortfolioImgSophieBluel,
                    alt: 'Image Alt'
                },
                {
                    image: PortfolioImg,
                    alt: 'Image Alt'
                },
            ],
            imagesLightbox: [
                {
                    image: PortfolioImg,
                    alt: 'Image Alt'
                },
                {
                    image: PortfolioImg,
                    alt: 'Image Alt'
                },
            ],
            trending: true
        },
        {
            title: 'Kasa',
            slug: 'Kasa',
            description: 'OpenClassrooms web integrator training project.',
            keywords: 'key1, key2, key3',
            category: 'React',
            services: 'Website',
            client: 'Kasa',
            duration: '235 Hours',
            projectLink: {
                title: 'Code Preview',
                url: 'https://github.com/Bronx-AR/Kasa'
            },
            content: 'For this project, the company wanted a entire redesign of their website and implement the front-end of the application using React, Create-React-App, React Router and Sass;they also wanted to add animations to improve the user experience. This project allowed me to learn programming with React and therefore to develop my code into components.',
            mainImage: MainImageKasa,
            images: [
                {
                    image: PortfolioImgKasa,
                    alt: 'Image Alt'
                },
                {
                    image: PortfolioImgKasa1,
                    alt: 'Image Alt'
                },
            ],
            imagesLightbox: [
                {
                    image: PortfolioImg,
                    alt: 'Image Alt'
                },
                {
                    image: PortfolioImg,
                    alt: 'Image Alt'
                },
            ],
            trending: false
        },
        {
            title: 'Nina Carducci',
            slug: 'Nina Carducci',
            description: 'OpenClassrooms web integrator training project.',
            keywords: 'key1, key2, key3',
            category: 'SEO',
            services: 'Optimization',
            client: 'Nina Carducci',
            duration: '60 hours',
            projectLink: {
                title: 'Code Preview',
                url: 'https://github.com/Bronx-AR/Nina-Carducci'
            },
            content: 'For this project it was necessary to make a global optimization of the site of the photographer Nina Carducci, both in terms of performance and SEO, set up local referencing with schema.org, add metas for social networks and make the necessary modifications for the accessibility of the site. As well as providing an optimization report to the client so that they can see the different changes made and the impact it had on the site. So I learned to use the lighthouse tool, as well as the use of metas with schema.org. It also allowed me to strengthen my knowledge of HTML semantics for accessibility, as well as how to optimize images for a site.',
            mainImage: MainImageNina,
            images: [
                {
                    image: PortfolioImgNina,
                    alt: 'Image Alt'
                },
                {
                    image: PortfolioImgNina1,
                    alt: 'Image Alt'
                },
            ],
            imagesLightbox: [
                {
                    image: PortfolioImg,
                    alt: 'Image Alt'
                },
                {
                    image: PortfolioImg,
                    alt: 'Image Alt'
                },
            ],
            trending: false
        },
        {
            title: '724 Events',
            slug: '724 Events',
            description: 'OpenClassrooms web integrator training project.',
            keywords: 'key1, key2, key3',
            category: 'Debug',
            services: 'Debuging',
            client: '724 Events',
            duration: '60 hours',
            projectLink: {
                title: 'Code Preview',
                url: 'https://github.com/Bronx-AR/724events'
            },
            content: 'For this project, the events agency 724 Event wanted to correct a few bugs on their site, particularly for the carousel as well as the display of the correct months and images for each of their events. To do this I learned to use the React developer tool as well as understand testing. It also taught me how to write unit tests for different components, and strengthen my knowledge of using the console in the middle of development.',
            mainImage: MainImage724,
            images: [
                {
                    image: PortfolioImg724Events,
                    alt: 'Image Alt'
                },
                {
                    image: PortfolioImg724Events1,
                    alt: 'Image Alt'
                },
            ],
            imagesLightbox: [
                {
                    image: PortfolioImg,
                    alt: 'Image Alt'
                },
                {
                    image: PortfolioImg,
                    alt: 'Image Alt'
                },
            ],
            trending: false
        },
        {
            title: 'Argent Bank',
            slug: 'Argent Bank',
            description: 'OpenClassrooms web integrator training project.',
            keywords: 'key1, key2, key3',
            category: 'React',
            services: 'Website',
            client: 'Argent Bank',
            duration: '60 hours',
            projectLink: {
                title: 'Code Preview',
                url: 'https://github.com/Bronx-AR/ArgentBank'
            },
            content: 'For this project Argent Bank wanted to integrate their entire site using React and Redux as well as using green code best practices. They wanted the user to have access to their different accounts when login, and to have the possibility of changing the username on it (but not the possibility of changing the first or last name). Additionally they wanted a document with possible API routes that could be created to retrieves all transactions by accounts, given that they were in the creation phase. This project allowed me to strengthen my knowledge in the use of React, and to learn how to use Redux to set up a global state on a site, as well as to learn how to create API routes in yaml format.',
            mainImage: MainImageArgentBank,
            images: [
                {
                    image: PortfolioImgArgentBank,
                    alt: 'Image Alt'
                },
                {
                    image: PortfolioImgArgentBank1,
                    alt: 'Image Alt'
                },
            ],
            imagesLightbox: [
                {
                    image: PortfolioImg,
                    alt: 'Image Alt'
                },
                {
                    image: PortfolioImg,
                    alt: 'Image Alt'
                },
            ],
            trending: false
        },
    ]
};
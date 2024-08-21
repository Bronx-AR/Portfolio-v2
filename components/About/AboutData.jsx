import HeroAvatar from '@/public/images/avatar.jpg';

export const aboutData = {
    mainData: {
        heroAvatar: HeroAvatar,
        title: "Hi! I'm Arnaud Quatrevaux.",
        biography: "A profesional Front-End developer based in Toulouse.",
        hoursOfExperience: "26,000",
        projectsDone: "10",
        button: {
            title: 'Let\'s Talk',
            url: '/contact',
        }
    },
    skills: [
        {
            name: 'Web Development',
        },
        {
            name: 'UI & UX Design',
        },
        {
            name: 'Marketing',
        },
        {
            name: 'SEO',
        },
        {
            name: 'Management',
        },
    ],
    connect: [
        {
            url: '#',
            bootstrapIcon: 'bi bi-facebook',
        },
        {
            url: '#',
            bootstrapIcon: 'bi bi-twitter',
        },
        {
            url: '#',
            bootstrapIcon: 'bi bi-instagram',
        },
    ]
};
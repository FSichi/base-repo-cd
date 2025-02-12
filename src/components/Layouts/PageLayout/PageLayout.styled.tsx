export const Styles = {
    private: {
        containerSection: 'overflow-x-hidden xl:ml-[270px]',
        containerPage: `mx-auto max-[1350px]:px-5 w-full mt-10 mb-5 max-w-[1000px] xl:max-w-[1100px] min-[1537px]:max-w-[1280px]`,
    },
    public: {
        containerSection: 'overflow-x-hidden flex page-layout-gradient',
        gradientSection:
            'bg-primary-700 w-1/3 py-6 px-16 min-[1000px]:flex flex-col justify-between hidden',
        containerPage: 'w-full min-[1000px]:w-2/3 items-center justify-center flex z-50 bg-white',
        logoImg: 'w-48 h-auto mt-3 object-contain',
        copyrigth: 'text-center text-white',
        imgGradient: `
            absolute right-0 -top-20
            size-[300px] min-[1000px]:size-[350px]
            bg-no-repeat bg-cover mix-blend-darken select-none z-0
        `,
    },
};

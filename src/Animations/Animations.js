const commonTransition = {
    duration: 0.3,
    ease: "easeOut",
};

const staggerTransition = {
    staggerChildren: 0.3,
    delayChildren: 0.2,
};

const Animations = {

    addAnimationToChildOnlyVariants: {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { ...commonTransition, ...staggerTransition },
        },
    },

    parentVariants: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { ...commonTransition, ...staggerTransition },
        },
        exit: { opacity: 0, transition: {...commonTransition} },
    },

    parentVariantsNoStagger: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { ...commonTransition},
        },
        exit: { opacity: 0, transition: {...commonTransition} },
    },

    displayList: {
        hidden: {opacity:0, height: 0},
        visible: {opacity: 1, height: 'fit-content', transition: { ...commonTransition},},
        exit: {opacity: 0, height: 0, transition: { ...commonTransition},}
    },

    loadingVariants: {
        hidden: {opacity: 0.5},
        visible: {opacity: 1, transition : {type : 'wheel' , duration : 2 , repeat : Infinity , repeatType : 'mirror'}}
    },

    toTopVariants: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: {...commonTransition} },
        exit: { opacity: 0, y: 50, transition: {...commonTransition} },
    },

    toBottomVariants: {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: {...commonTransition} },
        exit: { opacity: 0, y: -50, transition: {...commonTransition} },
    },

    toLeftVariants: {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: {...commonTransition} },
        exit: { opacity: 0, x: 50, transition: {...commonTransition} },
    },

    toRightVariants: {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: {...commonTransition} },
        exit: { opacity: 0, x: -50, transition: {...commonTransition} },
    },

    scaleVariants: {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: {...commonTransition} },
        exit: { scale: 0.9, opacity: 0, transition: {...commonTransition} },
    },

    opacityVariants: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: {...commonTransition} },
        exit: { opacity: 0, transition: {...commonTransition} },
    },

};

export default Animations;
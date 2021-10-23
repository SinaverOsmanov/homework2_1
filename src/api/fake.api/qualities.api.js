export const qualitiesObject = {
    tedious: {
        _id: "67rdca3eeb7f6fgeed471198",
        name: "Нудила",
        color: "primary"
    },
    strange: {
        _id: "67rdca3eeb7f6fgeed471100",
        name: "Странный",
        color: "secondary"
    },
    buller: {
        _id: "67rdca3eeb7f6fgeed4711012",
        name: "Троль",
        color: "success"
    },
    alcoholic: {
        _id: "67rdca3eeb7f6fgeed471101",
        name: "Алкоголик",
        color: "danger"
    },
    handsome: {
        _id: "67rdca3eeb7f6fgeed471102",
        name: "Красавчик",
        color: "info"
    },
    uncertain: {
        _id: "67rdca3eeb7f6fgeed471102",
        name: "Неуверенный",
        color: "dark"
    }
};

export const qualities = [
    {
        _id: "67rdca3eeb7f6fgeed471198",
        name: "Нудила",
        color: "primary"
    },
    {
        _id: "67rdca3eeb7f6fgeed471100",
        name: "Странный",
        color: "secondary"
    },
    {
        _id: "67rdca3eeb7f6fgeed471101",
        name: "Троль",
        color: "success"
    },
    {
        _id: "67rdca3eeb7f6fgeed471102",
        name: "Алкоголик",
        color: "danger"
    },
    {
        _id: "67rdca3eeb7f6fgeed471103",
        name: "Красавчик",
        color: "info"
    },
    {
        _id: "67rdca3eeb7f6fgeed471104",
        name: "Неуверенный",
        color: "dark"
    }
];

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function() {
            resolve(qualities);
        }, 2000);
    });

export default {
    fetchAll
};

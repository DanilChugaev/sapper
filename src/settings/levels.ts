import { ComplexityList } from "./types";

export const levels: ComplexityList = {
    beginner: {
        name: 'beginner',
        bombCount: 10,
        fieldSize: {
            width: 10,
            height: 20,
        },
        selected: false,
    },
    easy: {
        name: 'easy',
        bombCount: 15,
        fieldSize: {
            width: 5,
            height: 10,
        },
        selected: true,
    },
    medium: {
        name: 'medium',
        bombCount: 40,
        fieldSize: {
            width: 10,
            height: 20,
        },
        selected: false,
    },
    hard: {
        name: 'hard',
        bombCount: 100,
        fieldSize: {
            width: 20,
            height: 30,
        },
        selected: false,
    },
    huge: {
        name: 'huge',
        bombCount: 220,
        fieldSize: {
            width: 30,
            height: 50,
        },
        selected: false,
    },
    extreme: {
        name: 'extreme',
        bombCount: 150,
        fieldSize: {
            width: 20,
            height: 30,
        },
        selected: false,
    },
}
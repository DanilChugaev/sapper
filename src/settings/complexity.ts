import { ComplexityList } from "./types";

export const complexity: ComplexityList = {
    beginner: {
        name: 'beginner',
        bombCount: 10,
        fieldSize: {
            width: 10,
            height: 20,
        },
    },
    easy: {
        name: 'easy',
        bombCount: 15,
        fieldSize: {
            width: 5,
            height: 10,
        },
    },
    medium: {
        name: 'medium',
        bombCount: 40,
        fieldSize: {
            width: 10,
            height: 20,
        },
    },
    hard: {
        name: 'hard',
        bombCount: 100,
        fieldSize: {
            width: 20,
            height: 30,
        },  
    },
    huge: {
        name: 'huge',
        bombCount: 220,
        fieldSize: {
            width: 30,
            height: 50,
        },  
    },
    extreme: {
        name: 'extreme',
        bombCount: 150,
        fieldSize: {
            width: 20,
            height: 30,
        },  
    },
}
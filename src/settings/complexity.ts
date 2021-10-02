import { ComplexityList } from "./types";

export const complexity: ComplexityList = {
    beginner: {
        name: 'Beginner',
        bombCount: 10,
        fieldSize: {
            width: 10,
            height: 20,
        },
    },
    easy: {
        name: 'Easy',
        bombCount: 15,
        fieldSize: {
            width: 5,
            height: 10,
        },
    },
    medium: {
        name: 'Medium',
        bombCount: 40,
        fieldSize: {
            width: 10,
            height: 20,
        },
    },
    hard: {
        name: 'Hard',
        bombCount: 100,
        fieldSize: {
            width: 20,
            height: 30,
        },  
    },
    huge: {
        name: 'Huge',
        bombCount: 220,
        fieldSize: {
            width: 30,
            height: 50,
        },  
    },
    extreme: {
        name: 'Extreme',
        bombCount: 150,
        fieldSize: {
            width: 20,
            height: 30,
        },  
    },
}
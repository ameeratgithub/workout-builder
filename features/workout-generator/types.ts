// features/workout-generator/types.ts

/* 
    Types needed for API and front-end integrations. Types make sure that we don't make mistakes
    when using objects
*/
export interface Day {
    title: string;
    shouldRest: boolean;
    exercises: Exercise[];
}

export interface Week {
    id: number;
    days: Day[];
}

export interface Exercise {
    id: string;
    circuit: string;
    name: string;
    sets: number;
    reps: number[];
    notes: string;
}

export type ExerciseActionFn = (id: string) => void;

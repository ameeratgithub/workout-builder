// features/workout-generator/types.ts

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

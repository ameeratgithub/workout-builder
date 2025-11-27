'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Week } from '@/features/workout-generator/types';
import { getPlansFromDBAction } from '@/features/workout-generator/actions/get-plans';

interface WorkoutContextType {
    weeks: Week[];
    setWeeks: (weeks: Week[]) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
    const [weeks, setWeeks] = useState<Week[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                const data = await getPlansFromDBAction();
                if (data && data.length > 0) {
                    setWeeks(data);
                }
            } catch (error) {
                console.error('Failed to load plan from DB:', error);
            } finally {
                setIsLoading(false);
            }
        };

        init();
    }, []);

    return (
        <WorkoutContext.Provider
            value={{ weeks, setWeeks, isLoading, setIsLoading }}
        >
            {children}
        </WorkoutContext.Provider>
    );
}

export function useWorkoutContext() {
    const context = useContext(WorkoutContext);
    if (context === undefined) {
        throw new Error(
            'useWorkoutContext must be used within a WorkoutProvider'
        );
    }
    return context;
}

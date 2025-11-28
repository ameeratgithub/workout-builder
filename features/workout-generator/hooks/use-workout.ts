import { useCallback, useState } from 'react';
import { useWorkoutContext } from '@/contexts/workout-context'; // Import our new context hook
import { generateWorkoutAction } from '../actions/generate-plan';
import { savePlanToDbAction } from '../actions/save-plan';

export function useWorkout() {
    const { weeks, setWeeks, isLoading, setIsLoading } = useWorkoutContext();
    const [error, setError] = useState<string | null>(null);

    const generatePlan = async (prompt: string) => {
        setIsLoading(true);
        try {
            // Hooks should call actions, and shouldn't call API's directly because of potential
            // security risks involving API keys.
            const data = await generateWorkoutAction(prompt);
            setWeeks(data);
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const removeExercise = useCallback(
        async (exerciseId: string) => {
            const previousWeeks = [...weeks];

            // Only filter exercises, other parent objects will not be updated/removed
            const updatedWeeks = weeks.map((week) => ({
                ...week,
                days: week.days.map((day) => ({
                    ...day,
                    exercises: day.exercises.filter(
                        (ex) => ex.id !== exerciseId
                    ),
                })),
            }));

            // Optimistic state setting, will roll back if failed
            setWeeks(updatedWeeks);
            try {
                await savePlanToDbAction(updatedWeeks);
            } catch (err) {
                setError('Failed to delete exercise');
                setWeeks(previousWeeks);
            }
        },
        [weeks, setWeeks]
    );

    const moveExercise = useCallback(
        async (
            weekId: number,
            dayIndex: number,
            fromIndex: number,
            toIndex: number
        ) => {
            if (fromIndex === toIndex) return;
            const previousWeeks = [...weeks];

            const newWeeks = JSON.parse(JSON.stringify(weeks));
            const targetDay = newWeeks.find((w: any) => w.id === weekId)?.days[
                dayIndex
            ];

            if (targetDay) {
                const [movedItem] = targetDay.exercises.splice(fromIndex, 1);
                targetDay.exercises.splice(toIndex, 0, movedItem);

                // Optimistic state setting, will roll back if failed
                setWeeks(newWeeks);
                try {
                    await savePlanToDbAction(newWeeks);
                } catch (err) {
                    setWeeks(previousWeeks);
                }
            }
        },
        [weeks, setWeeks]
    );

    return {
        weeks,
        isLoading,
        error,
        generatePlan,
        removeExercise,
        moveExercise,
    };
}

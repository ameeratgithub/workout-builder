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

            const updatedWeeks = weeks.map((week) => ({
                ...week,
                days: week.days.map((day) => ({
                    ...day,
                    exercises: day.exercises.filter(
                        (ex) => ex.id !== exerciseId
                    ),
                })),
            }));

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

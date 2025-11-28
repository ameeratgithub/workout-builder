// src/features/workout-generator/components/workout-plan-view.tsx
'use client';

import { useState } from 'react';
import { WeekTabs } from './week-tabs';
import { DaySection } from './day-section';
import { useWorkout } from '../hooks/use-workout';

export function WorkoutPlanView() {
    const [activeWeek, setActiveWeek] = useState(1);
    const { weeks, isLoading, error, removeExercise, moveExercise } =
        useWorkout();

    return (
        <div className="w-full min-h-screen bg-[#F7F7F7] p-8 font-poppins overflow-x-auto">
            <div className="max-w-[1261px] mx-auto space-y-8">

                {isLoading && (
                    <div className="min-h-screen p-4">
                        Loading your workout plan...
                    </div>
                )}
                
                {error && (
                    <div className="min-h-screen p-4 text-red-500">
                        Error: {error}
                    </div>
                )}

                {weeks.length < 1 && (
                    <div className="min-h-screen p-4 text-red-500">
                        Couldn't load workout plans. Please generate new plan
                    </div>
                )}

                {/* Only render if everything is alright and data is ready to be displayed */}
                {!isLoading && !error && weeks.length > 0 && (
                    <>
                        <WeekTabs
                            weeks={weeks}
                            currentWeek={activeWeek}
                            onWeekChange={(week) => {
                                setActiveWeek(week);
                            }}
                        ></WeekTabs>

                        <div className="w-full space-y-8">
                            {weeks[activeWeek - 1]?.days.map((day, index) => {
                                return (
                                    <DaySection
                                        shouldRest={day.shouldRest}
                                        exercises={day.exercises}
                                        title={day.title}
                                        key={index}
                                        num={index + 1}
                                        onDeleteExercise={async (id) => {
                                            await removeExercise(id);
                                        }}
                                        onMoveExercise={(
                                            fromIndex,
                                            toIndex
                                        ) => {
                                            moveExercise(
                                                weeks[activeWeek - 1].id,
                                                index,
                                                fromIndex,
                                                toIndex
                                            );
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

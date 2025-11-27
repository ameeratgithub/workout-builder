import * as React from 'react';
import { Exercise, ExerciseActionFn } from '../types';
import { ExerciseRow } from './table/rows/exercise';
import { HeaderRow } from './table/rows/header';
import { cn } from '@/lib/utils';
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

interface DaySectionProps {
    num: number;
    title: string;
    shouldRest: boolean;
    exercises: Exercise[];
    onDeleteExercise?: ExerciseActionFn;
    onReplaceExercise?: ExerciseActionFn;
    onMoveExercise: (fromIndex: number, toIndex: number) => void;
}

export function DaySection({
    num,
    title,
    exercises,
    shouldRest,
    onDeleteExercise,
    onReplaceExercise,
    onMoveExercise,
}: DaySectionProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = exercises.findIndex((ex) => ex.id === active.id);
            const newIndex = exercises.findIndex((ex) => ex.id === over.id);

            // Call the parent function to update state/API
            onMoveExercise(oldIndex, newIndex);
        }
    };

    return (
        <div className="w-full max-w-[1261px] mx-auto flex flex-col font-poppins gap-4 items-end">
            <div
                className={cn(
                    'w-full h-[53px]  rounded-lg flex items-center justify-between px-6',
                    shouldRest ? 'bg-[#E2E2E2]' : 'bg-[#CBCDEB]'
                )}
            >
                <h2 className="text-black font-medium text-[20px] leading-[120%]">
                    Day {num} - {title}
                </h2>
            </div>

            {!shouldRest && (
                <div className="w-full flex flex-col gap-[4px] overflow-x-auto pb-1">
                    <HeaderRow />

                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                        modifiers={[restrictToVerticalAxis]}
                    >
                        <SortableContext
                            items={exercises.map((e) => e.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {exercises.map((ex) => (
                                <ExerciseRow
                                    key={ex.id}
                                    exercise={ex}
                                    onDeleteExercise={onDeleteExercise}
                                    onReplaceExercise={onReplaceExercise}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>

                    {exercises.length === 0 && (
                        <div className="p-4 text-center text-gray-400 text-sm italic border border-dashed border-[#F2F2F2] rounded-lg">
                            No exercises added.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

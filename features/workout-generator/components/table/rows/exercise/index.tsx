import { COLUMNS_CLASSES } from '@/features/workout-generator/consts';
import { Exercise, ExerciseActionFn } from '@/features/workout-generator/types';
import { cn } from '@/lib/utils';
import { BodyCell } from '../../cells';
import { ExerciseActions } from './actions';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

export interface ExerciseRowProps {
    exercise: Exercise;
    onDeleteExercise?: ExerciseActionFn;
    onReplaceExercise?: ExerciseActionFn;
}

/* 
    This component contains complete exercise data and actions.
*/
export function ExerciseRow({
    exercise,
    onDeleteExercise,
    onReplaceExercise,
}: ExerciseRowProps) {
    // We basically only want to sort, so it's good to use `useSortable` instead of mindlessly
    // dragging components
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: exercise.id });

    // Styles while dragging the exercise row
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1, 
        zIndex: isDragging ? 50 : 'auto',
        position: 'relative' as const,
    };
    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex flex-row w-full h-[53px] items-center bg-[#F9FAFB] border border-[#F2F2F2] rounded-lg overflow-hidden"
        >
            <div
                className={cn(
                    COLUMNS_CLASSES.circuit,
                    'h-full flex items-center justify-center',
                    'text-black text-[14px] font-normal leading-[150%]'
                )}
            >
                {exercise.circuit}
            </div>

            <BodyCell width={COLUMNS_CLASSES.exercise}>
                {exercise.name}
            </BodyCell>

            <BodyCell width={COLUMNS_CLASSES.sets} centered>
                {exercise.sets}
            </BodyCell>

            <BodyCell width={COLUMNS_CLASSES.reps} centered>
                {exercise.reps.join(', ')}
            </BodyCell>

            <BodyCell
                width={COLUMNS_CLASSES.notes}
                className="italic"
            >
                {exercise.notes}
            </BodyCell>

            <ExerciseActions
                exercise={exercise}
                onDeleteExercise={onDeleteExercise}
                onReplaceExercise={onReplaceExercise}
                dragHandleProps={{ attributes, listeners }}
            />
        </div>
    );
}

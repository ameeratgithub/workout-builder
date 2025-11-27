import { COLUMNS_CLASSES } from '@/features/workout-generator/consts';
import { cn } from '@/lib/utils';
import { ArrowUpDown, Trash2 } from 'lucide-react';
import { ExerciseRowProps } from '.';
import { MouseEventHandler } from 'react';

interface DragHandleProps {
    attributes: any;
    listeners: any;
}

interface ExtendedExerciseRowProps extends ExerciseRowProps {
    dragHandleProps?: DragHandleProps;
}

export function ExerciseActions({
    exercise,
    onDeleteExercise,
    onReplaceExercise,
    dragHandleProps,
}: ExtendedExerciseRowProps) {
    return (
        <>
            <ExerciseAction
                buttonClass="hover:bg-red-50"
                onClick={() => onDeleteExercise?.(exercise.id)}
            >
                <Trash2 className="w-5 h-5 text-[#909093] group-hover:text-red-500 transition-colors" />{' '}
            </ExerciseAction>

            <ExerciseAction
                buttonClass="hover:bg-blue-50 cursor-move"
                onClick={() => {
                    onReplaceExercise?.(exercise.id);
                }}
                {...dragHandleProps?.attributes}
                {...dragHandleProps?.listeners}
            >
                <ArrowUpDown className="w-4 h-4 text-[#909093] group-hover:text-blue-500 transition-colors" />
            </ExerciseAction>
        </>
    );
}

interface ExerciseActionProps extends React.HTMLAttributes<HTMLElement> {
    onClick: MouseEventHandler<HTMLButtonElement>;
    buttonClass: string;
    children: React.ReactNode;
}
function ExerciseAction({
    onClick,
    buttonClass,
    children,
    ...props
}: ExerciseActionProps) {
    return (
        <div
            className={cn(
                COLUMNS_CLASSES.actions,
                'h-full flex items-center justify-center border-l border-[#F2F2F2]'
            )}
        >
            <button
                onClick={onClick}
                className={cn('p-2 rounded-full group', buttonClass)}
                {...props}
            >
                {children}
            </button>
        </div>
    );
}

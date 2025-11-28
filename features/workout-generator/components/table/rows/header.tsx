import { COLUMNS_CLASSES } from '@/features/workout-generator/consts';
import { HeaderCell } from '../cells';
import { cn } from '@/lib/utils';

/* 
    Shows metadata of items being rendered.
*/
export function HeaderRow() {
    return (
        <div className="flex flex-row min-w-fit h-[53px] items-center bg-[#F9FAFB] border border-[#F2F2F2] rounded-lg overflow-hidden">
            <HeaderCell width={COLUMNS_CLASSES.circuit} label="Circuit" />
            <HeaderCell width={COLUMNS_CLASSES.exercise} label="Exercise" />
            <HeaderCell width={COLUMNS_CLASSES.sets} label="Sets" centered />
            <HeaderCell width={COLUMNS_CLASSES.reps} label="Reps" centered />
            <HeaderCell width={COLUMNS_CLASSES.notes} label="Notes" />
            <div className={cn(COLUMNS_CLASSES.actions, 'bg-transparent')} />
            <div className={cn(COLUMNS_CLASSES.actions, 'bg-transparent')} />
        </div>
    );
}

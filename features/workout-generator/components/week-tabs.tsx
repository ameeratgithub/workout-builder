import * as React from 'react';
import { cn } from '@/lib/utils';
import { Week } from '../types';

interface WeekTabsProps {
    weeks: Week[];
    currentWeek: number;
    onWeekChange: (week: number) => void;
    className?: string;
}

export function WeekTabs({
    weeks,
    currentWeek,
    onWeekChange,
    className,
}: WeekTabsProps) {
    return (
        <div
            className={cn(
                'flex flex-row justify-between items-center',
                'w-full max-w-[1261px] h-[40px]',
                'relative',
                className
            )}
        >
            <div className="flex flex-row items-center gap-2">
                {weeks.map((week) => {
                    const isActive = currentWeek === week.id;
                    
                    return (
                        <button
                            key={week.id}
                            onClick={() => onWeekChange(week.id)}
                            className={cn(
                                'flex items-center justify-center',
                                'h-[40px] px-2 rounded-md transition-colors',
                                'font-poppins font-medium text-[16px] leading-[150%] text-center',

                                isActive
                                    ? 'bg-[#6367EF] text-white shadow-sm' 
                                    : 'bg-white text-black hover:bg-gray-100'
                            )}
                        >
                            <span className="w-[80px]">Week {week.id}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// components/layout/header.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Header = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    return (
        // Container of 'Maxed' logo
        <header
            className={cn(
                '' ,
                'flex flex-row items-center',
                'px-[84px] gap-[143px]',
                'w-full max-w-[1440px] h-[75px]',
                'bg-white',
                'justify-center mx-auto',
                className
            )}
            {...props}
        >
            {/* Logo Section */}
            <div className="flex-none order-0 flex-grow-0">
                <Image src="/logo.svg" alt="Maxed Logo" width={140} height={74.67}/>
            </div>
        </header>
    );
};

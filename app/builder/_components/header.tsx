// components/layout/header.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

export const Header = ({ className, ...props }: HeaderProps) => {
    return (
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

import { cn } from "@/lib/utils";

export const HeaderCell = ({
    width,
    label,
    centered,
}: {
    width: string;
    label: string;
    isFirst?: boolean;
    centered?: boolean;
}) => (
    <div
        className={cn(
            width,
            'h-full flex items-center px-4 text-black text-[14px] font-normal leading-[150%]',
            'bg-[#F9FAFB]',
            centered && 'justify-center'
        )}
    >
        {label}
    </div>
);

export const BodyCell = ({
    width,
    children,
    className,
    centered,
}: {
    width: string;
    children: React.ReactNode;
    className?: string;
    centered?: boolean;
}) => (
    <div
        className={cn(
            width,
            'h-full flex items-center px-4',
            'text-black text-[14px] font-normal leading-[150%]',
            centered && 'justify-center',
            className
        )}
    >
        {children}
    </div>
);

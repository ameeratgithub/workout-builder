'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/16/solid';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export function PromptForm({
    onSubmit,
    isLoading = false,
}: {
    onSubmit: (prompt: string) => void;
    isLoading?: boolean;
}) {
    const [input, setInput] = useState('');
    const maxLength = 1000;

    // Check if empty or whitespace only
    const isDisabled = !input.trim();
    const isLimitReached = input.length >= maxLength;

    const handleSubmit = () => {
        if (isDisabled) return;
        onSubmit(input);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="w-full max-w-[696px] flex flex-col gap-[60px] items-center">
            <div className="flex flex-col gap-2 text-center items-center w-full max-w-[463px]">
                <h1 className="text-[#131313] text-[32px] font-bold leading-[150%] font-[family-name:var(--font-poppins)]">
                    Smarter training starts here
                </h1>
                <p className="text-[#131313] text-[18px] font-normal leading-[150%] font-[family-name:var(--font-poppins)]">
                    Chat with AI to build custom fitness plans
                </p>
            </div>

            <div className="w-full bg-[#FDFDFD] border border-[#EBEBEB] rounded-[16px] shadow-[0px_0px_4px_rgba(0,0,0,0.12)] p-[12px_8px] flex flex-col gap-2">
                <div
                    className={cn(
                        'relative w-full bg-white border rounded-[8px] shadow-[0px_1px_2px_rgba(10,13,18,0.05)] transition-colors',
                        isLimitReached ? 'border-red-200' : 'border-[#EBEBEB]',
                        isLoading && 'opacity-50 bg-gray-50'
                    )}
                >
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        placeholder="Describe what are we building today..."
                        maxLength={maxLength}
                        className="w-full h-[128px] resize-none border-0 bg-transparent focus-visible:ring-0 p-[14px] font-[family-name:var(--font-poppins)] font-normal text-[16px] leading-[24px] tracking-[-0.008em] placeholder:text-[#717680] text-[#131313]"
                    />
                </div>

                <div className="flex flex-row justify-between items-center w-full h-[44px] pl-2">
                    {/* Space on the left side of button */}
                    <div className="flex items-center gap-2"></div>

                    <div className="flex flex-row items-center gap-4">
                        <span
                            className={cn(
                                'text-[12px] font-normal leading-[14px] text-right font-[family-name:var(--font-bricolage)] transition-colors',
                                isLimitReached
                                    ? 'text-red-500 font-medium'
                                    : 'text-[#ACACAC]'
                            )}
                        >
                            {input.length}/{maxLength}
                        </span>

                        <Button
                            size="icon"
                            onClick={handleSubmit}
                            disabled={isDisabled}
                            className={cn(
                                'w-[44px] h-[44px] rounded-[32px] shadow-[0px_1px_2px_rgba(10,13,18,0.05)] flex items-center justify-center p-[12px] gap-2 transition-all duration-200',
                                'bg-[#6367EF] border border-[#6367EF] hover:bg-[#5256d9]',
                                'disabled:bg-[#E9EFFF] disabled:border-[#E9EFFF] disabled:opacity-100 disabled:cursor-not-allowed'
                            )}
                        >
                            {isLoading ? (
                                <Loader2 className="size-5 text-white animate-spin" />
                            ) : (
                                <PaperAirplaneIcon className="size-5 text-white flex-shrink-0" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';

import { PromptForm } from '@/features/workout-generator/components/prompt-form';
import { useRouter } from 'next/navigation';
import { useWorkout } from '@/features/workout-generator/hooks/use-workout';

export default function Page() {
    const router = useRouter();
    const { generatePlan, isLoading } = useWorkout();

    return (
        <div className="flex flex-col items-center justify-center w-full px-4 md:px-0">
            <PromptForm
                isLoading={isLoading}
                onSubmit={async (input) => {
                    const success = await generatePlan(input);
                    if (success) {
                        router.push('/builder');
                    }
                }}
            />
        </div>
    );
}

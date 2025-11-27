import type { Metadata } from 'next';
import { Poppins, Bricolage_Grotesque } from 'next/font/google';
import '../styles/globals.css';
import { WorkoutProvider } from '@/contexts/workout-context';

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['300', '400', '500', '600', '700'],
});

const bricolage = Bricolage_Grotesque({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-bricolage',
    weight: ['400', '500'],
});

export const metadata: Metadata = {
    title: 'AI Workout Plan Builder',
    description: 'Get ready for your healthy journey',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${poppins.variable} ${bricolage.variable} font-sans`}
            >
                <WorkoutProvider>
                    <main className="min-h-screen bg-[#F7F7F7] w-full flex flex-col items-center justify-center font-sans">
                        {children}
                    </main>
                </WorkoutProvider>
            </body>
        </html>
    );
}

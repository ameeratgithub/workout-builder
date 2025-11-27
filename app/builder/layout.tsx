// app/layout.tsx
import { Header } from './_components/header';
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main className="w-full max-w-[1440px] px-[84px]">{children}</main>
        </>
    );
}

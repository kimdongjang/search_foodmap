import Header from "./Header";
import Footer from "./Footer";

type AppLayoutProps = {
    children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <>
            <Header />
            <div style={{ height: '100%' }}>{children}</div>
            <Footer />
        </>
    )
}
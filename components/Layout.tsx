import Header from "./Header";
import Footer from "./Footer";

type AppLayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: AppLayoutProps) {
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer />
        </>
    )
}
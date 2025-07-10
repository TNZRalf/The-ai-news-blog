import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="app-root">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}
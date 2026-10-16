import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo">
          <Image
            src="/icons/logo.svg"
            alt="Stockify"
            width={140}
            height={140}
            className="h-8 w-auto"
          />
        </Link>
        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>
      <section className="auth-right-section">
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <blockquote className="auth-blockquote">
            Stockify turned my watchlist into a winning list. Making me feel
            more confident making moves in the market.
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <cite className="auth-testimonial-author">- Jack D.</cite>
              <p className="max-md:text-xs text-gray-500">Trader.</p>
            </div>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star: number) => (
                <Image
                  key={star}
                  src="/icons/star.svg"
                  alt="star"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 relative">
          <Image
            src="/images/dashboard.png"
            width={1440}
            height={1150}
            className="auth-dashboard-preview absolute top-0"
            alt="dashboard"
          />
        </div>
      </section>
    </main>
  );
};
export default Layout;

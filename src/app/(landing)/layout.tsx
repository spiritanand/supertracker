import Header from "~/components/layouts/landing/header";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* Animating decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute -left-4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-yellow-500/30 to-amber-500/30 blur-3xl" />
        <div className="animate-blob animation-delay-2000 absolute -right-4 top-1/3 h-64 w-64 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 blur-3xl" />
        <div className="animate-blob animation-delay-4000 absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full bg-gradient-to-r from-amber-500/30 to-yellow-500/30 blur-3xl" />
      </div>

      <Header />

      {children}
    </>
  );
}

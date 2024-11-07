import { redirect } from "next/navigation";
import Header from "~/components/layouts/authed/dashboard/header";
import { auth } from "~/server/auth";
import { TRPCReactProvider } from "~/trpc/react";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  // TODO: This is a potential security risk.
  // We should implement some kind of middleware to protect authed routes.
  if (!session) redirect("/");

  return (
    <>
      <TRPCReactProvider>
        <Header session={session} />
        {children}
      </TRPCReactProvider>
    </>
  );
}

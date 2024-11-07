import { Button } from "~/components/ui/button";
import { signIn } from "~/server/auth";
import Image from "next/image";

export default function header() {
  return (
    <header className="my-10 flex items-center justify-around gap-4">
      <span className="flex items-center gap-2 text-3xl font-black md:text-5xl">
        <Image src="/logo.png" alt="SuperTracker" width={40} height={40} />
        <h1>
          Super<span className="text-primary">Tracker</span>
        </h1>
      </span>

      <form
        action={async () => {
          "use server";
          await signIn("google", {
            redirectTo: "/dashboard",
          });
        }}
      >
        <Button type="submit" className="md:text-xl">
          Login
        </Button>
      </form>
    </header>
  );
}

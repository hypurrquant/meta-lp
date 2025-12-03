import Link from "next/link";

export default function VisActor() {
  return (
    <Link
      href="/"
      className="relative my-2 flex flex-col items-center justify-center gap-y-2 px-4 py-4"
    >
      <div className="dot-matrix absolute left-0 top-0 -z-10 h-full w-full" />
      <span className="text-xs text-muted-foreground">Powered by</span>
      <div className="flex items-center space-x-2">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-indigo-500 to-purple-600">
          <span className="text-xs font-bold text-white">K</span>
        </div>
        <span className="text-md text-accent-foreground">KAIROS</span>
      </div>
    </Link>
  );
}

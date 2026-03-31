import type { ReactNode } from "react";

type EditorialShellProps = {
  children: ReactNode;
  className?: string;
};

export default function EditorialShell({
  children,
  className = "",
}: EditorialShellProps) {
  return (
    <section className="px-4 md:px-8">
      <div className={`editorial-shell ${className}`.trim()}>{children}</div>
    </section>
  );
}

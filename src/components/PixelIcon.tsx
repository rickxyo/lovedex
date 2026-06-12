type PixelIconName =
  | "distance"
  | "calendar"
  | "pace"
  | "location"
  | "heart"
  | "letter"
  | "sparkle"
  | "broken-heart";

type PixelIconProps = {
  name: PixelIconName;
  className?: string;
  title?: string;
};

const paths: Record<PixelIconName, React.ReactNode> = {
  distance: (
    <>
      <path d="M3 12h2v2H3zM5 10h2v2H5zM7 8h6v2H7zM13 6h2v2h-2zM15 4h2v2h-2z" />
      <path d="M2 3h5v5H2zM13 12h7v7h-7z" opacity=".45" />
    </>
  ),
  calendar: (
    <>
      <path d="M3 4h18v17H3zM6 2h3v5H6zM15 2h3v5h-3z" />
      <path d="M6 10h3v3H6zM11 10h3v3h-3zM16 10h3v3h-3zM6 15h3v3H6zM11 15h3v3h-3z" opacity=".45" />
    </>
  ),
  pace: (
    <>
      <path d="M13 2h-2v6H7l5 5 5-5h-4zM4 15h16v3H4zM7 20h10v2H7z" />
      <path d="M2 10h5v2H2zM17 10h5v2h-5z" opacity=".45" />
    </>
  ),
  location: (
    <>
      <path d="M12 2C7 2 4 6 4 10c0 6 8 12 8 12s8-6 8-12c0-4-3-8-8-8z" />
      <path d="M9 8h6v6H9z" className="fill-cream-50" />
    </>
  ),
  heart: (
    <path d="M4 5h6v3h4V5h6v3h2v6h-2v2h-2v2h-2v2h-8v-2H6v-2H4v-2H2V8h2z" />
  ),
  letter: (
    <>
      <path d="M2 5h20v15H2z" />
      <path d="M4 7l8 7 8-7v4l-8 7-8-7z" className="fill-cream-50" />
    </>
  ),
  sparkle: (
    <path d="M10 2h4v6h6v4h-6v8h-4v-8H4V8h6zM2 17h4v4H2zM18 2h4v4h-4z" />
  ),
  "broken-heart": (
    <path d="M4 5h6v3h3l-2 4h3l-3 6H8v-2H6v-2H4v-2H2V8h2zM14 5h6v3h2v6h-2v2h-2v2h-5l3-7h-3z" />
  )
};

export function PixelIcon({
  name,
  className = "h-5 w-5",
  title
}: PixelIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      shapeRendering="crispEdges"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {paths[name]}
    </svg>
  );
}

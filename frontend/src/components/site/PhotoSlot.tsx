interface PhotoSlotProps {
  /** Path of the real photo, once there is one. Leave out to show the placeholder. */
  src?: string;
  /** Short description of the intended photo, shown in the placeholder. */
  description: string;
  /** Alt text describing the intended photo (used for the real photo too). */
  alt: string;
  /** Sizing, usually an aspect ratio. */
  className?: string;
}

/**
 * A large image placement. Until a real photo is supplied it shows a plain
 * placeholder that says what belongs there; pass `src` to drop the photo in.
 */
export default function PhotoSlot({ src, description, alt, className = "" }: PhotoSlotProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`block w-full rounded-2xl object-cover ${className}`}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`photo-slot flex w-full items-center justify-center rounded-2xl p-6 text-center text-[15px] ${className}`}
    >
      <span>Photo: {description}</span>
    </div>
  );
}

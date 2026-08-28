import { useState } from 'react'

type AssetImageProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
}

/*
 * An image that degrades to a neutral tile if the file isn't there yet.
 *
 * The Home screen's rasters have to be exported from Figma by hand (see
 * src/data/home.ts). Until they are, this keeps the layout intact and the
 * gap reads as a deliberate placeholder rather than a broken image.
 */
export default function AssetImage({ src, alt, className = '', imgClassName = '' }: AssetImageProps) {
  const [failed, setFailed] = useState(false)

  // The placeholder tint is only painted when the file is missing — otherwise it
  // would show through any image with transparency (e.g. the SportSG logo).
  return (
    <div className={`overflow-hidden ${failed ? 'bg-[var(--bg-strongest)]' : ''} ${className}`}>
      {!failed && (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className={`size-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  )
}

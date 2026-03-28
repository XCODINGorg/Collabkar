import Image from 'next/image';
import Link from 'next/link';

type BrandLogoProps = {
  href?: string;
  imageClassName?: string;
  textClassName?: string;
  priority?: boolean;
};

export function BrandLogo({
  href = '/',
  imageClassName = 'h-10 w-auto',
  textClassName = 'text-sm font-semibold tracking-tight text-gray-900',
  priority = false,
}: BrandLogoProps) {
  return (
    <Link href={href} className="flex items-center gap-3">
      <Image
        src="/bg-removed.png"
        alt="Collabkar logo"
        width={220}
        height={64}
        className={imageClassName}
        priority={priority}
      />
      <span className={textClassName}>Collabkar</span>
    </Link>
  );
}

import Image from 'next/image';
import Link from 'next/link';

type BrandLogoProps = {
  href?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function BrandLogo({
  href = '/',
  imageClassName = 'h-10 w-auto',
  priority = false,
}: BrandLogoProps) {
  return (
    <Link href={href} className="inline-flex items-center">
      <Image
        src="/bg-removed.png"
        alt="Collabkar logo"
        width={220}
        height={64}
        className={imageClassName}
        priority={priority}
      />
    </Link>
  );
}

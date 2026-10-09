import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Camera, Plus } from 'lucide-react';
import Page from '@/components/Page';
import { guidePhotos } from '@/content/build-guide/photos';
import { guideLinks } from '@/content/build-guide/content';
import styles from './guide.module.css';
import type { ReactNode } from 'react';

export function GuideShell({ children }: { children: ReactNode }) {
  return (
    <Page className={`bg-dark text-light ${styles.root}`}>{children}</Page>
  );
}
export function GuideHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <header className={styles.hero}>
      <div className={styles.wrap}>
        <Link href='/build-with-us' className={styles.back}>
          FAST STRUCT / BUILD WITH US
        </Link>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1>{title}</h1>
          </div>
          <div className={styles.heroAside}>
            <p className={styles.intro}>{intro}</p>
            <a href='#guide-content' className={styles.scroll}>
              Explore the details <ArrowDown size={17} aria-hidden />
            </a>
          </div>
        </div>
        {children}
      </div>
    </header>
  );
}
export function GuideSection({
  eyebrow,
  title,
  intro,
  children,
  light = false,
  id,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  light?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`${styles.section} ${light ? styles.light : ''}`}
    >
      <div className={styles.wrap}>
        {title && (
          <div className={styles.sectionHeading}>
            <div>
              {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
              <h2>{title}</h2>
            </div>
            {intro && <p>{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
export function PhotoSlot({
  id,
  tall = false,
}: {
  id: string;
  tall?: boolean;
}) {
  const photo = guidePhotos[id];
  return (
    <figure className={`${styles.photo} ${tall ? styles.tall : ''}`}>
      <div className={styles.photoImage}>
        {photo.src ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes='(max-width: 768px) 100vw, 60vw'
            className={styles.actualPhoto}
          />
        ) : (
          <div className={styles.photoPlaceholder}>
            <Plus className={styles.crossTop} size={18} aria-hidden />
            <Plus className={styles.crossBottom} size={18} aria-hidden />
            <Camera size={28} strokeWidth={1} aria-hidden />
            <span>Construction photography</span>
            <strong>{photo.caption}</strong>
            <small>Photo coming soon</small>
          </div>
        )}
      </div>
      <figcaption>
        <span>{photo.caption}</span>
        <span>
          {photo.src
            ? 'Construction in progress'
            : 'Reserved for actual project photography'}
        </span>
      </figcaption>
    </figure>
  );
}
export function GuideCards({ exclude }: { exclude?: string }) {
  return (
    <div className={styles.cards}>
      {guideLinks
        .filter((l) => l.href !== exclude)
        .map((link, i) => (
          <Link href={link.href} key={link.href} className={styles.card}>
            <div className={styles.cardTop}>
              <span>0{i + 1}</span>
              <ArrowUpRight size={22} aria-hidden />
            </div>
            <p className={styles.eyebrow}>{link.label}</p>
            <h3>{link.title}</h3>
            <p>{link.description}</p>
          </Link>
        ))}
    </div>
  );
}
export function GuideCTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>Your property. Your next chapter.</p>
        <h2>Let’s build a clear plan.</h2>
        <p>
          Bring your ideas, your property address and your questions. We’ll help
          you identify the next step.
        </p>
        <Link href='/contact' className='btn btn-primary btn-lg'>
          Discuss your project{' '}
          <ArrowUpRight size={18} className='ml-3' aria-hidden />
        </Link>
      </div>
    </section>
  );
}
export function HomeGuideTeaser() {
  return (
    <GuideSection
      eyebrow='Build with confidence'
      title='Before you build, get the full picture.'
      intro='Explore the process, understand your budget and follow the work in progress.'
    >
      <GuideCards />
    </GuideSection>
  );
}
export { styles as guideStyles };

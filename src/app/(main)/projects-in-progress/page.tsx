import type { Metadata } from 'next';
import {
  GuideShell,
  GuideHero,
  GuideSection,
  GuideCTA,
  PhotoSlot,
  GuideCards,
  guideStyles as s,
} from '@/components/build-guide/Guide';
export const metadata: Metadata = {
  title: 'Inside the Build | Fast Struct',
  description:
    'Follow Fast Struct work in progress. Our current projects are under construction; approved factory and site photography will be shared here.',
};
export default function ProjectsPage() {
  return (
    <GuideShell>
      <GuideHero
        eyebrow='Inside the build'
        title='See the work take shape.'
        intro='Our current projects are still under construction. We’re creating a place to share the work as it happens, with real photography and clearly identified stages.'
      >
        <span className={s.status}>Current projects: under construction</span>
      </GuideHero>
      <GuideSection
        id='guide-content'
        eyebrow='The factory floor'
        title='Where plans become structure.'
        intro='Factory photography will show framing, assemblies and the people behind the build.'
      >
        <PhotoSlot id='workshop' />
      </GuideSection>
      <GuideSection
        light
        eyebrow='Closer to the work'
        title='Progress, one stage at a time.'
        intro='These spaces are reserved for approved construction photographs. Project locations and details will be added when cleared for sharing.'
      >
        <div className={s.twoColumns}>
          <PhotoSlot id='framing' tall />
          <PhotoSlot id='site' tall />
        </div>
        <div className={s.note}>
          Construction photos will be labeled by stage. Model renderings belong
          in our model collection and will not be presented here as completed
          projects.
        </div>
      </GuideSection>
      <GuideSection
        eyebrow='The details matter'
        title='Look beyond the finished surface.'
      >
        <div className={s.twoColumns}>
          <PhotoSlot id='detail' tall />
          <div className={s.bodyCopy}>
            <p>
              A construction update can show more than an exterior. Connections,
              wall assemblies and on-site coordination help explain how a home
              comes together.
            </p>
            <p>
              As photographs are added, each will identify what is being shown
              and the stage of work. Completed-project galleries will follow
              when projects are ready to present.
            </p>
          </div>
        </div>
      </GuideSection>
      <GuideSection title='Plan your own next step.'>
        <GuideCards exclude='/projects-in-progress' />
      </GuideSection>
      <GuideCTA />
    </GuideShell>
  );
}

import type { Metadata } from 'next';
import {
  GuideShell,
  GuideHero,
  GuideSection,
  GuideCards,
  GuideCTA,
  PhotoSlot,
  guideStyles as s,
} from '@/components/build-guide/Guide';
export const metadata: Metadata = {
  title: 'Build With Us | Fast Struct',
  description:
    'Plan your California modular or panelized home: explore our process, budget considerations and work in progress.',
};
export default function BuildWithUsPage() {
  return (
    <GuideShell>
      <GuideHero
        eyebrow='A clearer path to your home'
        title='Good homes start with a clear plan.'
        intro='Your home starts long before construction. Explore what goes into the build, what shapes the budget and how to prepare for the next step.'
      />
      <GuideSection
        id='guide-content'
        eyebrow='Your starting point'
        title='Explore. Understand. Build.'
      >
        <GuideCards />
      </GuideSection>
      <GuideSection
        light
        eyebrow='From plans to progress'
        title='We’re building. You can follow along.'
        intro='Our current projects are under construction. This is where the real work will be documented, from the factory floor to the site.'
      >
        <PhotoSlot id='workshop' />
      </GuideSection>
      <GuideSection
        eyebrow='Designed around your property'
        title='Choose a starting point, not a limit.'
      >
        <div className={s.twoColumns}>
          <div className={s.bodyCopy}>
            <p>
              Explore our home models to compare layouts, bedrooms and living
              space. Then bring the conversation back to your property: access,
              site conditions and approvals help determine the right
              construction approach.
            </p>
            <p>
              For an ADU, consider how the new space connects with your existing
              home. For a primary residence, begin with the way you want to
              live. For a material-focused project, review the proposed
              assemblies and supporting documentation.
            </p>
          </div>
          <div>
            <p className={s.eyebrow}>Explore your options</p>
            <ul className={s.checklist}>
              <li>
                <a href='/modules'>Compare home models</a>
              </li>
              <li>
                <a href='/landing/adu'>Plan an ADU</a>
              </li>
              <li>
                <a href='/landing/modular'>Explore modular construction</a>
              </li>
              <li>
                <a href='/landing/non-combustible'>
                  Understand non-combustible construction
                </a>
              </li>
            </ul>
          </div>
        </div>
      </GuideSection>
      <GuideCTA />
    </GuideShell>
  );
}

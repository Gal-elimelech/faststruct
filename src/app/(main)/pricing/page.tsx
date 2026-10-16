import type { Metadata } from 'next';
import {
  GuideShell,
  GuideHero,
  GuideSection,
  GuideCTA,
  guideStyles as s,
} from '@/components/build-guide/Guide';
import { budgetItems } from '@/content/build-guide/content';
export const metadata: Metadata = {
  title: 'Planning Your Home Budget | Fast Struct',
  description:
    'Understand the cost components of modular and panelized home construction and prepare for a project-specific proposal.',
};
export default function PricingPage() {
  return (
    <GuideShell>
      <GuideHero
        eyebrow='Planning your budget'
        title='The home is part of the picture.'
        intro='A useful budget includes the building and the work needed to make it ready for your property. Start with a clear scope so you can compare proposals with confidence.'
      />
      <GuideSection
        id='guide-content'
        light
        eyebrow='Four parts to consider'
        title='Build your budget around the full scope.'
      >
        <div className={s.budgetGrid}>
          {budgetItems.map((item, i) => (
            <article className={s.budgetItem} key={item.title}>
              <p className={s.eyebrow}>0{i + 1} / Cost component</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className={s.note}>
          Pricing is project-specific. Ask for a written proposal identifying
          the inclusions, exclusions, allowances and owner responsibilities. A
          model image or floor area alone does not establish an installed price.
        </div>
      </GuideSection>
      <GuideSection
        eyebrow='Before comparing quotes'
        title='Make sure the scope matches.'
      >
        <div className={s.twoColumns}>
          <div className={s.bodyCopy}>
            <p>
              Two proposals with the same square footage may include very
              different work. Compare the foundation, utility connections,
              finish schedule, delivery, inspections and fees before comparing
              the total.
            </p>
            <p>
              Keep a separate allowance for unknown site conditions and
              owner-selected changes. Discuss its size with your project team
              rather than relying on a generic percentage.
            </p>
          </div>
          <div>
            <p className={s.eyebrow}>Ask these questions</p>
            <ul className={s.checklist}>
              <li>Which items are included, excluded or allowances?</li>
              <li>Who is responsible for plans, fees and site work?</li>
              <li>What can change the price or delivery schedule?</li>
              <li>How are changes approved and documented?</li>
              <li>Which milestone triggers each payment?</li>
            </ul>
          </div>
        </div>
      </GuideSection>
      <GuideSection
        light
        eyebrow='Prepare for a useful conversation'
        title='Bring the basics. We’ll discuss the next step.'
      >
        <div className={s.twoColumns}>
          <div className={s.bodyCopy}>
            <p>
              You do not need a finished design to start. Your property address,
              intended use, approximate size and budget range give us a
              practical starting point.
            </p>
            <p>
              If you have a survey, existing plans or information about
              utilities and access, let us know. We can discuss which documents
              will be useful for the review.
            </p>
          </div>
          <ul className={s.checklist}>
            <li>Property address and intended building location</li>
            <li>Preferred model or approximate floor area</li>
            <li>Bedrooms, bathrooms and intended use</li>
            <li>Budget range and preferred timing</li>
            <li>Known site conditions or access constraints</li>
          </ul>
        </div>
      </GuideSection>
      <GuideCTA />
    </GuideShell>
  );
}

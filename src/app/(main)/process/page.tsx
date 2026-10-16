import type { Metadata } from 'next';
import {
  GuideShell,
  GuideHero,
  GuideSection,
  GuideCTA,
  PhotoSlot,
  guideStyles as s,
} from '@/components/build-guide/Guide';
import { processSteps } from '@/content/build-guide/content';
export const metadata: Metadata = {
  title: 'From First Conversation to Handover | Fast Struct',
  description:
    'Understand the stages of a Fast Struct home project, including scope, approvals, site preparation, production and handover.',
};
export default function ProcessPage() {
  return (
    <GuideShell>
      <GuideHero
        eyebrow='Our process'
        title='Know what comes next.'
        intro='A well-planned build starts with clear decisions and a defined scope. Here is the path we discuss with you, adapted to your property and construction approach.'
      />
      <GuideSection
        id='guide-content'
        light
        eyebrow='A shared roadmap'
        title='Six stages. One coordinated plan.'
        intro='This is a planning guide. Your agreement and project schedule define the specific responsibilities, deliverables and sequence.'
      >
        <div className={s.steps}>
          {processSteps.map((step, i) => (
            <article className={s.step} key={step.title}>
              <span className={s.stepNumber}>0{i + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
              <div className={s.stepMeta}>
                <p>{step.owner}</p>
                <p>{step.output}</p>
              </div>
            </article>
          ))}
        </div>
      </GuideSection>
      <GuideSection
        eyebrow='Timing starts with context'
        title='A timeline that reflects your project.'
      >
        <div className={s.twoColumns}>
          <div className={s.bodyCopy}>
            <p>
              Approval timelines, utility coordination and site conditions can
              affect when construction begins. Factory work and on-site work
              have their own schedules, and may overlap when the project allows.
            </p>
            <p>
              When reviewing a timeline, ask what starts the clock, what is
              included and which dependencies are outside the construction
              team’s control.
            </p>
            <a href='/pricing' className='btn btn-primary btn-md mt-6'>
              Understand your project budget
            </a>
          </div>
          <PhotoSlot id='process' />
        </div>
      </GuideSection>
      <GuideCTA />
    </GuideShell>
  );
}

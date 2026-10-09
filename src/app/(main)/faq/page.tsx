import type { Metadata } from 'next';
import {
  GuideShell,
  GuideHero,
  GuideSection,
  GuideCTA,
  guideStyles as s,
} from '@/components/build-guide/Guide';
import { faqGroups } from '@/content/build-guide/content';
export const metadata: Metadata = {
  title: 'Questions Before You Build | Fast Struct',
  description:
    'Answers about modular and panelized homes, site access, approvals, budgets, materials and current construction progress.',
};
export default function FAQPage() {
  return (
    <GuideShell>
      <GuideHero
        eyebrow='Common questions'
        title='A little clarity goes a long way.'
        intro='Planning a home comes with questions. Start here, then talk with our team about the details that are specific to your property.'
      >
        <nav aria-label='Question categories' className={s.jumpLinks}>
          {faqGroups.map((group, i) => (
            <a key={group.title} href={`#questions-${i}`}>
              {group.title}
            </a>
          ))}
        </nav>
      </GuideHero>
      <GuideSection id='guide-content' light>
        {faqGroups.map((group, i) => (
          <section
            className={s.faqGroup}
            id={`questions-${i}`}
            style={{ scrollMarginTop: 100 }}
            key={group.title}
          >
            <h2>{group.title}</h2>
            <div>
              {group.items.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </GuideSection>
      <GuideCTA />
    </GuideShell>
  );
}

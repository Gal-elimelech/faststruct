import Link from 'next/link';
import { GuideSection, guideStyles as s } from './Guide';
export default function ModelPlanning() {
  return (
    <GuideSection
      eyebrow='From model to your property'
      title='Make this layout your starting point.'
      intro='Model imagery illustrates design options. Our current projects are under construction; final materials, finishes and dimensions are defined in your approved project documents.'
      light
    >
      <div className={s.budgetGrid}>
        <div className={s.budgetItem}>
          <h3>Check the fit.</h3>
          <p>
            Review the footprint, access, utilities and property-specific
            requirements with our team. A model floor plan is a design
            reference, not confirmation that it can be built on a particular
            lot.
          </p>
          <Link href='/process' className='btn btn-outline btn-md mt-6'>
            Explore the process
          </Link>
        </div>
        <div className={s.budgetItem}>
          <h3>Understand the total scope.</h3>
          <p>
            Ask about the building, foundation, site work, delivery and finish
            selections together. Your written project proposal establishes what
            is included and what remains your responsibility.
          </p>
          <Link href='/pricing' className='btn btn-outline btn-md mt-6'>
            Plan your budget
          </Link>
        </div>
      </div>
    </GuideSection>
  );
}

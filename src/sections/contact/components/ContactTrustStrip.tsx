import { Clock, ShieldCheck, BadgeCheck } from 'lucide-react';
import GoogleReviewBadge from '@/sections/landing/components/GoogleReviewBadge';
import type { IContactTrust } from '@/types/contact';

interface ContactTrustStripProps {
  trust: IContactTrust;
}

/** Trust signals shown next to the contact form: response time, no-commitment, licensing, reviews. */
const ContactTrustStrip = ({ trust }: ContactTrustStripProps) => {
  const items = [
    { icon: Clock, text: trust.responseTime },
    { icon: BadgeCheck, text: trust.noCommitment },
    { icon: ShieldCheck, text: trust.licensed },
  ];

  return (
    <div className='container-padding relative z-10 mx-auto flex flex-col items-center gap-6 pb-4'>
      <div className='flex flex-wrap items-center justify-center gap-3'>
        {items.map(({ icon: Icon, text }, idx) => (
          <span
            key={idx}
            className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-2 font-poppins text-sm text-light/85'>
            <Icon size={15} className='text-accent shrink-0' aria-hidden />
            {text}
          </span>
        ))}
      </div>
      <GoogleReviewBadge />
    </div>
  );
};

export default ContactTrustStrip;

import AnimatedHeading from '../text-animation/AnimatedHeading';
import { ENABLED_ROUTES } from '@/lib/routes';
import { IContactInfo, IContactSocial } from '@/types/contact';
import NavLink from '../navigation/NavLink';
import { ReactNode } from 'react';

const LetsBuildTogetherCTA = () => {
  return (
    <div className='flex flex-col gap-2 text-center'>
      <AnimatedHeading
        className='text-h2 font-bebas text-light'
        text="Let's build together"
      />
      <p className='text-h6 text-light'>
        Have a project in mind? Let&apos;s talk about how we can bring it to
        life.
      </p>
      <NavLink button={true} href='/contact'>
        Get in Touch
      </NavLink>
    </div>
  );
};

interface FooterSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  isLast?: boolean;
}

const FooterSection = ({
  title,
  children,
  className = '',
  isLast = false,
}: FooterSectionProps) => {
  return (
    <div
      className={`border-light flex flex-col gap-1 border-b-2 pb-4 ${!isLast ? 'md:border-r-2 md:pr-4' : ''} md:border-b-0 ${className}`}>
      <h3 className='font-semibold'>{title}</h3>
      {children}
    </div>
  );
};

interface FooterListProps {
  children: ReactNode;
}

const FooterList = ({ children }: FooterListProps) => {
  return <ul className='mt-2 space-y-2 text-sm'>{children}</ul>;
};

interface FooterLinksAndContactProps {
  info: IContactInfo;
  social: IContactSocial;
}

const FooterLinksAndContact = ({
  info,
  social,
}: FooterLinksAndContactProps) => {
  const footerLinks = ENABLED_ROUTES.filter((route) => !route.isButton);
  return (
    <div className='flex w-full flex-col gap-4 md:w-auto md:flex-row'>
      <FooterSection title='Company'>
        <FooterList>
          {footerLinks.map((route) => (
            <li key={route.href}>
              <NavLink href={route.href} style={false}>
                {route.title}
              </NavLink>
            </li>
          ))}
        </FooterList>
      </FooterSection>

      <FooterSection title='Contact'>
        <FooterList>
          <li>{info.address.street}</li>
          <li>{info.address.city}</li>
          <li>
            <a
              href={`mailto:${info.email}`}
              className='hover:text-accent transition-colors'>
              {info.email}
            </a>
          </li>
          <li>
            <a
              href={`tel:${info.phone.link}`}
              className='hover:text-accent transition-colors'>
              {info.phone.display}
            </a>
          </li>
        </FooterList>
      </FooterSection>

      {social.links.length > 0 && (
        <FooterSection title={social.title} isLast={true}>
          <FooterList>
            {social.links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  className='hover:text-accent transition-colors'>
                  {link.name}
                </a>
              </li>
            ))}
          </FooterList>
        </FooterSection>
      )}
    </div>
  );
};

export { LetsBuildTogetherCTA, FooterLinksAndContact };

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
  
  // Tinitingnan kung may laman ang social links para malaman kung ano ang huling column
  const hasSocial = social && social.links && social.links.length > 0;

  return (
    <div className='flex w-full flex-col gap-4 md:w-auto md:flex-row'>
      
      <FooterSection title='Quick Links'>
        <FooterList>
          <li>
            <a 
              href='https://www.faststruct.com/landing/adu' 
              className='hover:text-accent transition-colors'
            >
              ADU Builder Bay Area
            </a>
          </li>
          <li>
            <a 
              href='https://www.faststruct.com/landing/modular' 
              className='hover:text-accent transition-colors'
            >
              Modular Homes Bay Area
            </a>
          </li>
          <li>
            <a 
              href='https://blog.faststruct.com' 
              className='hover:text-accent transition-colors'
            >
              Blog
            </a>
          </li>
        </FooterList>
      </FooterSection>

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

      {/* Kung walang social links, ang Contact section ang magiging 'isLast' para mawala ang kanang border */}
      <FooterSection title='Contact' isLast={!hasSocial}>
        <FooterList>
          <li>
            <address className='not-italic'>
              <span>{info.address.street}</span>
              <br />
              <span>{info.address.city}</span>
            </address>
          </li>
          <li>
            {/* Binago: Ginamit ang info.email[0] dahil array ang "email" sa iyong JSON data */}
            <a
              href={`mailto:${info.email[0]}`}
              className='hover:text-accent transition-colors'>
              {info.email[0]}
            </a>
          </li>
          <li>
            <a
              href={`tel:${info.phone.link}`}
              className='no-swap hover:text-accent transition-colors'>
              {info.phone.display}
            </a>
          </li>
        </FooterList>
      </FooterSection>

      {hasSocial && (
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

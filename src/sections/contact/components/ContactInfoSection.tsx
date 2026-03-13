import { motion } from 'motion/react';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import FadeInParagraph from '@/components/text-animation/FadeInParagraph';
import ContactInfoItem from './ContactInfoItem';
import { IContactForm, IContactInfo } from '@/types/contact';

interface ContactInfoSectionProps {
  form: IContactForm;
  info: IContactInfo;
  isInView: boolean;
}

const ContactInfoSection = ({
  form,
  info,
  isInView,
}: ContactInfoSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.8 }}
      className='flex flex-col gap-8'>
      <div>
        <AnimatedHeading
          text={form.title}
          className='text-h2 font-bebas text-light'
          revealColor='dark'
        />
        <FadeInParagraph className='text-h6 text-light/80 mt-4'>
          {form.description}
        </FadeInParagraph>
      </div>

      <div className='flex flex-col gap-6'>
        <ContactInfoItem icon='fa-solid fa-location-dot' title='Address'>
          <p className='text-h6 text-light/80'>
            {info.address.street}
            <br />
            {info.address.city}
          </p>
        </ContactInfoItem>

        <ContactInfoItem icon='fa-solid fa-envelope' title='Email'>
          <a
            href={`mailto:${info.email}`}
            className='text-h6 text-light/80 hover:text-accent transition-colors'>
            {info.email}
          </a>
        </ContactInfoItem>

        <ContactInfoItem icon='fa-solid fa-phone' title='Phone'>
          <a
            href={`tel:${info.phone.link}`}
            className='text-h6 text-light/80 hover:text-accent transition-colors'>
            {info.phone.display}
          </a>
        </ContactInfoItem>

        <ContactInfoItem icon='fa-solid fa-certificate' title='License'>
          <div className='flex flex-col gap-1'>
            {info.license.map((license, index) => (
              <p
                key={index}
                className='text-h6 text-light/80 whitespace-nowrap'>
                {license}
              </p>
            ))}
          </div>
        </ContactInfoItem>
      </div>

      {/* Google Maps Embed */}
      <div className='mt-6'>
        <h4 className='text-h5 font-bebas text-light mb-4'>Location</h4>
        <div className='border-accent/20 h-[300px] w-full overflow-hidden rounded-lg border'>
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              `${info.address.street}, ${info.address.city}`
            )}&output=embed`}
            width='100%'
            height='100%'
            style={{ border: 0 }}
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            className='h-full w-full'
            title='Fast Struct Location'
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfoSection;

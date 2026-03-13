import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Img,
} from '@react-email/components';
import CSSConstants from '@/lib/css-constants';
import { env } from '@/lib/env';

interface ContactConfirmationEmailProps {
  name: string;
}

export default function ContactConfirmationEmail({
  name,
}: ContactConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Logo Section */}
          <Section style={logoSection}>
            <Img
              src={`${env.siteUrl}/assets/logo/logo-full.png`}
              alt='Fast Struct Logo'
              width='200'
              height='auto'
              style={logo}
            />
          </Section>

          <Hr style={hr} />

          <Heading style={h1}>Thank You for Contacting Us</Heading>
          <Text style={intro}>Hi {name},</Text>
          <Text style={message}>
            Thank you for reaching out to Fast Struct. We have received your
            message and will get back to you soon.
          </Text>
          <Text style={message}>
            Our team is committed to providing you with the best service, and we
            appreciate you taking the time to contact us.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            This is an automated confirmation email. Please do not reply to this
            message.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Import colors from CSSConstants
const colors = CSSConstants.colors;

// Fonts (matching website)
const fonts = {
  poppins:
    'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
  bebas: 'Bebas Neue, "Arial Black", sans-serif',
};

// Styles
const main = {
  fontFamily: fonts.poppins,
};

const container = {
  backgroundColor: colors.white,
  margin: '0 auto',
  padding: '0',
  marginBottom: '64px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  maxWidth: '600px',
};

const logoSection = {
  padding: '32px 48px',
  backgroundColor: colors.dark,
  borderRadius: '8px 8px 0 0',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
  display: 'block',
};

const h1 = {
  color: colors.dark,
  fontSize: '28px',
  fontWeight: 'bold',
  fontFamily: fonts.bebas,
  margin: '40px 48px 16px',
  padding: '0',
  textAlign: 'center' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.02em',
};

const intro = {
  color: colors.dark,
  fontSize: '18px',
  lineHeight: '24px',
  margin: '0 48px 16px',
  fontFamily: fonts.poppins,
  fontWeight: '500',
};

const message = {
  color: '#666',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 48px 16px',
  fontFamily: fonts.poppins,
};

const hr = {
  borderColor: colors.accent + '40',
  borderWidth: '1px',
  margin: '32px 0',
};

const footer = {
  color: '#999',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '32px',
  padding: '0 48px 32px',
  fontFamily: fonts.poppins,
};

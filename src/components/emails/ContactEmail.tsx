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

interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

export default function ContactEmail({
  name,
  email,
  phone,
  address,
  message,
}: ContactEmailProps) {
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

          <Heading style={h1}>New Contact Form Submission</Heading>
          <Text style={intro}>
            You have received a new message from your website contact form.
          </Text>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>Name:</Text>
            <Text style={value}>{name}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Email:</Text>
            <Text style={value}>
              <a href={`mailto:${email}`} style={link}>
                {email}
              </a>
            </Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Phone:</Text>
            <Text style={value}>
              <a href={`tel:${phone}`} style={link}>
                {phone}
              </a>
            </Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Address:</Text>
            <Text style={value}>{address}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Message:</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            This email was sent from your website contact form.
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
  color: '#666',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 48px 32px',
  textAlign: 'center' as const,
  fontFamily: fonts.poppins,
};

const hr = {
  borderColor: colors.accent + '40',
  borderWidth: '1px',
  margin: '32px 0',
};

const section = {
  padding: '0 48px',
  marginBottom: '24px',
};

const label = {
  color: colors.dark,
  fontSize: '12px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  fontFamily: fonts.poppins,
};

const value = {
  color: colors.dark,
  fontSize: '16px',
  margin: '0',
  lineHeight: '24px',
  fontFamily: fonts.poppins,
};

const link = {
  textDecoration: 'none',
};

const messageText = {
  color: colors.dark,
  fontSize: '16px',
  margin: '0',
  lineHeight: '24px',
  whiteSpace: 'pre-wrap' as const,
  backgroundColor: colors.light + '40',
  padding: '16px',
  borderRadius: '4px',
  border: `1px solid ${colors.accent}40`,
  fontFamily: fonts.poppins,
};

const footer = {
  color: '#999',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '32px',
  padding: '0 48px 32px',
  fontFamily: fonts.poppins,
};

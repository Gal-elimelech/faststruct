import { Html, Head, Body, Text } from '@react-email/components';

interface ContactConfirmationEmailProps {
  name: string;
}

export default function ContactConfirmationEmail({
  name,
}: ContactConfirmationEmailProps) {
  return (
    <Html lang='en'>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif', color: '#222222' }}>
        <Text>Hi {name},</Text>
        <Text>
          Thank you for contacting Fast Struct. We received your inquiry and a
          member of our team will follow up shortly.
        </Text>
        <Text>
          If you would like to add any information about your project, simply
          reply to this email.
        </Text>
        <Text>Fast Struct Inc.</Text>
      </Body>
    </Html>
  );
}

import Script from 'next/script';

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script strategy='afterInteractive'>
        {`var $wc_load=function(a){return JSON.parse(JSON.stringify(a))},$wc_leads=$wc_leads||{doc:{url:$wc_load(document.URL),ref:$wc_load(document.referrer),search:$wc_load(location.search),hash:$wc_load(location.hash)}};`}
      </Script>
      <Script
        src="//s.ksrndkehqnwntyxlhgto.com/159443.js"
        strategy='afterInteractive'
      />
      <main className='relative z-0'>{children}</main>
    </>
  );
}

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className='relative z-0'>{children}</main>
    </>
  );
}

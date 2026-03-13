interface ContactInfoItemProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

const ContactInfoItem = ({ icon, title, children }: ContactInfoItemProps) => {
  return (
    <div className='flex items-start gap-4'>
      <div className='bg-accent/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg'>
        <i className={`${icon} text-accent text-xl`}></i>
      </div>
      <div>
        <h4 className='text-h5 font-bebas text-light mb-1'>{title}</h4>
        {children}
      </div>
    </div>
  );
};

export default ContactInfoItem;

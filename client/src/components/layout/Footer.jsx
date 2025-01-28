const Footer = () => {
  return (
    <footer className='absolute bottom-0 left-0 w-full text-center bg-transparent text-text-light text-sm mb-1'>
      © {new Date().getFullYear()} <span className='font-bold'>Province Trade Hub</span>
      <br /> All rights reserved.
    </footer>
  );
};

export default Footer;

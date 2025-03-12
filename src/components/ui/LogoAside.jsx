import { Image } from '@mantine/core';

function LogoAside({ isExpanded }) {
  const logoSrc = isExpanded ? "matioo.png" : "/logomatioo.png";

  return (
    <Image
      radius="md"
      src={logoSrc}
      className='h-[25px] max-w-[6em]'
    />
  );
}

export default LogoAside;

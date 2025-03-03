import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import Img from './components/ui/Img';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication"  centered>
        {/* <AuthenticationForm /> */
        
        <Img/>
        
        
        
        }

      </Modal>

      <Button variant="default" className='mt-3' onClick={open}>
        Open centered Modal
      </Button>
    </>
  );
}

export default Demo;
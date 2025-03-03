import { useState } from 'react';
import { Spoiler } from '@mantine/core';
import Img from './components/ui/Img';

export default function Muestreo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Spoiler
      showLabel="Show more"
      hideLabel="Hide details"
      expanded={expanded}
      onExpandedChange={setExpanded}
      maxHeight={200}
      styles={{
        control: {
          color: ''
        },
      }}
    >
      {/* Spoiler content */}

      <div className='flex gap-20 justify-center  m-auto my-2'>
      <h2 className='text-2xl mb-3'>Hola murgaaa</h2>
      <Img className='h-[100px]'></Img>

      </div>
      
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste aspernatur architecto aliquid vero quos totam quibusdam corporis omnis? Sequi voluptates repellat nulla! Molestias, voluptates. Accusantium consequatur, quos optio necessitatibus quia ipsum quas fuga atque et laboriosam, neque nobis voluptates reprehenderit cupiditate nihil beatae quaerat corporis aliquid fugiat architecto facere totam. Rem, labore error reprehenderit nemo repellendus debitis, doloribus aliquam quaerat, incidunt provident placeat impedit. Ipsam voluptate aperiam sit, ducimus amet eos consequuntur recusandae in, doloremque voluptatum earum cupiditate dignissimos officiis commodi delectus eum incidunt velit exercitationem necessitatibus ab dolore libero sequi veritatis. Amet quam velit nisi, molestiae sequi incidunt, placeat a, quia nihil enim molestias pariatur fuga! Similique porro earum ipsum a, vero iste voluptate. Recusandae nesciunt repudiandae porro, praesentium quaerat vero nemo quae id, beatae minus amet fuga quod autem expedita, laboriosam earum veritatis ad quisquam cupiditate atque nostrum. Quasi mollitia assumenda animi illo laboriosam optio, praesentium nulla iure tenetur cupiditate voluptas nesciunt hic quae quibusdam molestias laborum? Debitis architecto impedit in libero magnam odio facilis a dolore? Veritatis, deserunt possimus asperiores quae voluptate amet porro, minima natus illo officia delectus. Placeat suscipit animi distinctio dolorem excepturi reprehenderit, hic sit dolores molestias natus ipsum, vero in ratione, ullam tempora.</p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque eos voluptatibus repellat earum tempore, accusamus consequuntur nulla, repellendus aperiam quis mollitia culpa saepe quia, aliquam fuga consectetur hic fugit! Quam!</p>
      {/* Content here */}
    </Spoiler>
  );
}

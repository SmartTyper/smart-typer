import { FC } from 'common/types/types';

const ArCamera: FC = () => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
    <a-scene embedded arjs>
      <a-box position='0 0.5 0' material='opacity: 0.5;'></a-box>
      <a-marker-camera preset='hiro'></a-marker-camera>
    </a-scene>
    `,
      }}
    />
  );
};

export { ArCamera };

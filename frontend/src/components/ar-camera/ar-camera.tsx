import { FC } from 'common/types/types';

const ArCamera: FC = () => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
    <a-scene stats embedded arjs='trackingMethod: best; debugUIEnabled: false'>
  	<a-marker preset="hiro">
      <a-box position='0 1 0' material='color: red;'>
        <a-animation attribute="rotation"
          dur="2000"
          fill="forwards"
          from="0 0 0"
          to="360 360 360"
          repeat="indefinite"></a-animation>
      </a-box>
      </a-entity>
  	</a-marker>
  	<a-entity camera></a-entity>
    </a-scene>
    `,
      }}
    />
  );
};

export { ArCamera };

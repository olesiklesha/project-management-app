import React from 'react';
import ReactPlayer from 'react-player/youtube';

function YoutubeIframe() {
  return (
    <div style={{ position: 'relative', paddingTop: '56.25%', width: '100%', height: '100%' }}>
      <ReactPlayer
        width="100%"
        height="100%"
        url="https://www.youtube.com/watch?v=f3Wei8Oyga8"
        style={{ position: 'absolute', top: 0 }}
      />
    </div>
  );
}
export default YoutubeIframe;

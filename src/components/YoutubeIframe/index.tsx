import React from 'react';
import ReactPlayer from 'react-player/youtube';

function YoutubeIframe() {
  return (
    <div style={{ position: 'relative', paddingTop: '56.25%', width: '100%', height: '100%' }}>
      <ReactPlayer
        width="100%"
        height="100%"
        url="https://www.youtube.com/watch?v=AGD_-XT0dDo&t=2875s"
        style={{ position: 'absolute', top: 0 }}
      />
    </div>
  );
}
export default YoutubeIframe;

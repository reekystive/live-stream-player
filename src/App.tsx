import { Typography } from '@mui/material';
import { FC } from 'react';
import { LiveVideoPlayer } from './components/LiveVideoPlayer/LiveVideoPlayer.tsx';

const testVideoUrl = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4';

const App: FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 bg-slate-100 p-4">
      <Typography variant="h5" className="uppercase">
        Live Stream Player
      </Typography>
      <LiveVideoPlayer
        videoProps={{
          src: testVideoUrl,
        }}
        className="aspect-video w-full max-w-4xl"
      ></LiveVideoPlayer>
    </div>
  );
};

export { App };

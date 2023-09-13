import {
  Fullscreen,
  Pause,
  PictureInPictureAltRounded as PictureInPicture,
  PlayArrow,
  Refresh,
} from '@mui/icons-material';
import { Paper } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { LiveStreamingChip } from './LiveStreamingChip.tsx';
import styles from './LiveVideoPlayer.module.scss';
import { VideoControlButton } from './VideoControlButton.tsx';

type HTMLVideoProps = React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;

function getTimeStringFromSeconds(seconds: number): string {
  const flooredSeconds = Math.floor(seconds);
  const minutes = Math.floor(flooredSeconds / 60);
  const secondsRemain = flooredSeconds % 60;
  return `${minutes.toString()}:${secondsRemain.toString().padStart(2, '0')}`;
}

const LiveVideoPlayer: FC<{
  videoProps?: HTMLVideoProps;
  onRefreshClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}> = (props) => {
  const [playing, setPlaying] = useState(false);
  const [currentTimeString, setCurrentTimeString] = useState('0:00'); // in seconds
  const videoRef = useRef<HTMLVideoElement>(null);
  const fullscreenElementRef = useRef<HTMLDivElement>(null);

  console.debug('rerendering');

  // play/pause effect
  useEffect(() => {
    console.debug('running play/pause effect');
    if (!videoRef.current) {
      return;
    }
    const video = videoRef.current;
    const onVideoPlay = () => {
      console.debug('onplay');
      setPlaying(true);
    };
    const onVideoPause = () => {
      console.debug('onpause');
      setPlaying(false);
    };
    video.addEventListener('play', onVideoPlay);
    video.addEventListener('pause', onVideoPause);
    return () => {
      video.removeEventListener('play', onVideoPlay);
      video.removeEventListener('pause', onVideoPause);
    };
  }, []);

  // user gesture effect
  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    const video = videoRef.current;
    const clickHandler = () => {
      console.log('video onclick');
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    };
    video.addEventListener('click', clickHandler);
    return () => {
      video.removeEventListener('click', clickHandler);
    };
  }, []);

  // update time effect
  useEffect(() => {
    console.debug('running update time effect');
    if (!videoRef.current) {
      return;
    }
    const video = videoRef.current;
    const onVideoTimeUpdate = () => {
      console.debug('ontimeupdate');
      const newTimeString = getTimeStringFromSeconds(video.currentTime);
      console.debug('new time: %o, string: %o', video.currentTime, newTimeString);
      setCurrentTimeString(newTimeString);
    };
    video.addEventListener('timeupdate', onVideoTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', onVideoTimeUpdate);
    };
  }, []);

  const playClickHandler: React.MouseEventHandler<HTMLButtonElement> = (_event) => {
    if (playing) {
      videoRef?.current?.pause();
    } else {
      videoRef?.current?.play();
    }
  };

  const pictureInPictureHandler: React.MouseEventHandler<HTMLButtonElement> = (_event) => {
    videoRef?.current?.requestPictureInPicture();
  };

  const fullscreenHandler: React.MouseEventHandler<HTMLButtonElement> = (_event) => {
    if (!fullscreenElementRef.current) {
      return;
    }
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      fullscreenElementRef.current.requestFullscreen();
    }
  };

  return (
    <Paper className={`aspect-video overflow-clip ${props.className ?? ''}`}>
      <div ref={fullscreenElementRef} className="relative h-full w-full">
        {/* video tag wrapper */}
        <div className="h-full w-full bg-slate-800">
          <video
            autoPlay
            muted
            loop
            ref={videoRef}
            className={`object-fit h-full w-full ${styles.hideTimeline}`}
            {...props.videoProps}
          ></video>
        </div>
        {/* video controls overlay */}
        <div className="absolute bottom-0 left-0 w-full text-white">
          {/* shadow layer */}
          <div className={`${styles.controlShadow} pointer-events-none h-[6rem]`}></div>
          {/* button layer */}
          <div className={styles.controlBar}>
            {/* left buttons */}
            <div className="flex flex-row items-center gap-4">
              <VideoControlButton onClick={playClickHandler}>
                {playing ? <Pause></Pause> : <PlayArrow></PlayArrow>}
              </VideoControlButton>
              <div className="select-none text-sm">{currentTimeString}</div>
              <LiveStreamingChip />
            </div>
            {/* right buttons */}
            <div className="flex flex-row items-center">
              {/* make this one smaller. this will looks better! */}
              <VideoControlButton size={20} onClick={pictureInPictureHandler}>
                <PictureInPicture />
              </VideoControlButton>
              <VideoControlButton onClick={props.onRefreshClick}>
                <Refresh />
              </VideoControlButton>
              <VideoControlButton onClick={fullscreenHandler}>
                <Fullscreen />
              </VideoControlButton>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export { LiveVideoPlayer };

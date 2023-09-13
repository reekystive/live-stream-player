import { IconButton } from '@mui/material';
import { FC } from 'react';

const VideoControlButton: FC<{
  children?: React.ReactNode;
  size?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = (props) => {
  return (
    <IconButton
      color="inherit"
      onClick={props.onClick}
      sx={{
        width: 40,
        height: 40,
        '& .MuiSvgIcon-root': {
          width: props.size ?? 22,
          height: props.size ?? 22,
        },
      }}
    >
      {props.children ?? null}
    </IconButton>
  );
};

export { VideoControlButton };

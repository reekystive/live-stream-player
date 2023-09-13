import { FC } from 'react';

const LiveStreamingChip: FC = () => {
  return (
    <div
      className="flex flex-row items-center rounded-full
               bg-slate-500 bg-opacity-40 px-[8px] py-[2px] backdrop-blur-md"
    >
      <div className="me-[6px] h-[10px] w-[10px] rounded-full bg-red-500"></div>
      <div className="select-none text-xs">Live</div>
    </div>
  );
};

export { LiveStreamingChip };

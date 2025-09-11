import React from 'react'
import { cn } from '../lib/utils';

const GridBackground = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="relative flex h-[100rem] w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      >{children}</div>
    </div>
  );
}

export default GridBackground
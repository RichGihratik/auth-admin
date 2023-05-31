import { ReactNode } from 'react';

export function Block(props: { className?: string; children: ReactNode }) {
  return (
    <div
      className={
        'h-full w-full border-b-2 border-r-2 border-gray-400 shadow-2xl bg-zinc-100 rounded-3xl ' +
        props.className ?? ''
      }
    >
      {props.children}
    </div>
  );
}

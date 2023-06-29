import React from 'react';
import { FiInfo } from 'react-icons/fi';

export default function EmptyInfo(props: { title: string; data: [] }) {
  if (props.data?.length === 0) {
    return (
      <div className="h-[70vh] flex items-center justify-center flex-col gap-2">
        <FiInfo className="text-[24px] inactive-text" />
        <p className="inactive-text text-[20px]">{props.title}</p>
      </div>
    );
  }
}

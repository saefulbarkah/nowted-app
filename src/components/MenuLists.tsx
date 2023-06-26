import React, { FC } from 'react';

interface MenuListsProps {
  children: React.ReactNode;
  title: string;
}

const MenuLists: FC<MenuListsProps> = ({ children, title }) => {
  return (
    <div className="overflow-y-auto w-[350px] h-screen bg-acent-2 px-5 pb-[23px]">
      <div className="sticky top-0 h-24 flex items-center bg-acent-2">
        <h2 className="text-[22px] font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
};

export default MenuLists;

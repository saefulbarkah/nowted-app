import React, { FC } from 'react';

interface MenuListsProps {
  children: React.ReactNode;
  title: string | JSX.Element;
}

const MenuLists: FC<MenuListsProps> = ({ children, title }) => {
  return (
    <div className="overflow-y-auto w-[350px] h-screen bg-acent-2 px-5 pb-[23px]">
      <div className="sticky top-0 h-24 flex items-center bg-acent-2">
        <div className="font-semibold max-w-full text-[22px]">{title}</div>
      </div>
      {children}
    </div>
  );
};

export default MenuLists;

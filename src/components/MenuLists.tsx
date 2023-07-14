import React, { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import { MenuListsMobile } from './Mobile';

export interface MenuListsProps {
  children: React.ReactNode;
  title: string | JSX.Element;
}

const MenuLists: FC<MenuListsProps> = ({ children, title }) => {
  const isBigScreen = useMediaQuery({ minWidth: 1024 });
  if (!isBigScreen)
    return <MenuListsMobile title={title}>{children}</MenuListsMobile>;
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

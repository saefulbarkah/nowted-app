import { FiStar, FiTrash, FiArchive } from "react-icons/fi";
import Link from "next/link";

export type MoreType = {
  name: string;
  href: string;
  icon: JSX.Element;
}[];

const MoreMenu: React.FC = () => {
  const more: MoreType = [
    { name: "Favorites", href: "/favorites", icon: <FiStar /> },
    { name: "Trash", href: "/trash", icon: <FiTrash /> },
    { name: "Archived Notes", href: "/archived-notes", icon: <FiArchive /> },
  ];

  return (
    <div className="flex flex-col space-y-[8px]">
      <div className="flex justify-between items-center px-[30px] inactive-text">
        <p className="text-[14px] font-semibold">More</p>
      </div>
      <div className="flex flex-col gap-[5px]">
        {more.map((item, i) => (
          <Link
            className="inactive-text hover:text-white py-[10px] hover:bg-white/[3%] transition px-[30px] rounded-md"
            href={item.href}
            key={i}
          >
            <div className="flex items-center gap-[15px]">
              <div className="text-[20px]">{item.icon}</div>
              <p className="truncate">{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoreMenu;

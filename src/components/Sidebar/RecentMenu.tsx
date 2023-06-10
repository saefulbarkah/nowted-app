import { slug } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { FiFileText } from "react-icons/fi";

export type fileType = {
  id: string | number;
  name: string;
}[];

const files: fileType = [
  { id: 12312421, name: "Reflection on the Month of June" },
  { id: 121115, name: "Project proposal" },
  { id: 1231255, name: "Travel itinerary" },
];

const RecentMenu: React.FC = () => {
  return (
    <div className="flex flex-col space-y-[8px]">
      <p className="text-[14px] font-semibold inactive-text px-[30px]">
        Recents
      </p>
      <div className="flex flex-col gap-[5px]">
        {files.map((item, i) => (
          <React.Fragment key={i}>
            <Link
              className="flex items-center py-[10px] space-x-[15px] inactive-text hover:text-white hover:bg-white/[3%] transition px-[30px] rounded-md"
              href={`/note/${item.id}`}
            >
              <div>
                <FiFileText className="text-[20px]" />
              </div>
              <p className="truncate text-[16px]">{item.name}</p>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default RecentMenu;

import React from "react";
import { Card, CardContent } from "../ui/card";

export const NoteMenu = () => {
  return (
    <div className="fixed top-0 left-0 bottom-0 ml-[305px] w-[350px] custom-scrollbar bg-foreColor/80">
      <div className="flex flex-col h-full my-[30px] px-[20px]">
        <h2 className="text-[22px] font-semibold">Personal</h2>
        <div className="flex flex-col pb-[30px] mt-[30px] gap-[20px]">
          {Array(5)
            .fill(null)
            .map((item, i) => (
              <Card className="bg-white/[3%] border-none hover:bg-white/[7%] transition cursor-pointer">
                <CardContent className="p-[20px]">
                  <h2 className="text-white line-clamp-2 text-[18px] font-semibold leading-7">
                    My Favorite Memories from Childhood
                  </h2>
                  <div className="flex gap-[10px] inactive-text mt-[10px]">
                    <p className="font-normal">31/12/2022</p>
                    <p className="truncate font-normal">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Laudantium suscipit molestiae quo eos culpa assumenda
                      excepturi id nam nobis veniam, adipisci dicta odit ab quos
                      ullam molestias cupiditate aut repellat!
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

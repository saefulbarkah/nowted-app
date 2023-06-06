import React from "react";

type Props = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props) {
  const id = params.id;
  return {
    title: "Note id :" + id,
  };
}

function page({ params }: any) {
  console.log(params);
  return (
    <div>
      content
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto, a
        consequatur minus repudiandae enim alias voluptatum, aliquid quod
        officia corporis labore voluptates cumque magnam numquam molestiae,
        veritatis asperiores corrupti est.
      </p>
    </div>
  );
}

export default page;

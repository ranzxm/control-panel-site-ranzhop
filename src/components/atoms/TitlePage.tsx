import React from "react";
import { Separator } from "../ui/separator";

type TitlePageProps = {
  text: string;
  useSeperator?: true | false;
};

const TitlePage = ({ text, useSeperator }: TitlePageProps) => {
  return (
    <div>
      <div className="title text-3xl font-bold">
        <h1>{text}</h1>
      </div>
      {useSeperator && <Separator className="border mt-4" />}
    </div>
  );
};

export default TitlePage;

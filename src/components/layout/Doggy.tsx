import Image from "next/image";
import { memo } from "react";
import classes from "./Doggy.module.css";

const Doggy = () => {
  return (
    <Image
      className={`rounded-xl ${classes.doggy}`}
      src="/dog.jpg"
      alt="Doggy"
      width={602}
      height={984}
    />
  );
};

export default memo(Doggy);

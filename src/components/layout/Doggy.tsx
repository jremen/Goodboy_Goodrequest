import Image from "next/image";
import { memo } from "react";
import classes from "./Doggy.module.css";

const Doggy = () => {
  return (
    <div className={`rounded-xl ${classes.doggy}`}>
      <Image src="/dog.jpg" alt="Doggy" width={602} height={984} />
    </div>
  );
};

export default memo(Doggy);

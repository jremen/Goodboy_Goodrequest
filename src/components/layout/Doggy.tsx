import Image from "next/image";
import { memo } from "react";

const Doggy = () => {
  return <Image src="/dog.jpg" alt="Doggy" width={602} height={984} />;
};

export default memo(Doggy);

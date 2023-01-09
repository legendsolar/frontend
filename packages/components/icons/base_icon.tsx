import { Image } from "../utils/image";

export const BaseIcon = ({ sx = {}, src, alt = "image" }) => {
  return (
    <Image
      src={src}
      style={{ width: "25px", height: "25px", ...sx }}
      alt={alt}
    ></Image>
  );
};

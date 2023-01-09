// image component that works with Next and React

export const Image = ({ src, style = {}, alt = "image" }) => {
  if (process.env.NEXT_PUBLIC_BUILD) {
    return <img src={src?.src} style={style} alt={alt}></img>;
  } else {
    return <img src={src} style={style} alt={alt}></img>;
  }
};

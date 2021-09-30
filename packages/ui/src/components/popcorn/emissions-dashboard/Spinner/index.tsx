import * as SVGLoaders from 'svg-loaders-react';

const Spinner = ({ size = 10 }) => {
  return (
    <SVGLoaders.Oval
      stroke="#666666"
      className={`mx-auto h-${size} w-${size}`}
    />
  );
};

export default Spinner;

import {useMemo} from 'react';
import {useWindowDimensions} from 'react-native';

const DESIGN_WIDTH = 393;

const useScale = () => {
  const {width, height} = useWindowDimensions();

  const scale = useMemo(() => {
    const targetDimension = width < height ? width : height;
    return targetDimension / DESIGN_WIDTH;
  }, [height, width]);

  return {width, height, scale};
};

export default useScale;

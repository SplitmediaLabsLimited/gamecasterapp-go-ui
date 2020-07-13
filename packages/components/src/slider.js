import '@reach/slider/styles.css';
import { forwardRef } from 'react';
import {
  Slider as RSlider,
  SliderTrack,
  SliderTrackHighlight,
  SliderHandle,
  SliderMarker,
} from '@reach/slider';

/** @jsx jsx */
import { jsx } from '@go-ui/core';

export const Slider = forwardRef(function Slider(props, ref) {
  return (
    <RSlider
      sx={{
        'div[data-reach-slider-track]': {
          variant: 'forms.slider.track',
        },
        'div[data-reach-slider-track-highlight]': {
          variant: 'forms.slider.trackHighlight',
        },
        'div[data-reach-slider-handle]': {
          position: 'relative',
          backgroundColor: 'white',
          borderColor: 'white',
          cursor: 'grab',
          zIndex: 0,

          transition: 'box-shadow 0.2s ease-in-out',

          '&:focus': {
            outline: 'none',
          },

          variant: 'forms.slider.handle',
        },
      }}
      {...props}
      ref={ref}>
      <SliderTrack>
        <SliderTrackHighlight />
        <SliderHandle />
      </SliderTrack>
    </RSlider>
  );
});

export { SliderTrack, SliderTrackHighlight, SliderHandle, SliderMarker };

export default Slider;

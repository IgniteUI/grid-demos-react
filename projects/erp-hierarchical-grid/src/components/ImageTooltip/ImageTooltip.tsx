import "./ImageTooltip.scss";
import { useState } from 'react';
import {
  flip,
  offset,
  shift,
  useFloating,
  useTransitionStyles,
} from '@floating-ui/react';

export const HoverTooltip = ({ tooltipText, imageUrl }: { tooltipText?: string, imageUrl?: string }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isTooltipOpen,
    onOpenChange: setIsTooltipOpen,
    middleware: [offset(8), flip(), shift()],
    placement: 'right-start',
  });

  const { styles: transitionStyles } = useTransitionStyles(context, {
    duration: {
      open: 800,
    },
  });

  return (
    <div>
      <img
        src={imageUrl}
        alt={tooltipText}
        ref={refs.setReference}
        style={{
          height: "22px",
          width: "fit-content",
          borderRadius: "4px"
        }}
        onMouseEnter={() => setIsTooltipOpen(true)}
        onMouseLeave={() => setIsTooltipOpen(false)}
      />

      { isTooltipOpen &&
        <div
          className="imageTooltip"
          ref={refs.setFloating}
          style={{ ...floatingStyles, ...transitionStyles }}>
            <div className="tooltip-header"> {tooltipText} </div>
            <div className="tooltip-body">
              <img src={imageUrl} alt={tooltipText}/>
            </div>
        </div>
      }
    </div>
  );
};


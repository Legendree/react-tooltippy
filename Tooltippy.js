import React from 'react';

export const Tooltippy = ({
  className,
  classNameTooltip,
  children,
  tooltipContent,
  padding = 15,
  onClick = () => {},
}) => {
  const [mouseState, setMouseState] = React.useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [tooltipSize, setTooltipSize] = React.useState({
    width: 0,
    height: 0,
  });
  const [contentLocation, setContentLocation] = React.useState({ x: 0, y: 0 });

  const tooltipRef = React.useRef(null);
  const contentRef = React.useRef(null);

  const onMouseMove = (e) => {
    setMouseState({ x: e.clientX, y: e.clientY });
    setTooltipSize({
      width: tooltipRef.current.getBoundingClientRect().width,
      height: tooltipRef.current.getBoundingClientRect().height,
    });
    setContentLocation({
      x: contentRef.current.getBoundingClientRect().x,
      y: contentRef.current.getBoundingClientRect().y,
    });
  };

  // Sets the correct direction for the tooltip on the X-Axis
  const correctSideX = (mouseState, width) => {
    const difference = width - Math.abs(contentLocation.x - width);
    if (mouseState.x - tooltipSize.width < 0) {
      return mouseState.x - difference + padding;
    } else if (mouseState.x + tooltipSize.width > width) {
      return mouseState.x - difference - tooltipSize.width - padding;
    } else return mouseState.x - difference + padding;
    // width / 2 - tooltipSize.width * 2
  };

  const correctSideY = (mouseState, height) => {
    const difference = height - Math.abs(contentLocation.y - height);
    if (mouseState.y - tooltipSize.height < 0) {
      return mouseState.y - difference;
    } else if (mouseState.y + tooltipSize.height > height) {
      return mouseState.y - difference - tooltipSize.height;
    } else {
      return mouseState.y - difference + padding;
    }
  };

  return (
    <div
      ref={contentRef}
      onClick={() => onClick}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className={className}
      style={{ position: 'relative' }}
    >
      {children}
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            left: correctSideX(mouseState, window.innerWidth),
            right: 0,
            top: correctSideY(mouseState, window.innerHeight), //mouseState.y - window.innerHeight / 2 - tooltipSize.height
            bottom: 0,
          }}
        >
          <div
            ref={tooltipRef}
            className={classNameTooltip}
            style={{
              position: 'inherit',
              whiteSpace: 'initial',
              overflow: 'hidden',
            }}
          >
            {tooltipContent}
          </div>
        </div>
      )}
    </div>
  );
};

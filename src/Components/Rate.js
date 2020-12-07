import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
const iconSize = 32;
const ratings = [0, 1, 2, 3, 4];
const fractions = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

const Rate = props => {
  let name = `recipe-rating-${props.id}`;
  const [rate, setRate] = useState(props.defaultValue || 0);
  const [hoverState, setHoverState] = useState({
    hover: false,
    rate: null,
    width: '0%',
  });
  const [fromKeyboard, setFromKeyboard] = useState(false);
  return (
    <div
      className="rate"
      aria-label={`Recipe is rated with ${rate} out of 5 stars`}>
      {ratings.map((rating, index) => (
        <span
          role="presentation"
          key={index.toString()}
          className={'rate-container'}
          onClick={rateClickHandler.bind(null, hoverState, setRate, rate)}
          onMouseMove={mouseMove.bind(null, setHoverState, rating)}
          onMouseLeave={mouseLeave.bind(null, setHoverState)}
          onFocus={onFocus}
          onBlur={onBlur}>
          {fractions.map((fraction, index) => {
            let formattedRating = (rating + fraction).toString(),
              id = `${name}-${formattedRating.replace(/\./g, '-')}`,
              curRate = rating + fraction,
              width = '0%',
              clsName = '',
              checked = false;
            if (!hoverState.hover && rate === curRate) {
              width = (index + 1) * 10 + '%';
              checked = true;
            }
            if (hoverState.hover && hoverState.rate === curRate)
              width = hoverState.width;
            if (index === fractions.length - 1) {
              width = '100%';
              if (
                ((!hoverState.hover && curRate > rate) ||
                  (hoverState.hover && curRate > hoverState.rate)) &&
                curRate === rating + fractions[fractions.length - 1]
              )
                clsName = 'empty-color';
            }
            return (
              <Fragment key={index.toString()}>
                <label className={clsName} htmlFor={id} style={{ width }}>
                  <span className="star-icon-contianer">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </span>
                  <span className="visually-hidden">
                    {`Recipe is rated with ${formattedRating} out of 5 stars`}
                  </span>
                </label>
                <input
                  id={id}
                  type="radio"
                  name={name}
                  className="visually-hidden"
                  value={formattedRating}
                  defaultChecked={checked}
                  aria-hidden="true"
                  onKeyDown={onKeyDown.bind(null, setFromKeyboard)}
                  onFocus={onInputFocus.bind(
                    null,
                    parseFloat(formattedRating),
                    setRate,
                    fromKeyboard,
                    setFromKeyboard
                  )}
                  onClick={inputClickHandler.bind(null)}
                />
              </Fragment>
            );
          })}
        </span>
      ))}
      <span style={{ marginLeft: 10 }}>{rate}</span>
    </div>
  );
};

const onKeyDown = (setFromKeyboard, e) => {
  setFromKeyboard(true);
};

const onInputFocus = (rate, setRate, fromKeyboard, setFromKeyboard, e) => {
  if (fromKeyboard) {
    setRate(rate);
    setFromKeyboard(false);
  }
};

const rateClickHandler = ({ rate }, setRate, curRate, e) => {
  if (rate) {
    if (curRate === rate) rate = 0;
    setRate(rate);
  }
};

const inputClickHandler = e => {
  e.stopPropagation();
};

const mouseMove = (setHoverState, rate, e) => {
  let diff = e.nativeEvent.offsetX,
    width = '';
  width = Math.ceil((diff / iconSize) * 10) * 10 + '%';
  if (Number(width.slice(0, width.length - 1)) < 100)
    rate = parseFloat(rate + '.' + width[0]);
  else ++rate;
  setHoverState({ hover: true, rate, width });
};

const mouseLeave = setHoverState => {
  setHoverState({ hover: false, rate: null, width: '0%' });
};

const onFocus = e => {
  e.currentTarget.classList.add('star-active');
};

const onBlur = e => {
  e.currentTarget.classList.remove('star-active');
};

Rate.propTypes = {
  id: PropTypes.string.isRequired,
  defaultValue: PropTypes.number,
};

export default Rate;

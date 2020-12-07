import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Rate from './Rate';

const Card = props => {
  return (
    <article className="card">
      <section>
        <Link
          to={{
            pathname: `/${props.data.name.replace(/ /g, '')}`,
            state: { data: props.data },
          }}>
          <img src={props.data.thumb} alt={`Recipe ${props.data.name}`} />
        </Link>
      </section>
      <section>
        <h2>{props.data.name}</h2>
        <p>{props.data.headline}</p>
        <section>
          <p id={`carbos-${props.data.id}`}>Carbohydrate</p>
          <p aria-labelledby={`carbos-${props.data.id}`}>{props.data.carbos}</p>
          <p id={`ptime-${props.data.id}`}>Preparation Time</p>
          <p aria-labelledby={`ptime-${props.data.id}`}>
            {props.data.time &&
              props.data.time.slice(2, props.data.time.length)}
          </p>
        </section>
        <Rate id={props.data.id} defaultValue={props.data.rating} />
      </section>
    </article>
  );
};

Card.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    carbos: PropTypes.string,
    time: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
};

export default Card;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rate from './Rate';
import { Link, withRouter } from 'react-router-dom';
import logo from '../food_app.png';

class RecipeDetail extends Component {
  render() {
    const { location } = this.props;
    let data = location.state.data;
    return (
      <div className="recipe-detail">
        <header className="header">
          <div className="home-logo">
            <Link
              to={{
                pathname: '/',
              }}>
              <img src={logo} alt="Back to Home" />
            </Link>
          </div>
          <div>
            <img src={data.image} alt={`Recipe ${data.name}`} />
          </div>
          <article className="body">
            <div className="name">
              <h1>{data.name}</h1>
              <h2>{data.headline}</h2>
            </div>
            <div className="info">
              <div className="desc">
                <p>{data.description}</p>
              </div>
              <div className="others">
                <div id={`ptime-${data.id}`}>Preparation Time</div>
                <div className="ptime" aria-labelledby={`ptime-${data.id}`}>
                  {data.time && data.time.slice(2, data.time.length)}
                </div>
                <div>Rating</div>
                <div>
                  <Rate id={data.id} defaultValue={data.rating} />
                </div>
              </div>
            </div>
          </article>
        </header>
        <article className="content">
          <section>
            <div id="ingredients">Ingredients</div>
            <div className="ingredients">
              {data.ingredients.map((ingredient, i) => (
                <div aria-labelledby="ingredients" key={i.toString()}>
                  {ingredient}
                </div>
              ))}
            </div>
          </section>
          <section>
            <div>Nutrition Values</div>
            <div className="nutrition-values">
              <div>
                <div id={`calories-${data.id}`}>Calories</div>
                <div aria-labelledby={`calories-${data.id}`}>
                  {data.calories}
                </div>
              </div>
              <div>
                <div id={`carbohydrate-${data.id}`}>Carbohydrate</div>
                <div aria-labelledby={`carbohydrate-${data.id}`}>
                  {data.carbos}
                </div>
              </div>
              <div>
                <div id={`fat-${data.id}`}>Fat</div>
                <div aria-labelledby={`fat-${data.id}`}>{data.fats}</div>
              </div>
              <div>
                <div id={`protein-${data.id}`}>Protein</div>
                <div aria-labelledby={`protein-${data.id}`}>
                  {data.proteins}
                </div>
              </div>
            </div>
          </section>
        </article>
      </div>
    );
  }
}

RecipeDetail.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        headline: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        ingredients: PropTypes.array.isRequired,
        calories: PropTypes.string.isRequired,
        carbos: PropTypes.string.isRequired,
        fats: PropTypes.string.isRequired,
        proteins: PropTypes.string.isRequired,
        rating: PropTypes.number,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(RecipeDetail);

import React, { Component } from 'react';
import Card from './Card';

class RecipesOverview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="recipes-overview-container">
        {(this.props.recipes || []).map(recipe => (
          <Card key={recipe.id} data={recipe} />
        ))}
      </div>
    );
  }
}

export default RecipesOverview;

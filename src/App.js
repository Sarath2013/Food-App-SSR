import React, { Component } from 'react';
import logo from './food_app.png';
import { Switch, Route } from 'react-router-dom';
import RecipesOverview from './Components/RecipesOverview';
import RecipeDetail from './Components/RecipeDetail';
/*
 We encourage our candidates to over-engineer,
 so please feel free to use any other styling methodology
 e.g., Emotion, Fela, SASS, etc.
 */

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/">
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to Food App</h1>
              </header>
            </div>
            <main>
              <RecipesOverview recipes={this.props.recipes} />
            </main>
          </Route>
          <Route path="/:recipe">
            <main>
              <RecipeDetail />
            </main>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import recipes from '../server/recipes.json';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Unit Testing - Rendering App Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <App recipes={recipes} />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders snapshot', () => {
    let wrapper = shallow(
      <Router>
        <App recipes={recipes} />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

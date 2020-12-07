import React from 'react';
import recipes from '../../server/recipes.json';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RecipesOverview from './RecipesOverview';

let wrapper;

describe('Unit Testing - RecipesOverview Component', () => {
  afterAll(() => {
    wrapper = null;
  });

  it('renders snapshot', () => {
    wrapper = shallow(<RecipesOverview recipes={recipes} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('ensure recipe overview - cards count', () => {
    expect(wrapper.children().length).toEqual(9);
  });
});

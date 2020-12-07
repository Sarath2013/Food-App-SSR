import React from 'react';
import recipes from '../../server/recipes.json';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RecipeDetail from './RecipeDetail';

let wrapper,
  location = {
    state: {
      data: recipes[0],
    },
  };

describe('Unit Testing - RecipeDetail Component', () => {
  afterAll(() => {
    wrapper = null;
  });

  it('renders snapshot', () => {
    wrapper = shallow(<RecipeDetail.WrappedComponent location={location} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('ensure recipe details', () => {
    //expect(wrapper.find('h1').props().children).toEqual('Crispy Fish Goujons ');
    expect(wrapper.find({ children: 'Crispy Fish Goujons ' }).length).toEqual(
      1
    );
    expect(wrapper.find('h2').get(0).props.children).toEqual(
      'with Sweet Potato Wedges and Minted Snap Peas'
    );
    expect(wrapper.find('p').get(0).props.children).toEqual(
      recipes[0].description
    );
    expect(wrapper.find('img').get(1).props.src).toEqual(recipes[0].image);
    expect(wrapper.find('.ptime').props().children).toEqual('35M');
    expect(wrapper.find('.ingredients').children().length).toEqual(
      recipes[0].ingredients.length
    );
    expect(
      wrapper
        .find('.nutrition-values')
        .children()
        .get(0).props.children[1].props.children
    ).toEqual('516 kcal');
    expect(
      wrapper
        .find('.nutrition-values')
        .children()
        .get(1).props.children[1].props.children
    ).toEqual('47 g');
    expect(
      wrapper
        .find('.nutrition-values')
        .children()
        .get(2).props.children[1].props.children
    ).toEqual('8 g');
    expect(
      wrapper
        .find('.nutrition-values')
        .children()
        .get(3).props.children[1].props.children
    ).toEqual('43 g');
  });
});

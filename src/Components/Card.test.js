import React from 'react';
import recipes from '../../server/recipes.json';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Card from './Card';

let wrapper;

describe('Unit Testing - Card Component', () => {
  afterAll(() => {
    wrapper = null;
  });

  it('renders snapshot', () => {
    wrapper = shallow(<Card data={recipes[0]} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('ensure card details', () => {
    expect(wrapper.find('.card').length).toEqual(1);
    expect(wrapper.find('h2').props().children).toEqual('Crispy Fish Goujons ');
    expect(wrapper.find('p').get(0).props.children).toEqual(
      'with Sweet Potato Wedges and Minted Snap Peas'
    );
    expect(wrapper.find('p').get(2).props.children).toEqual('47 g');
    expect(wrapper.find('p').get(4).props.children).toEqual('35M');
    expect(wrapper.find('img').props().src).toEqual(
      'food-images/533143aaff604d567f8b4571.jpg'
    );
    expect(wrapper.find('Link').props().to.pathname).toEqual(
      '/CrispyFishGoujons'
    );
    expect(wrapper.find('Link').props().to.state.data).toEqual(recipes[0]);
  });
});

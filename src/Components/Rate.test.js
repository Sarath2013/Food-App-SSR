import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Rate from './Rate';

let wrapper;

describe('Unit Testing - Rate Component', () => {
  afterAll(() => {
    wrapper = null;
  });

  it('renders snapshot', () => {
    wrapper = shallow(<Rate id="test-rate" defaultValue={3} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('ensure rating structure and default value', () => {
    expect(wrapper.find('.rate').length).toEqual(1);
    expect(wrapper.find('.rate-container').length).toEqual(5);
    expect(
      wrapper
        .find('.rate')
        .children()
        .get(wrapper.find('.rate').children().length - 1).props.children
    ).toEqual(3);
    expect(wrapper.find('.rate').props()['aria-label']).toEqual(
      'Recipe is rated with 3 out of 5 stars'
    );
  });

  it('check rating - mouse move on rating and click rating', async () => {
    await wrapper
      .find('.rate')
      .children()
      .at(4)
      .simulate('mousemove', { nativeEvent: { offsetX: 19 } });
    await wrapper
      .find('.rate')
      .children()
      .at(4)
      .simulate('click');
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(
      wrapper
        .find('.rate')
        .children()
        .get(wrapper.find('.rate').children().length - 1).props.children
    ).toEqual(4.6);
    expect(wrapper.find('.rate').props()['aria-label']).toEqual(
      'Recipe is rated with 4.6 out of 5 stars'
    );
  });
  it('check rating through Keyboard', async () => {
    await wrapper
      .find('.rate-container')
      .at(4)
      .find('input')
      .at(6)
      .simulate('keydown', { keyCode: 40 });
    await wrapper
      .find('.rate-container')
      .at(4)
      .find('input')
      .at(6)
      .simulate('focus');
    wrapper.update();
    expect(
      wrapper
        .find('.rate')
        .children()
        .get(wrapper.find('.rate').children().length - 1).props.children
    ).toEqual(4.7);
    expect(wrapper.find('.rate').props()['aria-label']).toEqual(
      'Recipe is rated with 4.7 out of 5 stars'
    );
  });
});

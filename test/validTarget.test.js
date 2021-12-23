const validTarget = require('./validTarget');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><p class="test">Hello world</p><p id="test2">Hello world2</p>`);
const expectValueOfId = dom.window.document.querySelector('p#test2');
const expectValueOfClass = dom.window.document.querySelector('p');

const tutoInfo = {
    name: 'test',
    message: 'test message'
}
const tutoInfo2 = {
    name: 'test2',
    message: 'test message'
}


test('[타겟 유효검사] name속성명이 있으면', () => {
    expect(validTarget(tutoInfo).target).toEqual(expectValueOfClass);
    expect(validTarget(tutoInfo2).target).toEqual(expectValueOfId);
})

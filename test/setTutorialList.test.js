const validTarget = require('./validTarget');
const setTutorialList = require('./setTutorialList');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><p class="test">Hello world</p><p id="test2">Hello world2</p>`);

const document = dom.window.document;

const tutoInfo = {
    name: 'test2',
    message: 'test message'
}

const setItem = validTarget(tutoInfo);

test('[튜토리얼 배열 추가] 튜토리얼 정상 값이 넘어올 때', () => {
    expect(setTutorialList(setItem)).not.toBeNull();
})

test('[튜토리얼 배열 추가] 튜토리얼 정상 값이 넘어가면 리턴은 새로운 배열이 와야한다.', () => {
    expect(setTutorialList(setItem)).toHaveLength(1);
})

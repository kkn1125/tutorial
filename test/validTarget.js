const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><p class="test">Hello world</p><p id="test2">Hello world2</p>`);
dom.window.document.querySelector("p").textContent;
const document = dom.window.document;

const validTarget = function (tutoInfo) {
    tutoInfo['target'] = document.getElementById(tutoInfo.name) || document.querySelector(`.${tutoInfo.name}`);
    return tutoInfo;
}

module.exports = validTarget;
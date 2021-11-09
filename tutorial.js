/**!
 * tutorial v0.1.1 (https://github.com/kkn1125/tutorial)
 * Copyright 2021 Authors (https://github.com/kkn1125/tutorial/graphs/contributors) kkn1125
 * Licensed under MIT (https://github.com/kkn1125/tutorial/blob/main/LICENSE)
 */

const Tutorial = (function () {
    function Controller() {
        let moduleModel = null;
        let moduleOptions = null;
        let uiElem = null;

        this.init = function (model, ui, options) {
            moduleModel = model;
            moduleOptions = options;
            uiElem = ui;

            options.autoPlay ? this.startTutorial() : moduleModel.exitBtnHandler(moduleOptions);
            window.addEventListener('resize', this.responsiveTutorial);
            window.addEventListener('scroll', this.responsiveTutorial);
            window.addEventListener('keydown', this.tutoBtnsKbdHandler);
            window.addEventListener('click', this.tutoBtnsHandler);
            window.addEventListener('click', this.restartTutorial);
        }

        this.startTutorial = function () {
            moduleModel.startTutorial(moduleOptions);
        }

        this.responsiveTutorial = function(){
            moduleModel.responsiveTutorial(moduleOptions);
        }

        this.tutoBtnsHandler = function(ev){
            let target = ev.target;
            if(target.tagName !== 'BUTTON') return;
            if(target.classList.contains('prev')) moduleModel.prevBtnHandler(moduleOptions);
            else if(target.classList.contains('next')) moduleModel.nextBtnHandler(moduleOptions);
            else if(target.classList.contains('exit')) moduleModel.exitBtnHandler(moduleOptions);
        }

        this.tutoBtnsKbdHandler = function(ev){
            let key = ev.key;
            let restart = uiElem.body.querySelector('.restart');
            if(!key.ctrlKey && key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Escape' && key !== ' ') return;
            ev.preventDefault();
            
            if(key == 'ArrowLeft') moduleModel.prevBtnHandler(moduleOptions);
            else if(key == 'ArrowRight') moduleModel.nextBtnHandler(moduleOptions);
            else if(!restart && key == 'Escape') moduleModel.exitBtnHandler(moduleOptions);
            else if(restart && key == ' ') moduleModel.restartTutorial(restart, moduleOptions);
        }

        this.restartTutorial = function(ev){
            let target = ev.target;
            if(target.tagName !== 'BUTTON' || target.className !== 'restart') return;
            moduleModel.restartTutorial(target, moduleOptions);
        }
    }

    function Model() {
        let moduleView = null;
        let tutorialList = [];
        let currentTutorial = null;

        this.init = function (view) {
            moduleView = view;
        }

        this.startTutorial = function (options) {
            try{
                this.validTarget(options.tutorial);
            } catch(e){
                console.error(e.message);
            }

            this.setCurrentTutorial();
            this.rederTutorial(options);
        }

        this.validTarget = function (tutoInfo) {
            let validList = [].slice.call(tutoInfo);

            validList.map(tutoBox=>{
                let target = document.getElementById(tutoBox.name) || document.querySelector(`.${tutoBox.name}`) || document.querySelector(tutoBox.name);
                if(!target){
                    throw new Error('타겟이 존재하지 않습니다.');
                }
                tutoBox.target = target;
                return tutoBox;
            });

            this.setTutorialList([].slice.call(validList));
        }

        this.setTutorialList = function(list){
            function TutoBox({name, target, message}){
                this.name = name;
                this.target = target;
                this.message = message;
                this.order = 0;
                this.created = new Date().toLocaleString();
                this.autoIncrement = function(){
                    this.order = tutorialList.indexOf(this);
                };
            }
            
            list.forEach(item=>{
                let box = new TutoBox(item);
                tutorialList.push(box);
                box.autoIncrement();
            });
        }

        this.restartTutorial = function(target, options){
            this.startTutorial(options);
            target.remove();
        }

        this.setCurrentTutorial = function(order=0){
            currentTutorial = tutorialList[order];
        }

        this.rederTutorial = function(options){
            moduleView.rederTutorial(currentTutorial, tutorialList, options);
        }

        this.responsiveTutorial = function(options){
            moduleView.updateBox(currentTutorial, options, this.isNone.bind(this));
        }

        this.isNone = function(target, options){
            if(currentTutorial === target){
                this.nextBtnHandler(options);
            }
        }

        this.prevBtnHandler = function(options){
            let curIdx = tutorialList.indexOf(currentTutorial)-1;
            while(tutorialList[curIdx] && getComputedStyle(tutorialList[curIdx].target)['display']=='none') {
                curIdx--;
            }
            if(curIdx<0) curIdx = 0;
            this.setCurrentTutorial(curIdx);
            this.rederTutorial(options);
        }

        this.nextBtnHandler = function(options){
            let curIdx = tutorialList.indexOf(currentTutorial)+1;
            while(tutorialList[curIdx] && getComputedStyle(tutorialList[curIdx].target)['display']=='none') {
                curIdx++;
            }
            if(curIdx>tutorialList.length-1) curIdx = tutorialList.length-1;
            this.setCurrentTutorial(curIdx);
            this.rederTutorial(options);
        }

        this.exitBtnHandler = function(options){
            moduleView.clearTutorial(options);
            tutorialList = [];
        }
    }

    function View() {
        let uiElem = null;
        let buildBox = null;

        this.init = function (ui) {
            uiElem = ui;
        }

        this.buildForm = function(options){
            let dom = new DOMParser();
            return dom.parseFromString(`<div class="tuto-wrap">
            <div class="tuto-box">
                <div class="tuto-border">
                    <span class="tuto-shadow"></span>
                    <span class="tuto-mark"></span>
                </div>
                <div class="tuto-view-wrap">
                    <div class="tuto-view">
                        <div class="tuto-msg">
                            <span tuto-order></span>
                            <span tuto-msg></span>
                            <br>
                            <span tuto-num></span>
                        </div>
                        <span class="tuto-btns">
                            <button class="prev">${options.naming.prev}</button>
                            <button class="next">${options.naming.next}</button>
                            <button class="exit">${options.naming.exit}</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>`, 'text/html').body.querySelector('.tuto-wrap');
        }

        this.rederTutorial = function(tutoBox, tutorialList, options){
            if(!buildBox) buildBox = this.buildForm(options);
            this.preSetStyle(buildBox, options);
            this.focusViewport(tutoBox);
            buildBox.querySelector('[tuto-order]').innerHTML = tutoBox.order+1;
            buildBox.querySelector('[tuto-msg]').innerHTML = tutoBox.message;
            buildBox.querySelector('[tuto-num]').innerHTML = `${tutoBox.order+1}/${tutorialList.length}`;
            document.body.insertAdjacentElement('afterbegin', buildBox);
            setTimeout(()=>{
                this.updateBox(tutoBox, options);
            });
        }

        this.preSetStyle = function(box, options){
            let border = options.style.border;
            let msgBox = options.style.msgBox;
            let btns = options.style.btns;
            setTimeout(()=>{
                box.querySelector('.tuto-box').style.transition = 'left .5s, right .5s, top .5s, bottom .5s';
                box.querySelector('.tuto-border').style.borderRadius = border.rounded || '1rem';
                box.querySelector('.tuto-msg').style.backgroundColor = msgBox.bgColor;
                box.querySelector('.tuto-msg').style.color = msgBox.color;
                box.querySelector('.tuto-mark').style.boxShadow = `0 0 0 ${border.width||'3px'} ${border.color}`;
                if(options.effect !== 'none') box.querySelector('.tuto-mark').classList.add(`effect-${options.effect}`)
                box.querySelector('.tuto-shadow').style.boxShadow = `0 0 0 9999px ${options.style.shadowColor}`;
                box.querySelector('.tuto-btns').style.borderRadius = btns.rounded || '1rem';
            });
        }

        this.updateBox = function(tutoBox, options, callback){
            let top, left, width, height, right;

            let target = tutoBox.target;
            let targetRect = target.getBoundingClientRect();
            let position = buildBox.querySelector('.tuto-box');
            let border = buildBox.querySelector('.tuto-border');
            let view = buildBox.querySelector('.tuto-view');
            let viewRect = view.getBoundingClientRect();
            let msg = buildBox.querySelector('.tuto-msg');
            let msgRect = msg.getBoundingClientRect();
            let padding = options.style.padding;
            
            top = target.offsetTop;
            left = target.offsetLeft;
            width = targetRect.width;
            height = targetRect.height;

            if(padding.match(/[^px]/gm)) padding = parseFloat(padding.replace(/[^0-9\.]/gm, ''))*16;
            else if(padding.match(/px/gm)) padding = parseFloat(padding.replace(/[^0-9\.]/gm,''));
            
            if(window.innerWidth-17 > left + viewRect.width + padding || left - viewRect.width<0){
                view.style['left'] = `${padding}px`;
                view.style['right'] = '';
                // view.style['width'] = `${(window.innerWidth-17-left)*0.9}px`
            } else {
                view.style['left'] = '';
                view.style['right'] = `${padding}px`;
            }

            if(window.innerHeight > top/3 + height + viewRect.height + padding || height - viewRect.height<0){
                position.style.flexDirection = `column`;
                view.style['top'] = 0;
                view.style['bottom'] = '';
            } else {
                if(getComputedStyle(target)['position']=='fixed') position.style.position = 'fixed';
                position.style.flexDirection = `column-reverse`;
                view.style['bottom'] = 0;
                view.style['top'] = '';
                view.querySelector('.tuto-btns').style.marginBottom = '1rem';
            }

            if(msgRect.left+msgRect.width>window.innerWidth-17){
                right = window.innerWidth-17-left-width;
            }

            msg.style.maxWidth = `${(window.innerWidth-17)*0.9 - right??left}px`;

            buildBox.style.display = width == 0 && height == 0?'none':'block';

            if(callback && getComputedStyle(target)['display']=='none') callback(tutoBox, options);

            position.style.top = `calc(${top}px - ${padding}px / 2)`;
            position.style.left = `calc(${left}px - ${padding}px / 2)`;
                
            border.style.cssText = `
                width: calc(${width}px + ${padding}px);
                height: calc(${height}px + ${padding}px);
            `;
        }

        this.clearTutorial = function(options){
            if(buildBox) buildBox.remove();
            this.createRestartBtn(options);
        }

        this.createRestartBtn = function(options){
            let restart = document.createElement('button');
            restart.innerHTML = options.naming.restart;
            restart.classList.add('restart');
            restart.style.bottom = '3rem';
            restart.style.right = 'calc(3rem - 17px)';
            document.body.append(restart);
        }

        this.focusViewport = function(tutoBox){
            tutoBox.target.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
        }
    }

    return {
        init: function (options) {
            try{
                if(!options.tutorial || options.tutorial.length == 0) throw new Error('[NoTutorials]지정된 대상이 없습니다.\n실행을 중단합니다.');
            } catch(e){
                console.error(e.message);
                return ;
            }
            options = this.initOptions(options);

            const head = document.head;
            const body = document.body;
            const html = document.querySelector('html');

            const ui = {
                head,
                body,
                html
            };

            const view = new View();
            const model = new Model();
            const controller = new Controller();

            view.init(ui);
            model.init(view);
            controller.init(model, ui, options);
        },
        initOptions: function (options) {
            let initOptions = {
                style: {
                    padding: "1rem",
                    bgColor: "rgba(0,0,0,0.2)",
                    border: {
                        rounded: "1rem",
                        width: "3px",
                        color: "#eb47a8",
                    },
                    msgBox: {
                        bgColor: "rgba(0,0,0,0.5)",
                        color: "white",
                    },
                    btns: {
                        rounded: ".2rem",
                    }
                },
                naming: {
                    restart: 'restart',
                },
                autoPlay: true,
                effect: 'ripple',
            }

            function finding(init, obj) {
                for (let op in obj) {
                    if (obj[op] instanceof Object && !(obj[op] instanceof Array)) {
                        finding(init[op], obj[op]);
                    } else {
                        init[op] = obj[op];
                    }
                }
            }
            finding(initOptions, options);
            return initOptions;
        }
    }
})();
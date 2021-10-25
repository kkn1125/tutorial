const Tutorial = (function () {
    function Controller() {
        let moduleModel = null;
        let moduleOptions = null;
        let uiElem = null;

        this.init = function (model, ui, options) {
            moduleModel = model;
            moduleOptions = options;
            uiElem = ui;

            window.addEventListener('load', this.startTutorial);
            window.addEventListener('resize', this.responsiveTutorial);
            window.addEventListener('scroll', this.responsiveTutorial);
            window.addEventListener('click', this.floatBtnsHandler);
            window.addEventListener('click', this.exitTutorial);
        }

        this.startTutorial = function(ev){
            moduleModel.startTutorial(ev, moduleOptions);
        }

        this.responsiveTutorial = function(ev){
            moduleModel.responsiveTutorial(ev);
        }

        this.floatBtnsHandler = function(ev){
            moduleModel.floatBtnsHandler(ev);
        }

        this.exitTutorial = function(ev){
            let target = ev.target;
            if(target.tagName !== 'BUTTON' || target.dataset.btn !== 'exit') return;
            document.querySelector('.tutorial').remove();
            document.querySelector('.floatController').remove();
        }
    }

    function Model() {
        let moduleView = null;
        let moduleOptions = null;
        let tutorialBundle = [];
        let currentTutorial = null;
        let tutoBox = null;
        let btns = null;
        let orderCount = 0;

        this.init = function (view) {
            moduleView = view;
        }

        this.floatController = function(){
            let btnwrap = document.createElement('div');
            let prev = document.createElement('button');
            let next = document.createElement('button');
            let exit = document.createElement('button');
            prev.innerHTML = 'prev';
            next.innerHTML = 'next';
            exit.innerHTML = 'exit';
            prev.dataset.btn = 'prev';
            next.dataset.btn = 'next';
            exit.dataset.btn = 'exit';
            btnwrap.classList.add('floatController');
            prev.classList.add('floatBtn');
            next.classList.add('floatBtn');
            exit.classList.add('floatBtn', 'exit');
            btnwrap.append(prev, next, exit);
            return btnwrap;
        }

        this.floatBtnsHandler = function(ev){
            let target = ev.target;
            let type = target.dataset.btn;
            if(type !== 'prev' && type !== 'next') return;

            this.btnsHandler(target, type);
        }

        this.btnsHandler = function(target, type){
            let index = tutorialBundle.indexOf(currentTutorial);
            
            if(type == 'prev'){
                if(index == 0) return;
                currentTutorial = tutorialBundle[index-1];
                this.responsiveTutorial();
            } else {
                if(index == tutorialBundle.length-1) return;
                currentTutorial = tutorialBundle[index+1];
                this.responsiveTutorial();
            }

            setTimeout(()=>{
                tutoBox.scrollIntoView({block: 'center', behavior: 'smooth', inline: 'nearest'});
            }, 100);
        }

        this.startTutorial = function(ev, options){
            moduleOptions = options;

            this.setTutorialToForm(options.selector)
        }

        this.setTutorialToForm = function(selector){
            try{
                let div = document.createElement('div');
                let inner = document.createElement('div');
                let msg = document.createElement('div');
                btns = this.floatController();
                div.append(inner, msg, btns);
                div.classList.add('tutorial');
                msg.classList.add('msg');
                tutoBox = div;
                tutorialBundle = [];

                selector.forEach(sel=>{
                    let settingItem = this.setStyleToTutorialItem(sel);
                    if(!settingItem) throw new Error('[NoTarget] 타겟이 존재하지 않습니다.');
                    tutorialBundle.push(settingItem);
                });

                currentTutorial = tutorialBundle[0];
                this.starterTutorial();
            } catch(e) {
                console.error(e.message);
            }
        }

        this.setStyleToTutorialItem = function(selector){
            let name, target, rect;
            function Tutorial(name, target, msg, order){
                this.name = name;
                this.target = target;
                this.msg = msg;
                this.order = order;
            }
            
            name = selector.name;
            
            target = document.getElementById(name) || document.querySelector(`.${name}`) || document.querySelector(name);
            if(!target) return false;
            rect = target.getBoundingClientRect();
            
            orderCount+=1;

            return new Tutorial(name, target, selector.msg, orderCount);
        }

        this.setStyle = function(div, target, visible=true){
            let style = moduleOptions.style;
            let msgBox = moduleOptions.style.msgBox;
            let y = target.offsetTop;
            let x = target.offsetLeft;
            let limitX = window.innerWidth-17;
            let limitY = window.innerHeight-17;
            let msg = document.querySelector('.msg');
            let position = getComputedStyle(target)['position'];
            let layer = style.layerLine
            ?`box-shadow: .3rem .3rem 0 ${style.border.width} gray, -.3rem -.3rem 0 ${style.border.width} ${style.border.color}`
            :`border: ${style.border.width} ${style.border.line} ${style.border.color}`;
            msg.innerHTML = currentTutorial.msg;
            
            div.style.cssText = `
                ${position=='fixed'?'position:'+position:''};
                top: calc(${y}px - ${style.padding});
                left: calc(${x}px - ${style.padding});
                width: calc(${target.offsetWidth}px + ${style.padding} * 2);
                height: calc(${target.offsetHeight}px + ${style.padding} * 2);
                border-radius: ${style.border.rounded};
            `;

            div.children[0].style.cssText = `
                ${position=='fixed'?'position:'+position:''};
                top: calc(${y}px - ${style.padding});
                left: calc(${x}px - ${style.padding});
                width: calc(${target.offsetWidth}px + ${style.padding} * 2);
                height: calc(${target.offsetHeight}px + ${style.padding} * 2);
                border-radius: ${style.border.rounded};
                ${layer};
            `;
            
            msg.style.cssText = `
                background-color: ${msgBox.bgColor};
                color: ${msgBox.color};
                padding: ${style.padding};
                border-radius: ${style.border.rounded};
                margin-top: 1rem;
                width: ${target.offsetWidth>=limitX?limitX*0.8+'px':'fit-content'};
                ${y+target.offsetHeight*1.3>limitY?'bottom':'top'}: 110%;
                ${x+target.offsetWidth*1.3>limitX?'right':'left'}: 0;
                margin-${x+target.offsetWidth*1.3>limitX?'right':'left'}: ${style.padding};
            `;
            
            btns.style.cssText = `
                margin-top: 3rem;
                ${y+target.offsetHeight*1.3>limitY?'bottom: calc(120% + '+style.padding+' * 5)':'top: calc(0% + '+style.padding+' * 5)'};
                transform: translateY(100%);
                ${x+target.offsetWidth*1.3>limitX?'right':'left'}: 5%;
                margin-${x+target.offsetWidth*1.3>limitX?'right':'left'}: ${style.padding};
            `;
        }

        this.responsiveTutorial = function(ev){
            let visible = getComputedStyle(currentTutorial.target)['display'] != 'none'?true:false;
            this.setStyle(tutoBox, currentTutorial.target, visible);
        }

        this.starterTutorial = function(){
            moduleView.starterTutorial(tutoBox);
            this.setStyle(tutoBox, currentTutorial.target);
        }
    }

    function View() {
        let uiElem = null;

        this.init = function (ui) {
            uiElem = ui;
        }

        this.starterTutorial = function(tutoBox){
            document.body.append(tutoBox);
        }
    }

    return {
        init: function (options={}) {
            const head = document.head;
            const body = document.body;
            const html = document.querySelector('html');
            
            const ui = {
                head,
                body,
                html
            };
            
            if(options.selector){
                options.selector.forEach(sel=>{
                    ui[sel.name] = sel.selector;
                });
            }

            const view = new View();
            const model = new Model();
            const controller = new Controller();

            view.init(ui);
            model.init(view, options.selector);
            controller.init(model, ui, options);
        }
    }
})();
# tutorial

웹페이지 안내를 만들어 주는 애플리케이션

## 버전

v0.1.1

## 사용법

tutorial.js와 index.js를 연결합니다.

```html
<!-- main.html -->
    <script src="tutorial.js"></script>
    <script src="index.js"></script>
<!-- </body> -->
```

```javascript
// index.js

const tutorial = Tutorial.init({
    tutorial: [
        {
            name: "navbar-brand",
            msg: "브랜드명을 자유롭게 변경할 수 있습니다."
        },
        {
            name: "navbar-toggler",
            msg: "메뉴 버튼입니다."
        },
        {
            name: "h1",
            msg: "메인 텍스트입니다."
        },
        {
            name: "footer",
            msg: "푸터 입니다."
        },
    ],
   style: {
        padding: "1rem",
        shadowColor: "rgba(0,0,0,0.7)",
        border: {
            rounded: "1rem",
            width: "10px",
            color: "#eb47a8",
        },
        msgBox: {
            rounded: ".5rem",
            bgColor: "rgba(0,0,0,0.5)",
            color: 'white',
        },
        btns: {
            rounded: ".5rem",
        }
    },
    naming: {
        restart: '튜토리얼 보기',
        prev: '이전',
        next: '다음',
        exit: '종료',
    },
    autoPlay: true,
    effect: 'none',
});
```

위 코드에 있는 옵션이 지정된 `style` 설정입니다. `selector`는 설명하고자하는 태그의 `id`, `class`, `tagname`을 적으면 `id` > `className` > `tagName` 순으로 자동으로 찾아 지정합니다.
지정된 태그들은 순번을 가지며, 처음 지정한 태그부터 시작됩니다.

`msg`는 태그에 관한 설명을 적는 부분입니다. 설명을 적으면 순차적으로 태그에 따라 메세지 박스가 붙어 따라다닙니다. prev, next, exit버튼이 함께 따라다니며 언제든 종료할 수 있습니다.

## cdn 사용

```html
<!-- v0.1.1 pre-release -->

<!-- v0.1.0 pre-release -->
<script src="https://cdn.jsdelivr.net/gh/kkn1125/tutorial@vv0.1.1/tutorial.js" integrity="sha384-sA5mI0st775JGtzxJUNd8aln7/fhc82dqZOXqntMWHCIJbHjb6pRsWZ7N8WpKLdP" crossorigin="anonymous"></script>

<!-- update-3 -->
<script src="https://cdn.jsdelivr.net/gh/kkn1125/tutorial@update-3/tutorial.js" integrity="sha384-yvfG/GN5C3D97wAfUl7c99ifvThQTaW//zZVfJ8YNvTpiT30oTpm4Bm2e/SFlW0z" crossorigin="anonymous"></script>

<!-- update-2 -->
<script src="https://cdn.jsdelivr.net/gh/kkn1125/tutorial@update-2/tutorial.js" integrity="sha384-WHjeFhy3HdxzR+H8+i7YxIdxJArvdqIOH+l2EHajuBxZCTxdcD5OdB5l439OdUjg" crossorigin="anonymous"></script>
```
const tutorial = Tutorial.init({
    selector: [
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
        type: "rect",
        layerLine: true,
        padding: "1rem",
        bgColor: "rgba(0,0,0,0.2)",
        border: {
            rounded: "1rem",
            width: "3px",
            color: "#eb47a8",
            line: "solid",
        },
        msgBox: {
            bgColor: "rgba(0,0,0,0.5)",
            color: "white",
        }
    }
});
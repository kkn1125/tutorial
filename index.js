const tutorial = Tutorial.init({
    tutorial: [
        {
            name: 'navbar',
            message: '네비게이션입니다.',
        },
        {
            name: 'navbar-brand',
            message: '그 중에서도 브랜드를 설명하는 부분과 모바일에서 토글버튼이 있습니다.<br>웹에서 표시되지 않으면 튜토리얼 또한 표시되지 않고 표시되는 부분으로 건너뛰게 됩니다.',
        },
        {
            name: 'navbar-toggler',
            message: '토글 버튼입니다. 반응형에 의해 안보일 수 도 있습니다.',
        },
        {
            name: 'tuto-0',
            message: '튜토리얼에 대한 설명입니다.',
        },
        {
            name: 'tuto-1',
            message: '필요에 의해 사용되어지는 튜토리얼은 단순 이유로도, 특수한 경우에도 사용할 수 있습니다.',
        },
        {
            name: 'tuto-2',
            message: '크게 설정하는 속성은 tutorial, style, naming, autoPlay, effet로 5가지 입니다.',
        },
        {
            name: 'tuto-3',
            message: 'id>class>tagName 순으로 대상을 찾고 리스트를 만들어 튜토리얼을 만듭니다. 추후 <kbd>tuto-*</kbd>속성을 추가하여 편리한 튜토리얼 설정을 구상 중 입니다.',
        },
        {
            name: 'tuto-4',
            message: 'style은 tutorial의 메세지 박스 배경색상|모깎기|텍스트색상, 외곽라인의 두께|색상|모깎기, 강조영역 외 배경색상, 강조영역 여유공간 등을 조정합니다.',
        },
        {
            name: 'tuto-5',
            message: 'naming에서는 진행되는 튜토리얼 박스를 따라다니는 버튼의 명칭을 변경합니다. 페이지들에 따라 조화되기 쉽도록 하기 위함입니다.',
        },
        {
            name: 'tuto-6',
            message: 'autoPlay는 시작하자마자 켜지는 것이 꺼릴 때 사용합니다.',
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
    effect: 'ripple',
});
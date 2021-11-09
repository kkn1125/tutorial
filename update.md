# 업데이트 내역

## v0.1.1

### 변경사항

1. `keydown` 이벤트로 튜토리얼 진행
   - `ArrowLeft`, `ArrowRight`, `spacebar`, `Escape` 총 4 가지 키
   - `ArrowLeft`, `ArrowRight` 키는 이전, 다음 튜토리얼 진행
   - `Escape` 키는 튜토리얼 종료
   - `spacebar` 키는 튜토리얼 재시작
2. Tutorial 문서 페이지 색상 변경
   - effect ripple 설정

***kimson 2021-11-09 12:31:18***

-----

## v0.1.0

### 변경사항

1. 코드 전체 변경
   - 이전 버전과 호환되지 않음
   - 컨트롤러 영역 이벤트 처리
   - 모델 영역 데이터 처리
   - 뷰 영역 렌더 처리
2. 메세지 창 및 핸들러 버튼
   1. 공통
      - `flex`와 `left`, `right`, `top`, `bottom`으로 조정
   2. 메세지 창
      - 튜토리얼 진행도 추가
      - 현재 튜토리얼 박스 넘버링
3. 초기화 설정 방식 추가, 변경
   1. tutorial 속성 `{array}`
      - 튜토리얼 리스트 이름을 `selector`에서 `tutorial`로 변경
   2. style 속성 `{object}`
      - `border` (`rounded`, `width`, `color`)
      - `msgBox` (`rounded`, `bgColor`, `color`)
      - `btns` (`rounded`)
      - `padding`
      - `shadowColor`
   3. naming 속성 `{object}`
      - `restart`, `prev`, `next`, `exit`
   4. autoPlay 속성 `{boolean}`
   5. effect 속성 `{string}`
4. Tutorial 문서 페이지 생성

***kimson 2021-11-09 12:31:17***
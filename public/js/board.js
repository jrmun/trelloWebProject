// 페이지 실행 시
window.onload = function () {
    // URL에서 쿼리 파라미터 값 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const boardId = urlParams.get('id');

    if (boardId) {
        loadBoardContent(boardId);
        console.log('data.req');
    }

    const logoutButton = document.querySelector('#logoutbtn');
    // 로그아웃 api 요청
    logoutButton.addEventListener('click', function () {
        fetch('/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('로그아웃 성공:', data);
                alert('로그아웃 되었습니다.');
                location.reload();
            })
            .catch((error) => {
                console.error('로그아웃 실패:', error);
            });
    });

    loadUserBoards();

    // 로고 누르면 메인페이지로 이동
    const logoElement = document.querySelector('.text-center');
    logoElement.style.cursor = 'pointer';

    logoElement.addEventListener('click', function () {
        window.location.href = 'index.html';
    });
};

function loadBoardContent(boardId) {
    fetch(`/board/${boardId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            renderBoardData(data);
        })
        .catch((error) => {
            console.error('보드 조회 실패:', error);
        });
}

function renderBoardData(data) {
    console.log('render');

    // 보드 이름, 설명, 만든 날짜와 업데이트 날짜를 화면에 표시
    const boardNameElement = document.getElementById('boardName');
    const boardDescriptionElement = document.getElementById('boardDescription');
    boardNameElement.textContent = data.data.board_name;
    boardDescriptionElement.textContent = data.data.description;

    const createdDateElement = document.getElementById('createdDate');
    const updatedDateElement = document.getElementById('updatedDate');

    const createdAt = new Date(data.data.createdAt);
    const updatedAt = new Date(data.data.updatedAt);

    createdDateElement.textContent = `생성일: ${createdAt.toLocaleString('ko-KR')}`;
    updatedDateElement.textContent = `최근 업데이트: ${updatedAt.toLocaleString('ko-KR')}`;

    // 백그라운드 컬러 설정
    document.body.style.backgroundColor = data.data.bg_color;
}

// 사용자가 만든 보드 조회 및 드롭다운 메뉴 업데이트
function loadUserBoards() {
    fetch('/board', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);

            if (data.data) {
                const boardDropdown = document.querySelector('#boardDropdown');
                const dropdownMenu = boardDropdown.nextElementSibling;

                // 기존 드롭다운 항목 삭제
                dropdownMenu.innerHTML = '';

                // 조회한 보드 정보를 드롭다운 항목으로 추가
                data.data.forEach((board) => {
                    const dropdownItem = document.createElement('li');
                    dropdownItem.innerHTML = `<a class="dropdown-item" href="#" data-boardid="${board.board_id}">${board.board_id}: ${board.board_name}</a>`;
                    dropdownMenu.appendChild(dropdownItem);
                });

                // 보드 목록 선택 이벤트 처리
                const boardDropdownItems = document.querySelectorAll('.dropdown-item');
                boardDropdownItems.forEach((item) => {
                    item.addEventListener('click', function (event) {
                        console.log('click');

                        const selectedBoardId = item.getAttribute('data-boardid');
                        console.log(selectedBoardId);

                        if (selectedBoardId) {
                            navigateToBoardPage(selectedBoardId);
                        }
                    });
                });
            }
        })
        .catch((error) => {
            console.error('보드 조회 실패:', error);
        });
}

// 보드 페이지로 이동
function navigateToBoardPage(selectedBoard) {
    window.location.href = `board.html?id=${selectedBoard}`;
}

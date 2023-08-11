window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const boardId = urlParams.get('id');

    if (boardId) {
        loadBoardContent(boardId);
    }
    loadColumnContent(boardId);

    // 로고 누르면 메인페이지로 이동
    const logoElement = document.querySelector('.text-center');
    logoElement.style.cursor = 'pointer';

    logoElement.addEventListener('click', function () {
        window.location.href = 'index.html';
    });

    loadBoardUsersAndFillModal();

    // 로그아웃 api 요청
    const logoutButton = document.querySelector('#logoutbtn');
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

    loadAllBoards();

    // 보드 수정
    const EditBoardButton = document.querySelector('#EditBoardbtn');

    // 보드 수정 모달 열기
    EditBoardButton.addEventListener('click', function () {
        const EditBoardModal = new bootstrap.Modal(document.getElementById('EditBoardModal'));
        EditBoardModal.show();
    });

    // 보드수정 api 요청
    const editBoardForm = document.getElementById('editBoardForm');
    editBoardForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const boardName = document.getElementById('board_name').value;
        const bgColor = document.getElementById('bgColor').value;
        const description = document.getElementById('description').value;

        const formData = {
            board_name: boardName,
            bg_color: bgColor,
            description: description,
        };

        fetch(`/board/${boardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('보드 수정 성공:', data);
                alert('보드가 수정되었습니다.');
                location.reload();
            })
            .catch((error) => {
                console.error('보드수정 실패:', error);
                alert('보드수정에 실패하였습니다.');
            });
    });

    // 보드 삭제 api 요청
    const boardDltButton = document.querySelector('.boardDltBtn');
    boardDltButton.addEventListener('click', function (event) {
        event.preventDefault();

        fetch(`/board/${boardId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('보드 삭제 성공:', data);
                alert('보드가 삭제되었습니다.');
                window.location.href = 'index.html';
            })
            .catch((error) => {
                console.error('보드삭제 실패:', error);
                alert('보드삭제에 실패하였습니다.');
            });
    });

    const addColumnButton = document.querySelector('#addColumnBtn');

    // 칼럼 추가 모달 열기
    addColumnButton.addEventListener('click', function () {
        const addColumnModal = new bootstrap.Modal(document.getElementById('addColumnModal'));
        addColumnModal.show();
    });

    // 칼럼추가 api 요청
    const addColumnForm = document.getElementById('addColumnForm');
    addColumnForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const columnName = document.getElementById('columnAddName').value;

        const formData = {
            column_name: columnName,
        };

        fetch(`/board/${boardId}/column`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('칼럼 생성 성공:', data);
                alert('칼럼 생성되었습니다.');
                location.reload();
            })
            .catch((error) => {
                console.error('칼럼생성 실패:', error);
                alert('칼럼생성에 실패하였습니다.');
            });
    });
    // 참여자 목록 버튼 클릭 시 유저 목록 모달 열기
    const UserListBtn = document.querySelector('#UserListBtn');

    UserListBtn.addEventListener('click', function () {
        const UserListModal = new bootstrap.Modal(document.getElementById('UserListModal'));
        UserListModal.show();
    });

    // 유저 초대 버튼 클릭 시 유저 초대 모달 열기
    const UserInviteBtn = document.querySelector('#UserInviteBtn');

    UserInviteBtn.addEventListener('click', function () {
        const userInviteModal = new bootstrap.Modal(document.getElementById('userInviteModal'));
        userInviteModal.show();
    });

    // 유저 초대 api 요청
    const userInviteForm = document.getElementById('userInviteForm');
    userInviteForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const inviteUserEmail = document.getElementById('inviteUserEmail').value;

        const formData = {
            email: inviteUserEmail,
        };

        fetch(`/board/${boardId}/invite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('유저 초대 성공:', data);
                alert('유저가 초대되었습니다.');
                location.reload();
            })
            .catch((error) => {
                console.error('유저 초대 실패:', error);
                alert('유저초대에 실패하였습니다.');
            });
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
            renderBoardData(data);
        })
        .catch((error) => {
            console.error('보드 조회 실패:', error);
        });
}

function renderBoardData(data) {
    // console.log(data);

    // 보드 이름, 설명, 만든 날짜와 업데이트 날짜를 화면에 표시
    const boardNameElement = document.getElementById('boardName');
    const boardDescriptionElement = document.getElementById('boardDescription');
    const boadCreateUser = document.getElementById('boadCreateUser');
    boardNameElement.textContent = data.data.board_name;
    boardDescriptionElement.textContent = data.data.description;
    boadCreateUser.textContent = `보드 생성자: ${data.data.User.name}`;

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
            if (data.data) {
                const boardDropdown = document.querySelector('#boardDropdown');
                const dropdownMenu = boardDropdown.nextElementSibling;

                // 기존 드롭다운 항목 삭제
                dropdownMenu.innerHTML = '';

                // 조회한 보드 정보를 드롭다운 항목으로 추가
                data.data.forEach((board) => {
                    const dropdownItem = document.createElement('li');
                    dropdownItem.innerHTML = `<a class="dropdown-item" href="#" data-boardid="${board.board_id}">${board.board_name}</a>`;
                    dropdownMenu.appendChild(dropdownItem);
                });

                // 클릭 이벤트 리스너 등록
                const boardDropdownItems = document.querySelectorAll('.dropdown-item');
                boardDropdownItems.forEach((item) => {
                    item.addEventListener('click', function (event) {
                        const selectedBoardId = item.getAttribute('data-boardid');
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

// 초대된 보드 정보조회 및 드롭다운 업데이트
function loadInvitedBoards() {
    fetch('/boards/invited', {
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

                // 초대받은 보드 정보를 드롭다운 항목으로 추가
                data.data.forEach((board) => {
                    const dropdownItem = document.createElement('li');
                    dropdownItem.innerHTML = `<a class="dropdown-item" href="#" data-boardid="${board.board_id}">${board.Board.board_name}</a>`;
                    dropdownMenu.appendChild(dropdownItem);
                });

                // 새로 추가된 보드 목록 선택 이벤트 처리
                const boardDropdownItems = document.querySelectorAll('.dropdown-item');
                boardDropdownItems.forEach((item) => {
                    item.addEventListener('click', function (event) {
                        const selectedBoardId = item.getAttribute('data-boardid');
                        if (selectedBoardId) {
                            navigateToBoardPage(selectedBoardId);
                        }
                    });
                });
            }
        })
        .catch((error) => {
            console.error('초대받은 보드 조회 실패:', error);
        });
}

// 사용자가 만든 보드와 초대받은 보드를 모두 로드하는 함수
function loadAllBoards() {
    loadUserBoards();
    loadInvitedBoards();
}
//column get api
function loadColumnContent(boardId) {
    fetch(`/board/${boardId}/column`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            renderColumnData(data);
        })
        .catch((error) => {
            console.error('칼럼 조회 실패:', error);
        });
}

function renderColumnData(data) {
    const columnListDiv = document.getElementById('columnList');
    data.data.forEach((columnData) => {
        const column_name = columnData['column_name'];
        const column_id = columnData['column_id'];

        const temp_html = `<div id="list" class="board-details p-4 border rounded shadow-sm bg-light mt-4">
        <button type="button" class="btn btn-outline-secondary btn-custom-height" id='editColumnButton' onclick=editColumn(${column_id})>칼럼수정</button>
        <button type="button" class="btn btn-outline-secondary btn-custom-height" id='deleteColumnButton' onclick=deleteColumn(${column_id})>칼럼삭제</button> 
        <div class="d-flex justify-content-between mb-2">
            <h3 class="list-title" id="columnName">${column_name}</h3>
            <ul class="list-items"></ul>
        </div>
    </div>`;
        columnListDiv.insertAdjacentHTML('beforeend', temp_html);
    });
}

function editColumn(column_id) {
    const editColumnModal = new bootstrap.Modal(document.getElementById('editColumnModal'));
    editColumnModal.show();

    const editColumnForm = document.getElementById('editColumnForm');
    editColumnForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const columnName = document.getElementById('columnEditName').value;

        const formData = {
            column_name: columnName,
        };
        fetch(`/column/${column_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('칼럼 생성 성공:', data);
                alert('칼럼 수정되었습니다.');
                location.reload();
            })
            .catch((error) => {
                console.error('칼럼생성 실패:', error);
                alert('칼럼생성에 실패하였습니다.');
            });
    });
}

function deleteColumn(column_id) {
    fetch(`/column/${column_id}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('칼럼 삭제 성공:', data);
            alert('칼럼 삭제되었습니다.');
            location.reload();
        })
        .catch((error) => {
            console.error('칼럼삭제 실패:', error);
            alert('칼럼삭제에 실패하였습니다.');
        });
}

// 보드 페이지로 이동
function navigateToBoardPage(selectedBoard) {
    window.location.href = `board.html?id=${selectedBoard}`;
}

// 참여 유저 모달 내용을 채우는 함수
function fillUserListModal(users) {
    const userListModalContent = document.getElementById('boardUserForm');

    userListModalContent.innerHTML = '';

    users.forEach((user) => {
        const userListItem = document.createElement('li');
        userListItem.className = 'list-group-item';
        userListItem.textContent = user.User.name;
        userListModalContent.appendChild(userListItem);
    });
}

// 보드 유저 정보 요청 api
function loadBoardUsersAndFillModal(modal) {
    const urlParams = new URLSearchParams(window.location.search);
    const boardId = urlParams.get('id');

    fetch(`/board/${boardId}/invite`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            fillUserListModal(data.data);
            const memberCnt = document.getElementById('memberCnt');
            memberCnt.textContent = `참여인원: ${data.data.length + 1} 명`;
        })
        .catch((error) => {
            console.error('보드 유저 조회 실패:', error);
        });
}

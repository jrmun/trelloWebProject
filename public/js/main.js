window.onload = function () {
    // 로고 누르면 새로고침
    const logoElement = document.querySelector('.text-center');
    logoElement.style.cursor = 'pointer';

    logoElement.addEventListener('click', function () {
        location.reload();
    });

    checkLoggedInStatus();
    loadAllBoards();

    // 회원가입 모달 열기
    const signupButton = document.querySelector('.btn-light');
    signupButton.addEventListener('click', function () {
        const signupModal = new bootstrap.Modal(document.getElementById('signupModal'));
        signupModal.show();
    });

    // 회원가입 api 요청
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!validateInput('email', email)) {
            const emailInput = document.getElementById('email');
            const emailFeedback = document.getElementById('emailFeedback');
            emailFeedback.innerText = '이메일 형식이 올바르지 않습니다.';
            emailInput.classList.add('is-invalid');
            return;
        }

        if (!validateInput('nickname', name)) {
            const nameInput = document.getElementById('name');
            const nameFeedback = document.getElementById('nameFeedback');
            nameFeedback.innerText = '닉네임 형식이 올바르지 않습니다.';
            nameInput.classList.add('is-invalid');
            return;
        }

        const formData = {
            name: name,
            email: email,
            password: password,
        };

        fetch('/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('회원가입 성공:', data);
                alert('회원가입이 완료되었습니다.');
                location.reload();
            })
            .catch((error) => {
                console.error('회원가입 실패:', error);
            });
    });

    // 로그인 모달 열기
    const loginButton = document.querySelector('#loginbtn');
    loginButton.addEventListener('click', function () {
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    });

    // 로그인 api 요청
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const formData = {
            email: email,
            password: password,
        };

        fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('로그인 성공:', data);
                alert('로그인이 완료되었습니다.');
                location.reload();
            })
            .catch((error) => {
                console.error('로그인 실패:', error);
                alert('로그인에 실패하였습니다.');
            });
    });

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

    // 보드 추가 모달 열기
    const addBoardButton = document.querySelector('#addBoardBtn');
    addBoardButton.addEventListener('click', function () {
        const addBoardModal = new bootstrap.Modal(document.getElementById('addBoardModal'));
        addBoardModal.show();
    });

    // 보드추가 api 요청
    const addBoardForm = document.getElementById('addBoardForm');
    addBoardForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const boardName = document.getElementById('boardName').value;
        const colorPickerInput = document.getElementById('bgColor');
        const bgColor = colorPickerInput.value;
        const description = document.getElementById('description').value;

        const formData = {
            board_name: boardName,
            bg_color: bgColor,
            description: description,
        };

        fetch('/board', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('보드 생성 성공:', data);
                alert('보드가 생성되었습니다.');
                location.reload();
            })
            .catch((error) => {
                console.error('보드생성 실패:', error);
                alert('보드생성에 실패하였습니다.');
            });
    });

    // 내 정보 버튼 클릭 시 마이 페이지로 이동
    const myInfoButton = document.querySelector('#myInfoBtn');
    myInfoButton.addEventListener('click', function () {
        fetch('/users/me', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    const userId = data.data.user_id;
                    navigateToMyInfoPage(userId);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
};

// 사용자 정보 확인하여 로그인 상태에 따라 버튼 표시
function checkLoggedInStatus() {
    fetch('/users/me', {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
            // 응답 처리
            if (data.data) {
                document.querySelector('#logoutbtn').style.display = 'block';
                document.querySelector('#boardDropdown').style.display = 'block';
                document.querySelector('#addBoardBtn').style.display = 'block';
                document.querySelector('#myInfoBtn').style.display = 'block';
                document.querySelector('#loginbtn').style.display = 'none';
                document.querySelector('#signupbtn').style.display = 'none';
            } else {
                document.querySelector('#loginbtn').style.display = 'block';
                document.querySelector('#signupbtn').style.display = 'block';
                document.querySelector('#logoutbtn').style.display = 'none';
                document.querySelector('#boardDropdown').style.display = 'none';
                document.querySelector('#addBoardBtn').style.display = 'none';
                document.querySelector('#myInfoBtn').style.display = 'none';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// 닉네임, 이메일 유효성 검증
function validateInput(name, value) {
    const patterns = {
        email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
        nickname: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]+$/,
    };

    return patterns[name].test(value);
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

                // 보드 목록 선택 이벤트 처리
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

// 보드 페이지로 이동
function navigateToBoardPage(selectedBoard) {
    window.location.href = `board.html?id=${selectedBoard}`;
}

// 마이 페이지로 이동
function navigateToMyInfoPage(userId) {
    window.location.href = `userInfo.html?id=${userId}`;
}

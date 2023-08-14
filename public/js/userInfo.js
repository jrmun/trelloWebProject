window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    console.log(userId);

    loadUserInfo();

    // 로고 누르면 메인페이지로 이동
    const logoElement = document.querySelector('.text-center');
    logoElement.style.cursor = 'pointer';

    logoElement.addEventListener('click', function () {
        window.location.href = 'index.html';
    });

    checkLoggedInStatus();

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
                window.location.href = 'index.html';
            })
            .catch((error) => {
                console.error('로그아웃 실패:', error);
            });
    });

    // 유저 정보 수정
    const editProfileBtn = document.querySelector('#editProfileBtn');
    // 유저 정보 수정 모달 열기
    editProfileBtn.addEventListener('click', function () {
        const EditUserInfoModal = new bootstrap.Modal(document.getElementById('EditUserInfoModal'));
        EditUserInfoModal.show();
    });

    // 유저 정보 수정 api 요청
    const EditUserInfoForm = document.getElementById('EditUserInfoForm');
    EditUserInfoForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const user_name = document.getElementById('user_name').value;
        const password = document.getElementById('password').value;

        const formData = {
            user_name: user_name,
            password: password,
        };

        fetch('/users/userinfo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('유저정보 수정:', data);
                alert('수정되었습니다.');
                location.reload();
            })
            .catch((error) => {
                console.error('유저정보수정실패:', error);
                alert('실패하였습니다.');
            });
    });

    // 유저 삭제 api 요청
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    deleteAccountBtn.addEventListener('click', function (event) {
        event.preventDefault();

        fetch('/users/userinfo', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('탈퇴 성공:', data);
                alert('탈퇴성공.');
                window.location.href = 'index.html';
            })
            .catch((error) => {
                console.error('탈퇴 실패:', error);
                alert('탈퇴 실패하였습니다.');
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
                document.querySelector('#loginbtn').style.display = 'none';
                document.querySelector('#signupbtn').style.display = 'none';
            } else {
                document.querySelector('#loginbtn').style.display = 'block';
                document.querySelector('#signupbtn').style.display = 'block';
                document.querySelector('#logoutbtn').style.display = 'none';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// 사용자 정보 조회 api 요청 함수
async function loadUserInfo() {
    try {
        const response = await fetch('/users/userinfo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);

            const user = data.user;

            // 사용자 정보 표시
            document.getElementById('userName').textContent = user.name;
            document.getElementById('userEmail').textContent = user.email;
        } else {
            console.error('Failed to fetch user information.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

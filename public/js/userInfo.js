window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    console.log(userId);

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

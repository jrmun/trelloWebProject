// 페이지 실행 시
window.onload = function () {
    // URL에서 쿼리 파라미터 값 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const boardId = urlParams.get('id');
    console.log(boardId);

    if (boardId) {
        loadBoardContent(boardId);
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
        })
        .catch((error) => {
            console.error('보드 조회 실패:', error);
        });
}

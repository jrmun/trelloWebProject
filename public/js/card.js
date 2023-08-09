// 페이지 실행 시
window.onload = function () {
    // URL에서 쿼리 파라미터 값 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    //const columnId = urlParams.get('id');
    const columnId = 6;
    if (columnId) {
        loadCardItem(columnId);
    }

    const logoutButton = document.querySelector('#logoutbtn');
    const cardCreateButton = document.querySelector('#addCardBtn');

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
                location.href = '/';
            })
            .catch((error) => {
                console.error('로그아웃 실패:', error);
            });
    });

    // 카드 추가 모달 열기
    cardCreateButton.addEventListener('click', function () {
        const addCardModal = new bootstrap.Modal(document.getElementById('addCardModal'));
        addCardModal.show();
    });

    // 카드 추가 api 요청
    const addCardForm = document.getElementById('addCardForm');
    addCardForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const CardName = document.getElementById('CardName').value;
        const color = document.getElementById('color').value;
        const content = document.getElementById('content').value;
        const deadline = document.getElementById('deadline').value;
        const formData = {
            title: CardName,
            content: content,
            color: color,
            deadline: deadline,
        };

        fetch(`/columns/${columnId}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('카드 생성 성공:', data);
                alert('카드가 생성되었습니다.');
                location.reload();
            })
            .catch((error) => {
                console.error('카드생성 실패:', error);
                alert('카드생성에 실패하였습니다.');
            });
    });

    // 로고 누르면 메인페이지로 이동
    const logoElement = document.querySelector('.text-center');
    logoElement.style.cursor = 'pointer';

    logoElement.addEventListener('click', function () {
        window.location.href = 'index.html';
    });
};

// 사용자가 만든 보드 조회 및 드롭다운 메뉴 업데이트
function loadCardItem(column_id) {
    fetch(`/columns/${column_id}/cards`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                const cardItemBox = document.querySelector('#carditem');
                console.log('test');
                cardItemBox.innerHTML = '';

                data.result.forEach((card) => {
                    const cardhtml = `<div class="card storeCard m-3">
                                            <div class="card-body">
                                            <div>
                                            <h5 class="card-title">${card.title}</h5>
                                            <h5>중요도 ${card.position} </h5>
                                            </div>
                                            <p class="card-text">${card.deadline}</p>
                                            <p class="card-text">${card.worker}</p>
                                            </div>
                                            <div>
                                            <button type="submit" class="btn btn-primary" id="selectworker" value="${card.card_id}">담당하기</button>
                                            <button type="submit" class="btn btn-primary" id="movePosition" value="${card.card_id}">중요도변경</button>
                                            </div>
                                            </div>`;
                    cardItemBox.innerHTML += cardhtml;
                });
                const selectWorker = document.querySelectorAll('#selectworker');
                const movePosition = document.querySelectorAll('#movePosition');
                //담당자 설정 api
                selectWorker.forEach((card) => {
                    card.addEventListener('click', function () {
                        const card_id = card.getAttribute('value');
                        fetch(`cards/${card_id}/selectworker`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                alert('담당자 설정이 완료되었습니다.');
                                location.reload();
                            })
                            .catch((error) => {
                                alert('담당자 설정에 실패했습니다.');
                            });
                    });
                });
                // 위치 변경 api
                movePosition.forEach((card) => {
                    card.addEventListener('click', function () {
                        const card_id = card.getAttribute('value');

                        var position = prompt('변경할 중요도를 입력해주세요' + '');
                        if (position) {
                            fetch(`cards/${card_id}/moveposition`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ position: position }),
                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    alert('중요도 변경이 완료되었습니다.');
                                    location.reload();
                                })
                                .catch((error) => {
                                    alert('중요도 변경에 실패했습니다.');
                                });
                        } else {
                            alert('중요도를 입력해주세요.');
                        }
                    });
                });
            }
        })
        .catch((error) => {
            console.error('보드 조회 실패:', error);
        });
}

// 페이지 실행 시
window.onload = function () {
    // URL에서 쿼리 파라미터 값 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const boardid = urlParams.get('id');
    if (boardid) {
        loadUserBoards();
        loadCardItem(boardid);
    }

    const logoutButton = document.querySelector('#logoutbtn');
    // const cardCreateButton = document.querySelector('#addCardBtn');

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
                alert('로그아웃 되었습니다.');
                location.href = '/';
            })
            .catch((error) => {
                console.error('로그아웃 실패:', error);
            });
    });

    // // 카드 추가 모달 열기
    // cardCreateButton.addEventListener('click', function () {
    //     const addCardModal = new bootstrap.Modal(document.getElementById('addCardModal'));
    //     addCardModal.show();
    // });

    // // 카드 추가 api 요청 모달창 ~
    // const addCardForm = document.getElementById('addCardForm');
    // addCardForm.addEventListener('submit', function (event) {
    //     event.preventDefault();

    //     const CardName = document.getElementById('CardName').value;
    //     const color = document.getElementById('color').value;
    //     const content = document.getElementById('content').value;
    //     const deadline = document.getElementById('deadline').value;
    //     const formData = {
    //         title: CardName,
    //         content: content,
    //         color: color,
    //         deadline: deadline,
    //     };

    //     fetch(`/columns/${columnId}/cards`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(formData),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             alert(data.message);
    //             location.reload();
    //         })
    //         .catch((error) => {
    //             console.error('카드생성 실패:', error);
    //             alert('카드생성에 실패하였습니다.');
    //         });
    // });

    // 로고 누르면 메인페이지로 이동
    const logoElement = document.querySelector('.text-center');
    logoElement.style.cursor = 'pointer';

    logoElement.addEventListener('click', function () {
        window.location.href = 'index.html';
    });

    // // 칼럼 드롭다운 리스트 가져오기
    // function loadUserColumns() {
    //     fetch(`/columns/${columnId}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             if (data.result) {
    //                 const columnDropdown = document.querySelector('#columnDropdown');
    //                 const dropdownMenu = columnDropdown.nextElementSibling;

    //                 // 기존 드롭다운 항목 삭제
    //                 dropdownMenu.innerHTML = '';

    //                 // 조회한 칼럼 정보를 드롭다운 항목으로 추가
    //                 data.result.forEach((column) => {
    //                     const dropdownItem = document.createElement('li');
    //                     dropdownItem.innerHTML = `<a class="dropdown-item" href="#" data-columnid="${column.column_id}">${column.column_id}: ${column.column_name}</a>`;
    //                     dropdownMenu.appendChild(dropdownItem);
    //                 });

    //                 // 칼럼 목록 선택 이벤트 처리
    //                 const columnDropdownItems = document.querySelectorAll('.dropdown-item');

    //                 columnDropdownItems.forEach((item) => {
    //                     item.addEventListener('click', function (event) {
    //                         const selectedcolumnId = item.getAttribute('data-columnid');

    //                         if (selectedcolumnId) {
    //                             navigateTocolumnPage(selectedcolumnId);
    //                         }
    //                     });
    //                 });
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('보드 조회 실패:', error);
    //         });
    // }
    // function navigateTocolumnPage(selectedColumnId) {
    //     window.location.href = `card.html?id=${selectedColumnId}`;
    // }
};

// 카드 리스트 메인에 부착 + 부착하면서 해당 카드들에 이벤트 삽입
function loadCardItem(board_id) {
    fetch(`/boards/${board_id}/columns`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            const cardItemBox = document.querySelector('#columnitem');
            cardItemBox.innerHTML = '';

            data.result.forEach((column) => {
                const columnhtml = `<div class="card storeCard m-3"><h5>${column.column_name}</h5>
                                            <div class="card storeCard m-3" id="carditem" value="${column.column_id}">
                                            <div id="${column.column_id}">
                                            </div>
                                            </div>
                                        </div>`;
                cardItemBox.innerHTML += columnhtml;
            });

            const cardItem = document.querySelectorAll('#carditem');

            cardItem.forEach((carditem) => {
                const column_id = carditem.getAttribute('value');
                fetch(`/columns/${column_id}/cards`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data) {
                            const cardbox = document.getElementById(`${column_id}`);
                            data.result.forEach((card) => {
                                const cardhtml = `<div class="card storeCard m-3" style="background-color: ${card.color};">
                                                                <div class="card-body" id="card" value="${card.card_id}">
                                                                <div>
                                                                <h5 class="card-title" id="cardtitle" style="font-size:200%; font-weight: bold;" >${card.title}</h5>
                                                                <h5 style="font-weight: bold;" >중요도 : ${card.position}</h5>
                                                                </div>
                                                                <p class="card-text" id="carddeadline">마감일 : ${card.deadline}</p>
                                                                <p class="card-text">담당자 : ${card.worker}</p>
                                                                </div>
                                                                <div>
                                                                <button type="submit" class="btn btn-primary" id="selectworker" value="${card.card_id}">담당하기</button>
                                                                <button type="submit" class="btn btn-primary" id="movePosition" value="${card.card_id}">중요도변경</button>
                                                                </div>
                                                                </div>`;
                                cardbox.innerHTML += cardhtml;
                            });

                            const card = document.querySelectorAll('#card');
                            const selectWorker = document.querySelectorAll('#selectworker');
                            const movePosition = document.querySelectorAll('#movePosition');
                            //카드 수정 api 모달 창으로 통해서
                            card.forEach((card) => {
                                const card_id = card.getAttribute('value');

                                card.addEventListener('click', function () {
                                    //모달 생성
                                    const updateCardModal = new bootstrap.Modal(document.getElementById('updateCardModal'));
                                    updateCardModal.show();
                                    //모달 생성하면 그 안에 기존 데이터를 띄워줌
                                    fetch(`/cards/${card_id}`, {
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                    })
                                        .then((response) => response.json())
                                        .then((data) => {
                                            const card = data.result;
                                            document.getElementById('updateCardName').value = card.title;
                                            document.getElementById('updatecontent').value = card.content;
                                            document.getElementById('updatedeadline').value = card.deadline;
                                        });
                                    // 모달창에 버튼들 Id 값 받아오기
                                    const updatebtn = document.getElementById('updatebtn');
                                    const deletebtn = document.getElementById('deletebtn');
                                    const movecolumnbtn = document.getElementById('movecolumnbtn');
                                    // 업데이트 api 설정
                                    updatebtn.addEventListener('click', function (event) {
                                        event.preventDefault();
                                        const CardName = document.getElementById('updateCardName').value;
                                        const color = document.getElementById('updatecolor').value;
                                        const content = document.getElementById('updatecontent').value;
                                        const deadline = document.getElementById('updatedeadline').value;
                                        const formData = {
                                            title: CardName,
                                            content: content,
                                            color: color,
                                            deadline: deadline,
                                        };

                                        fetch(`/cards/${card_id}`, {
                                            method: 'PUT',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify(formData),
                                        })
                                            .then((response) => response.json())
                                            .then((data) => {
                                                alert(data.message);
                                                if (data.status === 200) {
                                                    location.reload();
                                                }
                                            })
                                            .catch((error) => {
                                                console.error('카드 수정 실패:', error);
                                                alert('카드 수정에 실패하였습니다.');
                                            });
                                    });

                                    // 삭제 api
                                    deletebtn.addEventListener('click', function () {
                                        fetch(`/cards/${card_id}`, {
                                            method: 'DELETE',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                        })
                                            .then((response) => response.json())
                                            .then((data) => {
                                                alert(data.message);
                                                if (data.status === 200) {
                                                    location.reload();
                                                }
                                            })
                                            .catch((error) => {
                                                console.error('카드 삭제 실패:', error);
                                                alert('카드 삭제에 실패하였습니다.');
                                            });
                                    });

                                    movecolumnbtn.addEventListener('click', function () {
                                        var columnid = prompt('이동할 칼럼의 번호를 입력해주세요' + '');
                                        if (columnid) {
                                            fetch(`cards/${card_id}/movecolumn`, {
                                                method: 'PUT',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({ column_id: columnid }),
                                            })
                                                .then((response) => response.json())
                                                .then((data) => {
                                                    alert(data.message);
                                                    if (data.status === 200) {
                                                        location.reload();
                                                    }
                                                })
                                                .catch((error) => {
                                                    alert('칼럼 이동동에 실패했습니다.');
                                                });
                                        } else {
                                            alert('칼럼 번호를 입력해주세요.');
                                        }
                                    });
                                });
                            });

                            //담당자 설정 api 현재 로그인되어있는 유저가 담당자로 설정됨
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
                                            alert(data.message);
                                            if (data.status === 200) {
                                                location.reload();
                                            }
                                        })
                                        .catch((error) => {
                                            alert('담당자 설정에 실패했습니다.');
                                        });
                                });
                            });
                            // 위치 변경 api prompt를 통해 값을 받고 값을 토대로 변경됨
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
                                                alert(data.message);
                                                if (data.status === 200) {
                                                    location.reload();
                                                }
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
                        console.error('카드 수정 실패:', error);
                        alert('카드 수정에 실패하였습니다.');
                    });
            });
        });
}
//페이지 실행 시 헤더에 보드 리스트 불러오기
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
// 보드 리스트 클릭 시 해당 보드 정보로 연결
function navigateToBoardPage(selectedBoard) {
    window.location.href = `board.html?id=${selectedBoard}`;
}

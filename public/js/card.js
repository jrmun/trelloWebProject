// 카드 리스트 메인에 부착 + 부착하면서 해당 카드들에 이벤트 삽입
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
                                <button type="button" class="btn btn-outline-secondary btn-custom-height" id='createCardButton' onclick=createCard(${column_id})>카드추가</button> 
                                <div class="d-flex justify-content-between mb-2">
                                    <h3 class="list-title" id="columnName">${column_name}</h3>
                                    <ul class="list-items"></ul>
                                </div>
                                <div class="card storeCard m-3" id="carditemlist" value="${column_id}">
                                                                    <div id="column${column_id}">
                                                                    </div>
                                                                    </div>
                            </div>`;
        columnListDiv.insertAdjacentHTML('beforeend', temp_html);
    });

    const cardItem = document.querySelectorAll('#carditemlist');
    console.log(cardItem);
    cardItem.forEach((carditems) => {
        const column_id = carditems.getAttribute('value');
        fetch(`/columns/${column_id}/cards`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const cardlists = data.result;
                if (data) {
                    const cardbox = document.getElementById(`column${column_id}`);
                    cardlists.forEach((card) => {
                        const cardhtml = `<div class="card storeCard m-3" style="background-color: ${card.color};" id="${card.card_id}">
                                                                <div class="card-body" id="card" value="${card.card_id}">
                                                                <div>
                                                                <h5 class="card-title" id="cardtitle" style="font-size:200%; font-weight: bold;" >${card.title}</h5>
                                                                <h5 style="font-weight: bold;" >중요도 : ${card.position}</h5>
                                                                </div>
                                                                <p class="card-text" id="carddeadline">마감일 : ${card.deadline}</p>
                                                                <p class="card-text">담당자 : ${card.worker}</p>
                                                                </div>
                                                                <div>
                                                                <button type="submit" class="btn btn-primary" id="selectworker${card.card_id}" value="${card.card_id}">담당하기</button>
                                                                <button type="submit" class="btn btn-primary" id="movePosition${card.card_id}" value="${card.card_id}">중요도변경</button>
                                                                </div>
                                                                </div>`;
                        cardbox.innerHTML += cardhtml;
                    });

                    cardlists.forEach((cards) => {
                        cardapi(cards.card_id);
                    });
                }
            });
    });

    function cardapi(card_id) {
        const card = document.getElementById(`${card_id}`);
        const updatebtn = card.querySelector(`#selectworker${card_id}`);
        const movebtn = card.querySelector(`#movePosition${card_id}`);
        const cardbody = card.querySelector(`#card`);
        updatebtn.addEventListener('click', function () {
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
        movebtn.addEventListener('click', function () {
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
        cardbody.addEventListener('click', function () {
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
                const color = document.getElementById('cardupdatecolor').value;
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
            //컬럼 이동 api
            movecolumnbtn.addEventListener('click', function () {
                var column_name = prompt('이동할 칼럼의 번호를 입력해주세요' + '');
                if (column_name) {
                    fetch(`cards/${card_id}/movecolumn`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ column_name: column_name }),
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
    }
}

function createCard(column_id) {
    const addCardModal = new bootstrap.Modal(document.getElementById('addCardModal'));
    addCardModal.show();
    const createCardBtn = document.getElementById('createCardBtn');
    createCardBtn.addEventListener('click', function (event) {
        event.preventDefault();

        const CardName = document.getElementById('CardName').value;
        const color = document.getElementById('cardcreatecolor').value;
        const content = document.getElementById('content').value;
        const deadline = document.getElementById('deadline').value;
        const formData = {
            title: CardName,
            content: content,
            color: color,
            deadline: deadline,
        };

        fetch(`/columns/${column_id}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                location.reload();
            })
            .catch((error) => {
                console.error('카드생성 실패:', error);
                alert('카드생성에 실패하였습니다.');
            });
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

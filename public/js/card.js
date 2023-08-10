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
            const columns = data.result;
            const cardItemBox = document.getElementById('columntestbox');
            cardItemBox.innerHTML = '';
            columns.forEach((column) => {
                const columnhtml = `<div class="card storeCard m-3"><h1><center>${column.column_name}</center></h1>
                                            <div align="center" height: 30px;">
                                            <button type="submit" class="btn btn-primary" id="create${column.column_id}">카드 생성</button>
                                            </div>
                                            <div class="card storeCard m-3" id="carditemlist" value="${column.column_id}">
                                            <div id="column${column.column_id}">
                                            </div>
                                            </div>
                                        </div>`;
                cardItemBox.innerHTML += columnhtml;
            });
            columns.forEach((column) => {
                createCard(column.column_id);
            });
            const cardItem = document.querySelectorAll('#carditemlist');

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
        });

    function createCard(column_id) {
        const cardCreateButton = document.getElementById(`create${column_id}`);
        cardCreateButton.addEventListener('click', function () {
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
        });
    }

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
    }
}

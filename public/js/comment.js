window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const card_id = urlParams.get('id');
    if (card_id) {
        cardDetailView(card_id);
    }
    const logoElement = document.querySelector('.text-center');
    logoElement.style.cursor = 'pointer';

    logoElement.addEventListener('click', function () {
        window.location.href = 'index.html';
    });
};

function cardDetailView(card_id) {
    fetch(`/cards/${card_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            const card = data.result;
            document.getElementById('detailCardTitle').innerHTML = card.title;
            document.getElementById('detailcontent').innerHTML = card.content;
            document.getElementById('detaildeadline').innerHTML = card.deadline;
        });
    fetch(`/card/${card_id}/comments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            const commentBox = document.getElementById('commentBox');
            commentBox.innerHTML = '';
            data.data.forEach((comment) => {
                const commenthtml = `<div class="card storeCard m-3">
                                        <div class="card-body">
                                                <h5 class="card-title" id="cardtitle" style="font-size:200%; font-weight: bold;" >이름 : ${comment.name}</h5>
                                                <h5 style="font-weight: bold;" >내용 : ${comment.content}</h5>
                                            <button type="submit" class="btn btn-primary" onclick=updateComment(${comment.comment_id})>수정</button>
                                            <button type="submit" class="btn btn-primary" onclick=deleteComment(${comment.comment_id})>삭제</button>
                                        </div>
                                    </div>`;
                commentBox.innerHTML += commenthtml;
            });
        });
    const createcommentModal = document.getElementById('createcommentModal');

    createcommentModal.addEventListener('click', function () {
        const addcommentModal = new bootstrap.Modal(document.getElementById('addcommentModal'));
        addcommentModal.show();
        const commentcreatebtn = document.getElementById('commentcreatebtn');
        commentcreatebtn.addEventListener('click', function (event) {
            event.preventDefault();
            const content = document.getElementById('commentTextBox').value;
            const formData = {
                content: content,
            };
            fetch(`/card/${card_id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => {
                    alert('댓글 생성에 성공하였습니다.');
                    location.reload();
                })
                .catch((error) => {
                    console.error('댓글생성 실패:', error);
                    alert('댓글생성에 실패하였습니다.');
                });
        });
    });
}

function updateComment(comment_id) {
    const updatecommentModal = new bootstrap.Modal(document.getElementById('updatecommentModal'));
    updatecommentModal.show();

    const commentupdatebtn = document.getElementById('commentupdatebtn');
    commentupdatebtn.addEventListener('click', function (event) {
        event.preventDefault();
        const content = document.getElementById('commentUpdateTextBox').value;
        const formData = {
            content: content,
        };
        fetch(`/comments/${comment_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                alert('댓글 수정에 성공하였습니다.');
                location.reload();
            })
            .catch((error) => {
                console.error('댓글수정 실패:', error);
                alert('댓글 수정에 실패하였습니다.');
            });
    });
}

function deleteComment(comment_id) {
    fetch(`/comments/${comment_id}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            alert('댓글 삭제되었습니다.');
            location.reload();
        })
        .catch((error) => {
            console.error('댓글삭제 실패:', error);
            alert('댓글삭제에 실패하였습니다.');
        });
}

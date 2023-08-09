const boardDropdownItems = document.querySelector('boarditem');
const columnDropdownItems = document.querySelector('columnitem');

console.log(columnDropdownItems);
console.log(boardDropdownItems);

boardDropdownItems.forEach((item) => {
    item.addEventListener('click', function (event) {
        console.log('click');

        const selectedBoardId = item.getAttribute('data-boardid');
        console.log(selectedBoardId);

        if (selectedBoardId) {
            navigateToBoardPage(selectedBoardId);
        }
    });
});

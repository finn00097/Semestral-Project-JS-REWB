// Game Library - DataTable with pagination, sorting and searching
document.addEventListener('DOMContentLoaded', function () {

    var table = new DataTable('#library', {
        pageLength: 10,
        scrollX: true,
        lengthMenu: [5, 10, 25, 50, 100],
        order: [[1, 'asc']],
        columnDefs: [
            { targets: 0, width: '40px' }
        ],
        language: {
            search: 'Search games:',
            lengthMenu: 'Show _MENU_ games',
            info: 'Showing _START_ to _END_ of _TOTAL_ games',
            infoFiltered: '(filtered from _MAX_ games)',
            zeroRecords: 'No game found'
        }
    });

    // Filter buttons: All / Board games / Video games (column 2 = Type)
    document.querySelectorAll('[data-filter]').forEach(function (button) {
        button.addEventListener('click', function () {
            document.querySelectorAll('[data-filter]').forEach(function (b) { b.classList.remove('active'); });
            button.classList.add('active');
            var value = button.getAttribute('data-filter');
            table.column(2).search(value === 'all' ? '' : value).draw();
        });
    });
});

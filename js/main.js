// Semestral Project - shared scripts for all pages
document.addEventListener('DOMContentLoaded', function () {

    // ---- Bootstrap tooltips (elements with data-bs-toggle="tooltip") ----
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (el) {
        new bootstrap.Tooltip(el);
    });

    // ---- "Back to top" button ----
    var backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            backToTop.classList.toggle('show', window.scrollY > 400);
        });
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- Modal with varying content (video-games.html) ----
    // Each "Details" button carries the game info in data-* attributes.
    var gameModal = document.getElementById('gameModal');
    if (gameModal) {
        gameModal.addEventListener('show.bs.modal', function (event) {
            var button = event.relatedTarget;
            gameModal.querySelector('.modal-title').textContent = button.getAttribute('data-title');
            gameModal.querySelector('[data-field="genre"]').textContent = button.getAttribute('data-genre');
            gameModal.querySelector('[data-field="year"]').textContent = button.getAttribute('data-year');
            gameModal.querySelector('[data-field="platform"]').textContent = button.getAttribute('data-platform');
            gameModal.querySelector('[data-field="hours"]').textContent = button.getAttribute('data-hours');
            gameModal.querySelector('[data-field="text"]').textContent = button.getAttribute('data-text');
            var rating = parseInt(button.getAttribute('data-rating'), 10);
            var bar = gameModal.querySelector('[data-field="rating"]');
            bar.style.width = (rating * 10) + '%';
            bar.textContent = rating + ' / 10';
            bar.parentElement.setAttribute('aria-valuenow', rating);
        });
    }

    // ---- Join form: Bootstrap validation + success message ----
    var form = document.getElementById('joinForm');
    if (form) {
        var hours = document.getElementById('hours');
        var hoursValue = document.getElementById('hoursValue');
        if (hours && hoursValue) {
            hours.addEventListener('input', function () {
                hoursValue.textContent = hours.value;
            });
        }

        var message = document.getElementById('message');
        var counter = document.getElementById('messageCounter');
        if (message && counter) {
            message.addEventListener('input', function () {
                counter.textContent = message.value.length;
            });
        }

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            // at least one preferred day must be selected
            var days = form.querySelectorAll('input[name="days"]');
            var oneChecked = Array.prototype.some.call(days, function (d) { return d.checked; });
            days.forEach(function (d) { d.setCustomValidity(oneChecked ? '' : 'Choose at least one day'); });

            if (form.checkValidity()) {
                var name = document.getElementById('firstName').value;
                document.getElementById('successName').textContent = name;
                var toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('saveToast'));
                toast.show();
                form.reset();
                form.classList.remove('was-validated');
                if (hoursValue) { hoursValue.textContent = hours.value; }
                if (counter) { counter.textContent = '0'; }
                return;
            }
            form.classList.add('was-validated');
        });

        form.addEventListener('change', function (event) {
            if (event.target.name === 'days') {
                var days = form.querySelectorAll('input[name="days"]');
                var oneChecked = Array.prototype.some.call(days, function (d) { return d.checked; });
                days.forEach(function (d) { d.setCustomValidity(oneChecked ? '' : 'Choose at least one day'); });
            }
        });
    }
});

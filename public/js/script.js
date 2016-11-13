$('#message').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Кнопка, що викликає модаль
  var recipient = button.data('whatever') // Витягування інфи з атрибутів data-*
  // Якщо необхідно, ви можете створювати тут AJAX-запит (а потім здійснювати оновлення в callback).
  // Оновлення вмісту модалі. Ми будемо використовувати тут jQuery, але ви можете використовувати бібліотеку data binding або інші методи.
  var modal = $(this)
  modal.find('.modal-title').text('Нове повідомлення для ' + recipient)
  modal.find('.modal-body #recipient-name').val(recipient)
})
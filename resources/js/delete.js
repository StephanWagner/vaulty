function deleteItem(id) {
  $.ajax({
    url: '/deleteRequest',
    method: 'post',
    data: {
      id: id
    },
    headers: {
      'X-CSRF-TOKEN': $('.csrf-token [name="_token"]').val()
    },
    beforeSend: function () {
      $('.modal-delete__button--submit').attr('disabled', 'disabled').addClass('loading-bar');
    },
    complete: function () {
      $('.modal-delete__button--submit').removeAttr('disabled').removeClass('loading-bar');
    },
    success: function (response) {
      if (!response || response.error) {
        error(response.error);
        return;
      }

      if (response.success && response.id) {
        success(__('successMessageItemDeleted'));
        $('.passwords__item-wrapper[data-id="' + response.id + '"]').remove();
        if (!$('.passwords__item-wrapper').length) {
          $('.passwords__none-created').addClass('active');
          $('.search__textfield').removeClass('active').val('').attr('disabled', 'disabled');
        }
        checkFilteredItems();
        app.deleteModal.close();
        return;
      }

      error();
    },
    error: function () {
      ajaxError();
    }
  });
}

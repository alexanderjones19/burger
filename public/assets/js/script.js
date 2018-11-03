$(function() {
    registerPartial("burger-block", "#burgers-block-partial");
    displayPage();
    setupEventHandlers();
});
  
function registerPartial(name, partialId) {
    var source = $(partialId).text();
    Handlebars.registerPartial(name, source);
}
  
function displayPage() {
    $.get('/api/burgers/').then(
        function(burgers) {
            renderTemplate({burgers: burgers});
        }
    );
}
  
function renderTemplate(data) {
    var source = $('#page-template').text();
    var template = Handlebars.compile(source);
    var html = template(data);
    $('#app').html(html);
}
  
function setupEventHandlers() {
    $(document).on('click', '.change-devoured', function(event) {
      var id = $(this).data('id');
  
      $.ajax('/api/burgers/' + id, {
        type: 'PUT',
        data: { devoured: 1 }
      }).then(
        function() {
          displayPage();
        }
      );
    });
  
    $(document).on('submit', '.create-form', function(event) {
      event.preventDefault();
    
      if ($('#burger-input').val().trim() != '') {
        var newBurger = {
            burger_name: $('#burger-input').val().trim(),
          };
      
          $.ajax('/api/burgers', {
            type: 'POST',
            data: newBurger
          }).then(
            function() {
              displayPage();
            }
          );
      }
    });
};
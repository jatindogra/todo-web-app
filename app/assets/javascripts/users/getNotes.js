var getNotes;

getNotes = (function() {
  function getNotes($log, todoService) {
    this.$log = $log;
    this.todoService = todoService;
    this.$log.debug("constructing UserController");
    this.notess = [];
    this.getAllNotes();
  }

  getNotes.prototype.getAllNotes = function() {
    this.$log.debug("getAllNotes()");
    return this.todoService.listNotes().then((function(_this) {
      return function(data) {
        _this.$log.debug("Promise returned " + data.length + " Users");
        return _this.notess = data;
      };
    })(this), (function(_this) {
      return function(error) {
        return _this.$log.error("Unable to get Users: " + error);
      };
    })(this));
  };


  return getNotes;

})();

controllersModule.controller('getNotes', getNotes);
var deleteCtrl;

deleteCtrl = (function() {
  function deleteCtrl($log, $location, $routeParams, todoService) {
    this.$log = $log;
    this.$location = $location;
    this.$routeParams = $routeParams;
    this.todoService = todoService;
    this.$log.debug("constructing deleteCtrl");
    this.user = {};
    this.findNote();
  }

  deleteCtrl.prototype.deleteNote = function() {
    this.$log.debug("deleteNote()");
    this.user.active = true;
    return this.todoService.deleteNote(this.$routeParams.title, this.$routeParams.note, this.user).then((function(_this) {
      return function(data) {
        _this.$log.debug("Promise returned User");
        _this.user = data;
        return _this.$location.path("/");
      };
    })(this), (function(_this) {
      return function(error) {
        return _this.$log.error("Unable to update User: " + error);
      };
    })(this));
  };

  deleteCtrl.prototype.findNote = function() {
    var title, note;
    title = this.$routeParams.title;
    note = this.$routeParams.note;
    this.$log.debug("findUser route params: " + title + " " + note);
    return this.todoService.listNotes().then((function(_this) {
      return function(data) {
        _this.$log.debug("Promise returned Users");
        return _this.user = (data.filter(function(user) {
          return user.title === title && user.note === note;
        }))[0];
      };
    })(this), (function(_this) {
      return function(error) {
        return _this.$log.error("Unable to get Users: " + error);
      };
    })(this));
  };

  return deleteCtrl;

})();

controllersModule.controller('deleteCtrl', deleteCtrl);
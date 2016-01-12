var todoCtrl;

todoCtrl = (function() {
  function todoCtrl($scope, $log, todoService) {
    this.$scope = $scope;
    this.$log = $log;
    this.$log.debug("Success todoCtrl");
    this.todoService = todoService;
    this.todonote = {};

    /*this.save = function() {

    this.$log.debug("user clicked save");
    console.log($scope.noteInfo)
  };*/
  this.save = function() {
    this.$log.debug("save()");
    this.todonote.active = true;
    return this.todoService.save(this.todonote).then((function(_this) {
      return function(data) {
        _this.$log.debug("Promise returned " + data);
        _this.user = data;
      };
    })(this), (function(_this) {
      return function(error) {
        return _this.$log.error("Unable to create note: " + error);
      };
    })(this));
  };
   }

  return todoCtrl;

})();

controllersModule.controller('todoCtrl', todoCtrl);

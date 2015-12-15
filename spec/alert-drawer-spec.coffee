describe 'alertDrawer', ->

  beforeEach -> module 'templates'
  beforeEach -> module 'alertDrawer'

  beforeEach inject (@$rootScope, @$compile, @$timeout) ->
    sinon.spy @$rootScope, '$on'
    sinon.spy @$rootScope, '$emit'

    @$scope = @$rootScope.$new()
    @element = @$compile('<alert-drawer></alert-drawer>') @$scope
    @$rootScope.$digest()

  it 'shows success alert when alert.success event broadcasted', ->

    @$rootScope.$emit 'alert.success', 'You did it!'
    @$scope.$apply()

    @element.is('.success').should.be.true
    @element.is('.slide').should.be.true
    @element.is(':contains("You did it!")').should.be.true
    @element.find('.fa-check').length.should.equal 1
    @element.find('.fa-check.ng-hide').length.should.equal 0

  it 'shows processing alert when alert.processing event broadcasted', ->

    @$rootScope.$emit 'alert.processing', 'Workin it'
    @$scope.$apply()

    @element.is('.processing').should.be.true
    @element.is('.slide').should.be.true
    @element.is(':contains("Workin it")').should.be.true
    @element.find('.fa-spinner').length.should.equal 1
    @element.find('.fa-spinner.ng-hide').length.should.equal 0

  it 'shows danger alert when alert.danger event broadcasted', ->

    @$rootScope.$emit 'alert.danger', 'Yikes, watch out!'
    @$scope.$apply()

    @element.is('.danger').should.be.true
    @element.is('.slide').should.be.true
    @element.is(':contains("Yikes, watch out!")').should.be.true
    @element.find('.fa-exclamation-triangle.js-danger').length.should.equal 1
    @element.find('.fa-exclamation-triangle.js-danger.ng-hide').length.should.equal 0

  it 'shows warning alert when alert.warning event broadcasted', ->

    @$rootScope.$emit 'alert.warning', 'Something happened but not a big deal'
    @$scope.$apply()

    @element.is('.warning').should.be.true
    @element.is('.slide').should.be.true
    @element.is(':contains("Something happened but not a big deal")').should.be.true
    @element.find('.fa-exclamation-triangle.js-warning').length.should.equal 1
    @element.find('.fa-exclamation-triangle.js-warning.ng-hide').length.should.equal 0

  it 'dismisses alert when alert.dismiss event broadcasted', ->

    @$rootScope.$emit 'alert.success', 'You did it!'
    @$scope.$apply()

    @element.is('.slide').should.be.true

    @$rootScope.$emit 'alert.dismiss'
    @$scope.$apply()

    @element.is('.slide').should.be.false

  it 'dismisses the alert when you click the x', ->

    @$rootScope.$emit 'alert.success', 'You did it!'
    @$scope.$apply()

    @element.is('.slide').should.be.true

    @element.find('.dismiss').click()

    @element.is('.slide').should.be.false

  it 'dismisses the alert after the timeout expires', ->

    @$rootScope.$emit 'alert.success', 'You did it!'
    @$scope.$apply()

    @element.is('.slide').should.be.true

    @$timeout.flush()

    @element.is('.slide').should.be.false

  it 'emits alert-drawer-ready once alert events are bound', ->
    @$rootScope.$emit.callCount.should.eql 1
    @$rootScope.$emit.should.have.been.calledWith 'alert-drawer-ready'
    @$rootScope.$emit.should.have.been.calledAfter @$rootScope.$on

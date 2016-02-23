'use strict';

describe('Service: QRCode', function () {

  // load the service's module
  beforeEach(module('accessControlApp'));

  // instantiate service
  var QRCode;
  beforeEach(inject(function (_QRCode_) {
    QRCode = _QRCode_;
  }));

  it('should do something', function () {
    expect(!!QRCode).toBe(true);
  });

});

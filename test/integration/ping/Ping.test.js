const path = '/';
let cont;
let callId;

describe('Ping API', () => {
  it('Check Ping', done => {
    callId = `test${custom.app.toLowerCase()}Id${new Date().getTime()}${cont++}`;
    chai
      .request(server)
      .get(path)
      .set('id', callId)
      .set('language', 'ES')
      .set('app', `${custom.app} - test`)
      .set('version', `${custom.version} - test`)
      .end((err, res) => {
        checkHeaders(res, 200);
        res.body.status.should.containIgnoreCase('alive!');
        done();
      });
  });
});

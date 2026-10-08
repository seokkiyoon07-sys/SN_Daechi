const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { NextRequest } = require('next/server');

const valid = { program: '프리윈터', studentName: '테스트', gender: '남', school: '테스트학교', grade: '2027 고1', parentPhone: '010-0000-0000', studentPhone: '010-0000-0001', preferredDate: '2026-12-01', privacyAgreed: true, marketingAgreed: false };
function harness({ configured = true, delivery = 'ok', storage = 'ok' } = {}) {
  const calls = [];
  const saved = [];
  const cache = {};
  function load(file) {
    if (!path.extname(file)) file += '.ts';
    if (cache[file]) return cache[file].exports;
    const module = { exports: {} }; cache[file] = module;
    const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
    vm.runInNewContext(code, { module, exports: module.exports, require: name => name.startsWith('@/') ? load(path.resolve(__dirname, '..', name.slice(2))) : require(name), process: { env: { STUDENT_WEB_API_URL: 'https://admin.invalid', ...(configured ? { JANDI_WEBHOOK_URL: 'https://jandi.invalid' } : {}) } }, AbortSignal, Date,
      fetch: async (url, options) => {
        if (url === 'https://admin.invalid/app/api/application/winter') {
          saved.push(JSON.parse(options.body));
          if (storage === 'throw') throw new Error('Storage unavailable');
          return { ok: storage !== 'fail', status: storage === 'fail' ? 500 : 201, json: async () => storage === 'invalid' ? {} : ({ success: true, id: 'winter-saved-id' }) };
        }
        assert.equal(saved.length, 1); assert.equal(url, 'https://jandi.invalid'); calls.push(JSON.parse(options.body)); if (delivery === 'throw') throw new Error('Network failure'); return { ok: delivery === 'ok' };
      },
    });
    return module.exports;
  }
  const { POST } = load(path.resolve(__dirname, '../app/api/winter-application/route.ts'));
  return { calls, saved, send: (data, origin) => POST(new NextRequest('http://localhost/api/winter-application', { method: 'POST', headers: origin ? { origin } : {}, body: typeof data === 'string' ? data : JSON.stringify(data) })) };
}
test('successful delivery includes all approved fields and optional consent', async () => {
  const h = harness(); const res = await h.send(valid);
  assert.equal(res.status, 200); assert.equal((await res.json()).success, true); assert.equal(h.calls.length, 1);
  const message = JSON.stringify(h.calls[0]);
  for (const key of ['program', 'studentName', 'gender', 'school', 'grade', 'parentPhone', 'studentPhone', 'preferredDate']) assert.ok(message.includes(valid[key]), key);
  assert.ok(message.includes('홍보 안내: 미동의'));
});
test('invalid input never reaches Jandi', async () => {
  for (const update of [{ privacyAgreed: false }, { gender: 'invalid' }, { studentName: ' ' }, { school: '' }, { parentPhone: 'bad' }, { studentPhone: '' }, { preferredDate: '2027-02-30' }, { preferredDate: '2027-01-01' }, { grade: '고9' }, { program: 'other' }]) {
    const h = harness(); assert.equal((await h.send({ ...valid, ...update })).status, 400); assert.equal(h.calls.length, 0);
  }
});
test('optional message is preserved in admin payload and Jandi notification', async () => {
  const h = harness(); const message = '상담 요청사항\n주말 등원 문의';
  assert.equal((await h.send({ ...valid, message })).status, 200);
  assert.equal(h.saved[0].message, message);
  assert.ok(h.calls[0].connectInfo.some(item => item.title === '하고 싶은 말' && item.description === message));
  for (const message of ['a'.repeat(1001), 42, null]) {
    const invalid = harness(); assert.equal((await invalid.send({ ...valid, message })).status, 400); assert.equal(invalid.saved.length, 0);
  }
  assert.equal((await harness().send({ ...valid, message: '' })).status, 200);
});
test('winter dates and combined-program dates match the form', async () => {
  for (const preferredDate of ['2027-01-01', '2027-02-27']) assert.equal((await harness().send({ ...valid, program: '윈터스쿨', preferredDate })).status, 200);
  assert.equal((await harness().send({ ...valid, program: '프리윈터 + 윈터스쿨', preferredDate: '2026-12-31' })).status, 200);
});
test('saved application stays successful when optional Jandi is unavailable', async () => {
  for (const options of [{ configured: false }, { delivery: 'fail' }, { delivery: 'throw' }]) {
    const h = harness(options); const res = await h.send(valid);
    assert.equal(res.status, 200); const result = await res.json(); assert.equal(result.success, true); assert.equal(result.id, 'winter-saved-id');
    if (options.configured === false) assert.equal(h.calls.length, 0);
  }
});
test('storage failure never notifies or reports success', async () => {
  for (const storage of ['fail', 'throw', 'invalid']) {
    const h = harness({ storage }); const res = await h.send(valid);
    assert.equal(res.status, 502); assert.notEqual((await res.json()).success, true); assert.equal(h.calls.length, 0);
  }
});
test('malformed, oversized and cross-origin requests are rejected', async () => {
  const h = harness();
  assert.equal((await h.send('{')).status, 400);
  assert.equal((await h.send(null)).status, 400);
  assert.equal((await h.send('x'.repeat(8193))).status, 413);
  assert.equal((await h.send(valid, 'https://other.invalid')).status, 403);
  assert.equal(h.calls.length, 0);
});

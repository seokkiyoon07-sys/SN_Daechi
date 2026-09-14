const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { NextRequest } = require('next/server');

function harness({ saveFails = false, notifyFails = false, configured = true } = {}) {
  const calls = [];
  const records = new Map();
  const cache = {};
  const env = { SEAT_API_ORIGIN: 'https://storage.invalid', ...(configured ? { JANDI_WEBHOOK_URL: 'https://jandi.invalid' } : {}) };
  async function fetch(url, options) {
    const input = JSON.parse(options.body);
    if (url.startsWith(env.SEAT_API_ORIGIN)) {
      calls.push('save');
      if (saveFails) return { ok: false, status: 503, json: async () => ({ error: 'Storage unavailable' }) };
      if (!records.has(input.requestId)) records.set(input.requestId, { ...input, id: 'saved-reservation', status: 'PENDING' });
      return { ok: true, status: 201, json: async () => ({ success: true, ...records.get(input.requestId) }) };
    }
    calls.push('notify');
    assert.equal(url, env.JANDI_WEBHOOK_URL);
    assert.match(JSON.stringify(input), /saved-reservation/);
    assert.match(JSON.stringify(input), /10:00 ~ 12:00/);
    return { ok: !notifyFails };
  }
  function load(file) {
    if (!path.extname(file)) file += '.ts';
    if (cache[file]) return cache[file].exports;
    const module = { exports: {} }; cache[file] = module;
    const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
    vm.runInNewContext(code, { module, exports: module.exports, require: name => name.startsWith('@/') ? load(path.resolve(__dirname, '..', name.slice(2))) : require(name), process: { env }, fetch, AbortSignal, Date, Set });
    return module.exports;
  }
  const { POST } = load(path.resolve(__dirname, '../app/api/study-cafe-reservations/route.ts'));
  return { calls, records, send: input => POST(new NextRequest('http://localhost/api/study-cafe-reservations', { method: 'POST', body: JSON.stringify(input) })) };
}

const input = { requestId: 'reservation-test-123456', kind: 'FULL_DAY', date: '2099-01-01', startTime: '10:00', endTime: '12:00', seatId: 'P1', name: 'Test', phone: '01000000000', consent: true, message: '' };

test('both daily passes save before notifying and return the stored ID', async () => {
  for (const kind of ['FULL_DAY', 'AFTERNOON']) {
    const h = harness(); const response = await h.send({ ...input, kind }); const result = await response.json();
    assert.deepEqual(h.calls, ['save', 'notify']);
    assert.equal(result.id, 'saved-reservation'); assert.equal(result.notificationStatus, 'sent');
    assert.equal(h.records.get(input.requestId).startTime, '10:00');
  }
});
test('storage failure never notifies or reports receipt', async () => {
  const h = harness({ saveFails: true }); const response = await h.send(input);
  assert.equal(response.status, 503); assert.deepEqual(h.calls, ['save']); assert.equal(h.records.size, 0);
});
test('notification failure preserves receipt; retry reuses the request ID', async () => {
  const h = harness({ notifyFails: true });
  for (let attempt = 0; attempt < 2; attempt++) {
    const result = await (await h.send(input)).json();
    assert.equal(result.success, true); assert.equal(result.notificationStatus, 'failed'); assert.equal(result.id, 'saved-reservation');
  }
  assert.equal(h.records.size, 1);
});
test('missing webhook still saves receipt', async () => {
  const h = harness({ configured: false }); const result = await (await h.send(input)).json();
  assert.equal(result.success, true); assert.equal(result.notificationStatus, 'unconfigured'); assert.deepEqual(h.calls, ['save']);
});
test('invalid time is rejected before saving', async () => {
  const h = harness(); assert.equal((await h.send({ ...input, endTime: '09:00' })).status, 400); assert.deepEqual(h.calls, []);
});
test('business room keeps its existing storage route', async () => {
  const h = harness(); const result = await (await h.send({ ...input, kind: 'BUSINESS_ROOM' })).json();
  assert.equal(result.success, true); assert.deepEqual(h.calls, ['save']);
});

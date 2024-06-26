import { d as defineEventHandler, r as readBody } from '../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';

const yookassa = defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);
  return body;
});

export { yookassa as default };
//# sourceMappingURL=yookassa.mjs.map

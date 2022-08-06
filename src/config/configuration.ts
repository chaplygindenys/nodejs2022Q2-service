import { readFile } from 'fs/promises';
import { join } from 'path';
import { cwd } from 'process';
import { parse as yamlParse } from 'yaml';

const SwagerDocument = async () => {
  const stringYaml = await readFile(join(cwd(), 'doc', 'api.yaml'), 'utf-8');
  return yamlParse(stringYaml);
};
const PromiseOpenAPIObject = SwagerDocument();

export default PromiseOpenAPIObject;

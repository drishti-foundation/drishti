import tr from 'googletrans';
import logger from '../../../logger';
import { Language } from './constants';

const translate = async (text: string, lang: Language) => {
  logger.info(`Translating text to ${lang}: ${text}`);
  const res = await tr(text, { from: 'en', to: lang });

  logger.info(`Got text: ${JSON.stringify(res.text, null, 2)}`);
  return res.text;
};

export default translate;

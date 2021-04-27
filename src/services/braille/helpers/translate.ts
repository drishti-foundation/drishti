// import axios from 'axios';
// import logger from '../../../logger';

// const URL = 'https://api-gw.revup.reverieinc.com/apiman-gateway/ReverieHackathon/localization/1.0';
// 
// interface Translation {
//   inString: string;
//   outString: string;
//   api_status: number;
// }
// interface ReverieResponse {
//   responseList: Translation[];
// }
// 
// const translate = async (text: string) => {
//   logger.info(`Translating text: ${text}`);
// 
//   try {
//       const response = await axios.post<ReverieResponse>(
//         URL,
//         {
//           data: [text],
//           src: 'en',
//           tgt: 'hi',
//         },
//         {
//           params: {
//             source_lang: 'english',
//             target_lang: 'hindi',
//             mt_context: 'generic_english_proper',
//           },
//           headers: {
//             'REV-API-KEY': process.env.REV_API_KEY,
//             'REV-APP-ID': process.env.REV_APP_ID,
//             'Content-Type': 'application/json',
//             'Cache-Control': 'no-cache',
//           },
//         }
//       );
// 
//       if (response.status !== 200) throw response.statusText;
// 
//       logger.info(`Got response: ${JSON.stringify(response.data.responseList, null, 2)}`);
// 
//       return response.data.responseList[0].outString;
//   } catch(e) {
//       logger.error(`Failed with error: ${e}`);
//   }
// };
// 
// export default translate;

import tr from 'googletrans';
import logger from '../../../logger';

const translate = async (text: string) => {
  logger.info(`Translating text: ${text}`);
  const res = await tr(text, {from : "en" , to : "hi"});

  logger.info(`Got text: ${JSON.stringify(res.text, null, 2)}`);
  return res.text;
};

export default translate;

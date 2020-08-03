import axios from 'axios';

const URL = 'https://api-gw.revup.reverieinc.com/apiman-gateway/ReverieHackathon/localization/1.0';

interface Translation {
  inString: string;
  outString: string;
  api_status: number;
}
interface ReverieResponse {
  responseList: Translation[];
}

const translate = async (text: string) => {
  const response = await axios.post<ReverieResponse>(
    URL,
    {
      data: [text],
      src: 'en',
      tgt: 'hi',
    },
    {
      params: {
        source_lang: 'english',
        target_lang: 'hindi',
        mt_context: 'generic_english_proper',
      },
      headers: {
        'REV-API-KEY': process.env.REV_API_KEY,
        'REV-APP-ID': process.env.REV_APP_ID,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    }
  );

  if (response.status !== 200) throw response.headers.status;

  console.log(response.headers.status);
  console.log(response.data.responseList[0]);

  return response.data.responseList[0].outString;
};

export default translate;

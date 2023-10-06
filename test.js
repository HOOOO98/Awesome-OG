import { getUrlMeta } from './getmetadata.js'; // 파일 경로를 수정하세요.

const targetUrl = 'https://awesome-dummy-89dc8.firebaseapp.com/?_gl=1*1ipqzc4*_ga*ODExNjA3MDEyLjE2OTI3MTc3NDE.*_ga_CW55HF8NVT*MTY5NjQ4MjEwNC43MC4xLjE2OTY0ODM0NDcuNTkuMC4w';

(async () => {
  try {
    const metaData = await getUrlMeta(targetUrl);
    console.log(metaData);
  } catch (error) {
    console.error('오류 발생:', error.message);
  }
})();

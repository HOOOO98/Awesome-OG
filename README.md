# Awesome-OG
Practicing scrapping open graphs

# Step 1 : folder structure
```
📦awesome-og
 ┣ 📂nodemodules
 ┣ 📜getmetadata.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜test.js
```

# Step 1 : getmetadata.js
```
import cheerio from 'cheerio'

export function _getHostname(url) {
  let start = url.indexOf('://') + 3
  let end = url.indexOf('/', start)
  return url.slice(start, end)
}

export function _getProtocol(url) {
  let end = url.indexOf('://') + 3
  return url.slice(0, end)
}

export function _bodyScrap(url) {
  return ($) => {
    // 글제목
    let title = $('meta[property=\'og:title\']').attr('content')
    if (!title) {
      title = $('head title').text()
      if (!title) {
        throw Error('This link has no title')
      }
    }
    // 글이미지
    let image = $('meta[property=\'og:image\']').attr('content')
    if (!image) {
      image = $('img').attr('src')
      //이미지 세팅
      if (image && image.indexOf('http') === 0) {
        // http 로 시작하면 그냥 사용
      } else if (image && image[0] === '/') {
        // image 경로가 / 로 시작한다면
        //let urlObj = new URL(url);
        image = _getProtocol(url) + _getHostname(url) + image
      } else {
        image = ''
      }
    }

    // 글요약본
    let desc = $('meta[property=\'og:description\']').attr('content')
    if (!desc) {
      desc = ''
    }
    return {
      title,
      image,
      desc,
    }
  }
}

export async function getUrlMeta(url) {
  const meta = await fetch(url)
    .then((res) => res.text())
    .then(cheerio.load)
    .then(_bodyScrap(url))
  return meta
}
```

# Step1 : test.js
```
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
```

# Step1 : How can I get a json data on console?
Check your current root directory. <br>
Enter the code below into the terminal.
```
node test.js
```
Then you can get json data from the console as shown in the picture below.

![awesomeog](https://github.com/HOOOO98/Awesome-OG/assets/120024673/188f0b7c-5021-430c-b177-e018ac06b644)

<br>
<br>
<br>
<br>
<br>

---

## 🙇‍♂️The next step will be on the 'step2' branch.🙇‍♂️

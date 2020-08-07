# @cmuh-model - user-profile

TBD.
## 前言:
**Model為後端邏輯的核心，你必須要將前端要的資料需求寫在Model裡的function()，才能在DB裡抓資料，整個前後端運作如下**

```
    前端            後端       
WebApp   <=/=>   WebApi   =>   Model   =>   Database
                /XX/路由        方程式()          資料
```

**以Sample為例，我們可能有四種function，所有的邏輯都是寫在這裡面**

***Model***
* getSample(){ }
* setSample(){ }
* addSample(){ }
* removeSample(){ }

**例如: getSample3 取得一筆data[]，可能對這data[]做forEach，在每個data裡面do something..**

**Model之撰寫簡說**
* 依正規化規則，撰寫你的model、test，改掉所有的Sample字眼
* 根據你要連接的SQL Sever設定你的api.config.json
* 下指令```npm run test```，Model會去SQL SERVER 執行你填寫的預存程序(Stored Procedure)
* 如果訊息是Pass代表成功了，如果要看內容可以把show()函式的console.log(res);註解打開


* 本專案編譯會自動生成說明文件，請先安裝 typedoc 套件
  >> npm install --global typedoc
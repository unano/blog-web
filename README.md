
#  **BL.ORG - blog App**


![BL.ORG](https://res.cloudinary.com/drspqpjo3/image/upload/v1675102212/blorg-readme/blorg_plarq8.png)


### Build with ###


[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)[![TypeScript](https://img.shields.io/badge/TypeScript-3d85c6?style=for-the-badge&logo=TypeScript&logoColor=white)](https://www.typescriptlang.org)[![Redux](https://img.shields.io/badge/Redux-f3f6f4?style=for-the-badge&logo=redux&logoColor=674ea7)](https://redux.js.org)[![Node.js](https://img.shields.io/badge/Node.js-38ad03?style=for-the-badge&logo=node.js&logoColor=black)](https://nodejs.org)[![Express](https://img.shields.io/badge/express-f3f6f4?style=for-the-badge&logo=express&logoColor=black)](https://expressjs.com)[![MongoDB](https://img.shields.io/badge/Mongodb-783f04?style=for-the-badge&logo=mongodb&logoColor=38ad03)](http://forthebadge.com)[![Socket.io](https://img.shields.io/badge/Socket.io-f3f6f4?style=for-the-badge&logo=socket.io&logoColor=black
)](https://socket.io/)

<br/>

## Website URL  ##

https://transcendent-marshmallow-982b7d.netlify.app/forget_password


<br/>

### Deployed on  ###

[![Netlify](https://img.shields.io/badge/Netlify-005eff?style=for-the-badge&logo=netlify&logoColor=26d7b2)](https://www.netlify.com/)[![Render](https://img.shields.io/badge/Render-073763?style=for-the-badge&logo=render&logoColor=28f2c8)](https://render.com)

### Test with  ###
[![Cypress](https://img.shields.io/badge/cypress-bef8ec?style=for-the-badge&logo=cypress&logoColor=black)](https://www.cypress.io)

### Design with  ###
[![InkScape](https://img.shields.io/badge/Inkscape-f3f6f4?style=for-the-badge&logo=inkscape&logoColor=black)](https://inkscape.org)

 <br /> 

## Index ##

1. Local set up    本地部署
2. Function & Page Introduction  功能&页面介绍
3. mobile adaptation  移动端适配

 <br /> 

## How to set up the app locally ##

 <br /> 

### dependencies install

in root direction, do operations below:

```
npm install
cd client 
npm install
```

### run app locally

in root direction, do operations below:

```
npm run dev
cd client 
npm start
```

### environment variables(.env) configurations

```
MONGO_URL = 
ACTIVE_TOKEN_SECRET = 
ACCESS_TOKEN_SECRET = 
REFRESH_TOKEN_SECRET = 

BASE_URL = 

MAIL_CLIENT_ID = 
MAIL_CLIENT_SECRET = 
MAIL_REFRESH_TOKEN = 

NODE_ENV = 
```

** BASE_URL is the host of client **

Please fill in all the environment variables before run locally

<br/>

## App Introduction

为了方便介绍,以下使用中文介绍网站的功能和界面

如果想要体验网站,可使用该账号登陆:

_username = test@gmail.com_

_password = 123456_

** **不要用该账号进行密码找回!为了不泄露个人信息,该账户是我直接写进数据库的,绕过了邮箱验证,我不知道现实中该账户是否存在,无论如何给这样一个账户申请密码找回,最终只会是影响该账户所有者,或是收不到任何消息,因为您和我都无法进邮箱验证** **



** **不建议用不是自己的邮箱进行注册!可能会影响他人!如果无法收到邮件,那是因为我注册的OAuth为测试板,只有七天使用时间,过时后需要重新配置,我不一定会按时配置,所以该注册功能可能会无法正常使用.同时我也不建议使用注册功能(因为可能会影响他人,同时您的邮箱会存储至数据库,这对于您来说十分不安全),而是使用我提供的测试账号** **

### Home page ###

![Home Page 1](https://res.cloudinary.com/drspqpjo3/image/upload/v1675158691/blorg-readme/%E6%88%AA%E5%B1%8F2023-01-31_17.40.45_crqpex.png)

网页上方是导航栏,在未登陆前,可以进行博客搜索,登陆和注册.

主页中主要展示各种博客,博客根据其类型进行划分,在主页中每种类型最多只展示四个博客,请点击“Read more"或是左上角的类型名来查看更多的博客.

 <br /> 

![Home Page 2](https://res.cloudinary.com/drspqpjo3/image/upload/v1675158700/blorg-readme/%E6%88%AA%E5%B1%8F2023-01-31_17.49.32_hooef4.png)

也可以展开左侧的side bar以查看所有的博客种类记忆搜索想要的博客种类,通过点击类型名称来查看的博客类型.

 <br /> 

![Home Page 2](https://res.cloudinary.com/drspqpjo3/image/upload/v1675169030/blorg-readme/%E6%88%AA%E5%B1%8F2023-01-31_20.42.53_t4gwjw.png)

搜索栏可以根据输入内容搜索x相关的文章

 <br /> 

### Category page ###


![Home Page 2](https://res.cloudinary.com/drspqpjo3/image/upload/v1675159846/blorg-readme/%E6%88%AA%E5%B1%8F2023-01-31_18.06.28_nt4wd9.png)

点击种类后会展示所有相同种类的博客.一页最多展示9个博客,超出的博客会分页显示.

 <br /> 

### Login & Register & Forget Passwrod page ###

![Login page 1](https://res.cloudinary.com/drspqpjo3/image/upload/v1675170955/blorg-readme/%E6%88%AA%E5%B1%8F2023-01-31_21.04.02_e9olaa.png)

登陆页面不多说了

![Login page 2](https://res.cloudinary.com/drspqpjo3/image/upload/v1675170954/blorg-readme/%E6%88%AA%E5%B1%8F2023-01-31_21.04.29_admgdn.png)

注册时会向注册用户的邮箱发送验证邮件,用户点击邮件内链接后方可完成注册

** **不建议用不是自己的邮箱进行注册!可能会影响他人!如果无法收到邮件,那是因为我注册的OAuth为测试板,只有七天使用时间,过时后需要重新配置,我不一定会按时配置,所以该注册功能可能会无法正常使用.同时我也不建议使用注册功能(因为可能会影响他人,同时您的邮箱会存储至数据库,这对于您来说十分不安全),而是使用我提供的测试账号** **

![Login page 3](https://res.cloudinary.com/drspqpjo3/image/upload/v1675170869/blorg-readme/%E6%88%AA%E5%B1%8F2023-01-31_21.13.58_wxmln3.png)


 <br /> 

### Blog page ###

点击某一篇博客的名称可以查看该博客

![Blog page 1](https://res.cloudinary.com/drspqpjo3/image/upload/v1675160209/blorg-readme/%E6%88%AA%E5%B1%8F2023-01-31_18.13.27_lzitr4.png)

博客页面展示博客名称,作者,时间和内容

 <br /> 

![Blog page 2](https://res.cloudinary.com/drspqpjo3/image/upload/v1675160248/blorg-readme/%E6%88%AA%E5%B1%8F2023-01-31_18.15.33_ateeft.png)

用户可以给该博客点赞,也可以在博客下方进行评论

 <br /> 

![Blog page 3](https://res.cloudinary.com/drspqpjo3/image/upload/v1675160320/blorg-readme/%E6%88%AA%E5%B1%8F2023-01-31_18.17.33_aqlnjk.png)

同时用户也可以回复各种评论,以及给评论点赞

** **注意此处使用到socket.io,所以博客的评论是可以实时更新的** **

 <br /> 

![Blog Page 4](https://res.cloudinary.com/drspqpjo3/image/upload/v1675160792/blorg-readme/%E6%88%AA%E5%B1%8F2023-01-31_18.26.05_qifngp.png)

![Blog Page 5](https://res.cloudinary.com/drspqpjo3/image/upload/v1675160998/blorg-readme/%E6%88%AA%E5%B1%8F2023-01-31_18.29.31_pf7qxf.png)


对于自己的评论.可以进行删除和修改评论内容

 <br /> 

![Blog Page 6](https://res.cloudinary.com/drspqpjo3/image/upload/v1675160797/blorg-readme/%E6%88%AA%E5%B1%8F2023-01-31_18.25.28_oufpzo.png)


如果用户是博主的话,可以删除自己博客下任何人的发言.

 <br /> 


### Create Blog Page ###

![Create Blog Page 1](https://res.cloudinary.com/drspqpjo3/image/upload/v1675161267/blorg-readme/%E6%88%AA%E5%B1%8F2023-01-31_18.34.02_nanmyc.png)

用户可以在这里写新的博客,需要输入博客名,博客简介,博客小图标,博客种类,博客内容.博客的字数,图像大小等都要要求,如果不满足要求会有网页提示,满足要求后即可发布.

 <br /> 

### Category Page ###

![Category Page 1](https://res.cloudinary.com/drspqpjo3/image/upload/v1675161568/blorg-readme/%E6%88%AA%E5%B1%8F2023-01-31_18.39.03_nycsfg.png)

只有管理员能访问该页面,管理员可以增加博客类型,修改类型名和删除类型.如果想要删除已经有博客使用过的种类时,会失败并弹出提示.

![Category Page 2](https://res.cloudinary.com/drspqpjo3/image/upload/v1675168854/blorg-readme/%E6%88%AA%E5%B1%8F2023-01-31_20.40.13_wqgfia.png)

 <br /> 

### User profile Page ###

点击导航栏头像后点击'profile'可进入此页面,或者在首页的博客中点击自己的博客卡片里面自己名字进入.

 <br /> 

![User profile Page 11](https://res.cloudinary.com/drspqpjo3/image/upload/v1675169424/blorg-readme/%E6%88%AA%E5%B1%8F2023-01-31_20.48.05_ghmjne.png)


![User profile Page 2](https://res.cloudinary.com/drspqpjo3/image/upload/v1675169429/blorg-readme/%E6%88%AA%E5%B1%8F2023-01-31_20.49.49_b2mok1.png)

该页面可以查看个人信息,修改密码和头像,同时可以查看自己发布过的博客,可以对博客进行删除和修改.

 <br /> 


![User profile Page 3](https://res.cloudinary.com/drspqpjo3/image/upload/v1675169425/blorg-readme/%E6%88%AA%E5%B1%8F2023-01-31_20.48.57_ntgokm.png)

除此之外,点击'following'或是'followers'可以查看自己正在关注的人或事关注自己的人

 <br /> 

### User Info Page ###

 ![User Info Page 1](https://res.cloudinary.com/drspqpjo3/image/upload/v1675170059/blorg-readme/%E6%88%AA%E5%B1%8F2023-01-31_21.00.27_n3evoz.png)

这里可以查看其他用户的信息,博客以及关注/取关该用户

 <br /> 


## Mobile Adaptation ##

移动端页面适配测试:


<img src="https://res.cloudinary.com/drspqpjo3/image/upload/v1675172948/blorg-readme/917F859391A706D0671D54385FE3C96D_h77epo.png" alt="drawing" width="48%"/>
<img src="https://res.cloudinary.com/drspqpjo3/image/upload/v1675172945/blorg-readme/E82DFEA130F05DF25E89452B7FBE360D_wt9tgu.jpg" alt="drawing" width="48%"/>

<img src="https://res.cloudinary.com/drspqpjo3/image/upload/v1675172927/blorg-readme/74EAC750DF761D89C55A8C9F7C177E52_bj2tfh.jpg" alt="drawing" width="48%"/>
<img src="https://res.cloudinary.com/drspqpjo3/image/upload/v1675172943/blorg-readme/91DB53F0D15529D86BC483E614D001EE_dhtnoh.png" alt="drawing" width="48%"/>

<img src="https://res.cloudinary.com/drspqpjo3/image/upload/v1675172868/blorg-readme/60E793F4A2542ED5C84AB4DE0A260868_jhfrkv.jpg" alt="drawing" width="48%"/>
<img src="https://res.cloudinary.com/drspqpjo3/image/upload/v1675172865/blorg-readme/3212E43D8277FCAB7C1464714D8D1F28_jcqkbm.jpg" alt="drawing" width="48%"/>

<img src="https://res.cloudinary.com/drspqpjo3/image/upload/v1675172858/blorg-readme/E4A2E57D9B8A3C29449526CAB953B676_hwph2y.jpg" alt="drawing" width="48%"/>
<img src="https://res.cloudinary.com/drspqpjo3/image/upload/v1675172938/blorg-readme/F223F638182B669631F145FC9EED5679_lbxrcm.png" alt="drawing" width="48%"/>



<!-- ![Mobile 1](https://res.cloudinary.com/drspqpjo3/image/upload/v1675172948/blorg-readme/917F859391A706D0671D54385FE3C96D_h77epo.png)

![Mobile 2](https://res.cloudinary.com/drspqpjo3/image/upload/v1675172945/blorg-readme/E82DFEA130F05DF25E89452B7FBE360D_wt9tgu.jpg)

![Mobile 3](https://res.cloudinary.com/drspqpjo3/image/upload/v1675172927/blorg-readme/74EAC750DF761D89C55A8C9F7C177E52_bj2tfh.jpg)

![Mobile 4](https://res.cloudinary.com/drspqpjo3/image/upload/v1675172868/blorg-readme/60E793F4A2542ED5C84AB4DE0A260868_jhfrkv.jpg)



![Mobile 5](https://res.cloudinary.com/drspqpjo3/image/upload/v1675172865/blorg-readme/3212E43D8277FCAB7C1464714D8D1F28_jcqkbm.jpg)
      
![Mobile 6](https://res.cloudinary.com/drspqpjo3/image/upload/v1675172858/blorg-readme/E4A2E57D9B8A3C29449526CAB953B676_hwph2y.jpg)

![Mobile 7](https://res.cloudinary.com/drspqpjo3/image/upload/v1675172871/blorg-readme/714F9EB5EA1F97C967A8D68E6095E8A4_xxopls.jpg)

![Mobile 8](https://res.cloudinary.com/drspqpjo3/image/upload/v1675172938/blorg-readme/F223F638182B669631F145FC9EED5679_lbxrcm.png) -->


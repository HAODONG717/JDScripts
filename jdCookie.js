/*
此文件为Node.js专用。其他用户请忽略
 */
//此处填写京东账号cookie。
let CookieJDs = ["{shshshfpa=4d093239-906e-a144-ec9b-1207b54ce028-1601515056; shshshfpb=pF1WZODoqZRNy48yZzKvGXA%3D%3D; __jdu=1800591865; pinId=PSbk_nX6GwtM9nnft2aWyg; pin=wdNnUcnwxEEZun; unick=%E5%A4%A7%E5%86%AC%E7%93%9CO; _tp=lR%2BSLfSqNVXM7etz7Zwepg%3D%3D; _pst=wdNnUcnwxEEZun; mba_muid=1800591865; shshshfp=82b1d877e2ff567703634fd1a6e67642; jcap_dvzw_fp=4az8U4gLpQyYdiRDxb3fuPjs0gokKt8TCoM0YxQXjR5EpbVoBS4Phlmbi6A1pd0p20XbYw==; whwswswws=; __jdv=122270672%7Cdirect%7C-%7Cnone%7C-%7C1643473896051; __jda=122270672.1800591865.1640704454.1642335200.1643473896.3; __jdc=122270672; shshshsID=19e83b1e63e7ae8f450e781fe7bc3d94_2_1643473948100; 3AB9D23F7A4B3C9B=K7JIY7MZBO6XH4SZLO6UIM7W32JPPY5Q5QOSG3XEGHCGOUU45U5CHCZ6STXS3LGJ3CVXR4OL474BVMVDAUB6Y5D7XE; TrackerID=TMgK0Uwh2TUBAHC3pQwrea6x7hdSDQMJ57JD8rC29_5m4tXIMO3e5PT6D1bgIATtyi6CkMirY4sMiBki5H4uoyaerdbBbe_-4qivbPNj71M; pt_key=AAJh9Ww2ADDRJCz0ZMYf8xlwtjbkqz9LGXTTVset-xg7V9UYYvujVCWDJY_wT2aiFgr0TiuT0UA; pt_pin=wdNnUcnwxEEZun; pt_token=9xq1hnd3; pwdt_id=wdNnUcnwxEEZun; sfstoken=tk01mc6051ccfa8sM3gxKzN4MngygzAdYbXtFwRS/e8Z8JzPURpX3q1srJZeKY92Hn0H75n3rmEzRY+y0gkFyfvaevNc; wxa_level=1; mobilev=html5; __jdb=122270672.15.1800591865|3.1643473896; mba_sid=16434738960536453946486654076.15; __jd_ref_cls=MJingDou_Activity_VisitExpo}"]
// 判断环境变量里面是否有京东ck
if (process.env.JD_COOKIE) {
  if (process.env.JD_COOKIE.indexOf('&') > -1) {
    CookieJDs = process.env.JD_COOKIE.split('&');
  } else if (process.env.JD_COOKIE.indexOf('\n') > -1) {
    CookieJDs = process.env.JD_COOKIE.split('\n');
  } else {
    CookieJDs = [process.env.JD_COOKIE];
  }
}
if (JSON.stringify(process.env).indexOf('GITHUB')>-1) {
  console.log(`请勿使用github action运行此脚本,无论你是从你自己的私库还是其他哪里拉取的源代码，都会导致我被封号\n`);
  !(async () => {
    await require('./sendNotify').sendNotify('提醒', `请勿使用github action、滥用github资源会封我仓库以及账号`)
    await process.exit(0);
  })()
}
CookieJDs = [...new Set(CookieJDs.filter(item => !!item))]
console.log(`\n====================共${CookieJDs.length}个京东账号Cookie=========\n`);
console.log(`==================脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).toLocaleString()}=====================\n`)
if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
for (let i = 0; i < CookieJDs.length; i++) {
  if (!CookieJDs[i].match(/pt_pin=(.+?);/) || !CookieJDs[i].match(/pt_key=(.+?);/)) console.log(`\n提示:京东cookie 【${CookieJDs[i]}】填写不规范,可能会影响部分脚本正常使用。正确格式为: pt_key=xxx;pt_pin=xxx;（分号;不可少）\n`);
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['CookieJD' + index] = CookieJDs[i].trim();
}

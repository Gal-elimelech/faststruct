import { chromium, firefox, webkit } from 'playwright';
import fs from 'node:fs/promises';
const base='http://127.0.0.1:4173/';
const profiles=[
 {name:'mobile-iphone',w:390,h:844,mobile:true},
 {name:'mobile-small',w:320,h:720,mobile:true},
 {name:'tablet',w:768,h:1024,mobile:true},
 {name:'laptop',w:1366,h:768,mobile:false},
 {name:'desktop',w:1920,h:1080,mobile:false},
];
const issues=[];
await fs.mkdir('finish-selector/test-results',{recursive:true});
for(const [browserName,browserType] of Object.entries({chromium,firefox,webkit})){
 let browser;
 try{browser=await browserType.launch({headless:true});}
 catch(e){issues.push({browser:browserName,issue:'launch failed',detail:String(e)});continue;}
 for(const profile of profiles){
  const context=await browser.newContext({viewport:{width:profile.w,height:profile.h},isMobile:profile.mobile&&browserName!=='firefox',hasTouch:profile.mobile});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(String(e)));
  try{
   await page.goto(base,{waitUntil:'domcontentloaded',timeout:30000});
   await page.waitForTimeout(1500);
   const initial=await page.evaluate(()=>({title:document.title,scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth,steps:document.querySelectorAll('.step-button').length,brokenImages:[...document.querySelectorAll('img')].filter(x=>x.complete&&!x.naturalWidth).map(x=>x.alt).slice(0,10)}));
   if(initial.scrollWidth>initial.viewport+2)issues.push({browser:browserName,profile:profile.name,issue:'horizontal overflow',data:initial});
   if(initial.steps<6)issues.push({browser:browserName,profile:profile.name,issue:'steps missing',data:initial});
   if(initial.brokenImages.length)issues.push({browser:browserName,profile:profile.name,issue:'broken image',data:initial.brokenImages});
   await page.screenshot({path:`finish-selector/test-results/${browserName}-${profile.name}.png`,fullPage:true,timeout:30000});
   const b=page.locator('button[data-select]').first();
   if(await b.count()){
     await b.click({timeout:15000});
     const selected=await b.getAttribute('aria-pressed');
     if(selected!=='true')issues.push({browser:browserName,profile:profile.name,issue:'selection aria-pressed not updated',selected});
     await page.reload({waitUntil:'domcontentloaded'});
     if(await page.locator('button[data-select][aria-pressed="true"]').count()===0)issues.push({browser:browserName,profile:profile.name,issue:'selection did not persist'});
   }
   const review=page.locator('#view-selections');
   if(await review.count()){await review.click({timeout:15000});if(!await page.locator('#resume-selections').count())issues.push({browser:browserName,profile:profile.name,issue:'summary not opening'});else await page.locator('#resume-selections').click();}
   for(let i=0;i<initial.steps;i++){
    await page.locator('.step-button').nth(i).click({timeout:15000});
    const w=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth,step:document.querySelector('#step-eyebrow')?.textContent,broken:[...document.querySelectorAll('#content-body img')].filter(x=>x.complete&&!x.naturalWidth).map(x=>x.alt).slice(0,6)}));
    if(w.scroll>w.viewport+2)issues.push({browser:browserName,profile:profile.name,step:i+1,issue:'step overflow',data:w});
    if(w.broken.length)issues.push({browser:browserName,profile:profile.name,step:i+1,issue:'broken step image',data:w.broken});
   }
   if(errors.length)issues.push({browser:browserName,profile:profile.name,issue:'javascript page errors',data:errors});
   console.log('CHECK',browserName,profile.name,JSON.stringify(initial));
  }catch(e){issues.push({browser:browserName,profile:profile.name,issue:'test exception',detail:String(e)});}
  await context.close();
 }
 await browser.close();
}
await fs.writeFile('finish-selector/test-results/summary.json',JSON.stringify({issues},null,2));
console.log('VISUAL_TEST_ISSUES',JSON.stringify(issues));
if(issues.length)process.exitCode=1;

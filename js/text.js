/* Reads the plain-text wording file (js/survey-text.js; format explained at its top).
   parse() → {T:{ko:{key:text}, en:{key:text}}, keys:[...], errors:[...]}; fill() puts values into {placeholders}. */
window.SurveyText=(function(){
"use strict";
function parse(src){
  const T={ko:{},en:{}},keys=[],errors=[];
  let key=null,last=null;
  String(src||"").split(/\r?\n/).forEach((raw,i)=>{
    const line=raw.trim(),n=i+1;let m;
    if(!line||line[0]==="#")return;
    if((m=/^\[([A-Za-z0-9_.]+)\]$/.exec(line))){
      key=m[1];last=null;
      if(keys.includes(key))errors.push(n+"번째 줄: ["+key+"] 항목이 두 번 있어요");else keys.push(key);
      return;
    }
    if((m=/^(ko|en)\s*:(.*)$/.exec(line))){
      if(!key){errors.push(n+"번째 줄: [항목 이름] 줄보다 먼저 나왔어요");return}
      if(T[m[1]][key]!=null)errors.push(n+"번째 줄: ["+key+"] "+m[1]+": 줄이 두 번 있어요");
      T[m[1]][key]=m[2].trim();last=m[1];
      return;
    }
    if(line[0]==="|"&&key&&last){T[last][key]+="\n"+line.slice(1).replace(/^ /,"");return}
    errors.push(n+"번째 줄: 형식을 알 수 없어요 → "+line.slice(0,40));
  });
  keys.forEach(k=>["ko","en"].forEach(l=>{if(T[l][k]==null)errors.push("["+k+"] "+l+": 줄이 없어요")}));
  return{T,keys,errors};
}
// "{name}" → vars.name; an unknown name is left as is and reported through onMissing(name)
function fill(str,vars,onMissing){
  return String(str).replace(/\{([A-Za-z0-9_]+)\}/g,(all,k)=>vars&&vars[k]!=null?String(vars[k]):(onMissing&&onMissing(k),all));
}
return{parse,fill};
})();

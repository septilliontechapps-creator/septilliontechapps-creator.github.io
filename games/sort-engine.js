/* Shared logic for Water Sort + Screw Sort */
(function(){
const SortEngine={
  gen(level,cap,firstLevel){
    if(level===1&&firstLevel)return JSON.parse(JSON.stringify(firstLevel));
    const r=JG.rng(level*104729+cap);
    const n=Math.min(11,2+Math.ceil(level/2)),empty=level<3?1:2;
    for(let t=0;t<50;t++){
      const segs=[];for(let c=0;c<n;c++)for(let k=0;k<cap;k++)segs.push(c);
      JG.shuffle(segs,r);
      const tubes=[];for(let c=0;c<n;c++)tubes.push(segs.slice(c*cap,c*cap+cap));
      for(let e=0;e<empty;e++)tubes.push([]);
      if(!SortEngine.solved(tubes,cap)&&tubes.every(tb=>tb.length===0||new Set(tb).size>1||tb.length<cap))return tubes;
    }
    return [[0,1],[1,0],[]];
  },
  top(t){if(!t.length)return {c:null,k:0};const c=t[t.length-1];let k=0;for(let i=t.length-1;i>=0&&t[i]===c;i--)k++;return {c,k}},
  canPour(a,b,cap){if(a===b||!a.length||b.length>=cap)return false;const ta=SortEngine.top(a);return !b.length||b[b.length-1]===ta.c},
  pour(a,b,cap){const ta=SortEngine.top(a);const m=Math.min(ta.k,cap-b.length);for(let i=0;i<m;i++)b.push(a.pop());return m},
  solved(tubes,cap){return tubes.every(t=>t.length===0||(t.length===cap&&t.every(c=>c===t[0])))},
  anyMove(tubes,cap){for(let i=0;i<tubes.length;i++)for(let j=0;j<tubes.length;j++)if(SortEngine.canPour(tubes[i],tubes[j],cap)){const t=SortEngine.top(tubes[i]);if(!(tubes[j].length===0&&t.k===tubes[i].length))return true}return false}
};
window.SortEngine=SortEngine;
})();

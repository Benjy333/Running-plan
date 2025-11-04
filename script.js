// ---- helpers ----
const byId=id=>document.getElementById(id);
const LS_KEY="run_carddata_v1";

function loadState(){try{return JSON.parse(localStorage.getItem(LS_KEY))||{};}catch(e){return{}}}
function saveState(s){localStorage.setItem(LS_KEY,JSON.stringify(s));}

function humanDate(iso){const d=new Date(iso+"T00:00:00");return d.toLocaleDateString(undefined,{weekday:"short",day:"2-digit",month:"short"});}
function humanDay(iso){const d=new Date(iso+"T00:00:00");return d.toLocaleDateString(undefined,{weekday:"long"});}

// ---- data ----
function r(w,d,s,det,hr,purp,acts){return{week:w,date:d,session:s,details:det,hr, purpose:purp,activities:acts};}
const ROWS=[
r(1,"2025-11-03","Easy Run + Pilates","5 km easy @ 5:30–5:50 /km","💓 Z1–Z2 (125–145 bpm)","🎯 Aerobic recovery & fat-burn",["Easy Run","Pilates"]),
r(1,"2025-11-04","Gym (Lower Body)","Squats 3×8 + Lunges 3×10 + Calf Raises 3×15","💪 Strength / Mobility","🎯 Power output maintenance",["Gym – Lower"]),
r(1,"2025-11-05","Pilates + Key Run","6km speed intervals, 6 * 400m or 3 * 1km at 3:35 pace","💓 Z3–Z4 (155–179 bpm)","🎯 Threshold or speed development",["Pilates","Key Run"]),
r(1,"2025-11-06","Swim","1.5–2 km steady + drills","💓 Aerobic","🎯 Active recovery",["Swim"]),
r(1,"2025-11-07","Gym (Upper + Core)","Bench, Rows, Planks, Hip work","💪 –","🎯 Posture stability",["Gym – Upper/Core"]),
r(1,"2025-11-08","Parkrun 5 km","Warm up 2 km + Strides ×4 → 5 km race effort","💓 Z4 (167–179 bpm)","🎯 Benchmark run",["Parkrun"]),
r(1,"2025-11-09","Pilates + Long Run","10–12 km @ 5:20–6:20 /km (hill option)","💓 Z2 (135–150 bpm)","🎯 Endurance build",["Pilates","Long Run"]),
// replicate pattern Weeks 2–5
];
for(let w=2;w<=5;w++){
  for(let i=0;i<7;i++){
    const base=ROWS[i];
    const date=new Date("2025-11-03T00:00:00");date.setDate(date.getDate()+7*(w-1)+i);
    const iso=date.toISOString().slice(0,10);
    ROWS.push({...base,week:w,date:iso});
  }
}

// ---- render ----
function render(){
  const plan=document.getElementById("plan");
  plan.innerHTML="";
  const state=loadState();
  let total=0,done=0,weights=[];

  const weeks=[...new Set(ROWS.map(r=>r.week))];
  weeks.forEach(week=>{
    const weekRows=ROWS.filter(r=>r.week===week);
    const section=document.createElement("div");
    section.innerHTML=`<div class="week-header"><span>📅</span>Week ${week}</div><div class="cards"></div>`;
    const cards=section.querySelector(".cards");

    weekRows.forEach((row,idx)=>{
      const st=state[row.date]||{weight:"",done:{}};
      row.activities.forEach(a=>{if(typeof st.done[a]!=="boolean")st.done[a]=false;});
      total+=row.activities.length;
      done+=row.activities.filter(a=>st.done[a]).length;
      if(st.weight!==""&&!isNaN(parseFloat(st.weight)))weights.push(parseFloat(st.weight));

      const acts=row.activities.map(a=>`
        <label class="activity">
          <input type="checkbox" data-date="${row.date}" data-act="${a}" ${st.done[a]?"checked":""}>
          ${a}
        </label>`).join("");

      const card=document.createElement("div");
      card.className="card";
      card.style.animationDelay=`${idx*0.05}s`;
      card.innerHTML=`
        <div class="card-header">
          <div>${humanDay(row.date)} ${humanDate(row.date)}</div>
          <div class="muted">${row.session}</div>
        </div>
        <div class="details">📋 ${row.details}</div>
        <div class="hr-zone">${row.hr}</div>
        <div class="purpose">${row.purpose}</div>
        <div class="activities">${acts}</div>
        <div class="weight">⚖️ <input type="number" step="0.1" placeholder="kg" data-date="${row.date}" value="${st.weight||""}"></div>
      `;
      cards.appendChild(card);
      state[row.date]=st;
    });
    plan.appendChild(section);
  });
  saveState(state);
  updateStats(total,done,weights);
}

function updateStats(total,done,weights){
  const pct=total?Math.round(done/total*100):0;
  byId("doneCount").textContent=done;
  byId("totalCount").textContent=total;
  byId("progressPct").textContent=pct+"%";
  byId("progressBar").style.width=pct+"%";
  byId("avgWeight").textContent=weights.length?(weights.reduce((a,b)=>a+b,0)/weights.length).toFixed(1):"—";
}

// ---- events ----
function init(){
  byId("year").textContent=new Date().getFullYear();
  render();

  document.addEventListener("change",e=>{
    const s=loadState();
    // activity check
    if(e.target.matches("input[type=checkbox][data-act]")){
      const d=e.target.dataset.date,a=e.target.dataset.act;
      s[d]=s[d]||{weight:"",done:{}};
      s[d].done[a]=e.target.checked;
      saveState(s);refreshStats(s);
    }
    // weight input
    if(e.target.matches("input[type=number][data-date]")){
      const d=e.target.dataset.date;
      s[d]=s[d]||{weight:"",done:{}};
      s[d].weight=e.target.value;
      saveState(s);refreshStats(s);
    }
  });
}

function refreshStats(s){
  let total=0,done=0,weights=[];
  ROWS.forEach(r=>{
    const st=s[r.date]||{done:{}};
    r.activities.forEach(a=>{total++;if(st.done[a])done++;});
    if(st.weight&&!isNaN(parseFloat(st.weight)))weights.push(parseFloat(st.weight));
  });
  updateStats(total,done,weights);
}

document.addEventListener("DOMContentLoaded",init);

// === Data (exact rows from screenshots) ===
const ROWS = [
  // Week 1
  ["Week 1","2025-11-03","Monday","Easy Run + Pilates","5 km easy @ 5:30–5:50 /km","Z1–Z2 (125–145 bpm)","Aerobic recovery & fat-burn"],
  ["Week 1","2025-11-04","Tuesday","Gym (Lower Body)","Squats 3×8, lunges 3×10, calf raises 3×15, core finish","Strength / Mobility","Power output maintenance"],
  ["Week 1","2025-11-05","Wednesday","Pilates + Key Run","Varies weekly — see focus","Z3–Z4 (155–179 bpm)","Threshold or speed development"],
  ["Week 1","2025-11-06","Thursday","Swim","1.5–2 km steady + drills","Aerobic","Active recovery"],
  ["Week 1","2025-11-07","Friday","Gym (Upper + Core)","Bench press, rows, planks, hip work","-","Posture stability"],
  ["Week 1","2025-11-08","Saturday","Parkrun 5 km","Warm up 2 km + strides ×4 → 5 km race effort","Z4 (167–179 bpm)","Benchmark run"],
  ["Week 1","2025-11-09","Sunday","Pilates + Long Run","10–12 km @ 5:20–6:20 /km (hill option)","Z2 (135–150 bpm)","Endurance build"],

  // Week 2
  ["Week 2","2025-11-10","Monday","Easy Run + Pilates","5 km easy @ 5:30–5:50 /km","Z1–Z2 (125–145 bpm)","Aerobic recovery & fat-burn"],
  ["Week 2","2025-11-11","Tuesday","Gym (Lower Body)","Squats 3×8, lunges 3×10, calf raises 3×15, core finish","Strength / Mobility","Power output maintenance"],
  ["Week 2","2025-11-12","Wednesday","Pilates + Key Run","Varies weekly — see focus","Z3–Z4 (155–179 bpm)","Threshold or speed development"],
  ["Week 2","2025-11-13","Thursday","Swim","1.5–2 km steady + drills","Aerobic","Active recovery"],
  ["Week 2","2025-11-14","Friday","Gym (Upper + Core)","Bench press, rows, planks, hip work","-","Posture stability"],
  ["Week 2","2025-11-15","Saturday","Parkrun 5 km","Warm up 2 km + strides ×4 → 5 km race effort","Z4 (167–179 bpm)","Benchmark run"],
  ["Week 2","2025-11-16","Sunday","Pilates + Long Run","10–12 km @ 5:20–6:20 /km (hill option)","Z2 (135–150 bpm)","Endurance build"],

  // Week 3
  ["Week 3","2025-11-17","Monday","Easy Run + Pilates","5 km easy @ 5:30–5:50 /km","Z1–Z2 (125–145 bpm)","Aerobic recovery & fat-burn"],
  ["Week 3","2025-11-18","Tuesday","Gym (Lower Body)","Squats 3×8, lunges 3×15, core finish","Strength / Mobility","Power output maintenance"],
  ["Week 3","2025-11-19","Wednesday","Pilates + Key Run","Varies weekly — see focus","Z3–Z4 (155–179 bpm)","Threshold or speed development"],
  ["Week 3","2025-11-20","Thursday","Swim","1.5–2 km steady + drills","Aerobic","Active recovery"],
  ["Week 3","2025-11-21","Friday","Gym (Upper + Core)","Bench press, rows, planks, hip work","-","Posture stability"],
  ["Week 3","2025-11-22","Saturday","Parkrun 5 km","Warm up 2 km + strides ×4 → 5 km race effort","Z4 (167–179 bpm)","Benchmark run"],
  ["Week 3","2025-11-23","Sunday","Pilates + Long Run","10–12 km @ 5:20–6:20 /km (hill option)","Z2 (135–150 bpm)","Endurance build"],

  // Week 4
  ["Week 4","2025-11-24","Monday","Easy Run + Pilates","5 km easy @ 5:30–5:50 /km","Z1–Z2 (125–145 bpm)","Aerobic recovery & fat-burn"],
  ["Week 4","2025-11-25","Tuesday","Gym (Lower Body)","Squats 3×8, lunges 3×10, calf raises 3×15, core finish","Strength / Mobility","Power output maintenance"],
  ["Week 4","2025-11-26","Wednesday","Pilates + Key Run","Varies weekly — see focus","Z3–Z4 (155–179 bpm)","Threshold or speed development"],
  ["Week 4","2025-11-27","Thursday","Swim","1.5–2 km steady + drills","Aerobic","Active recovery"],
  ["Week 4","2025-11-28","Friday","Gym (Upper + Core)","Bench press, rows, planks, hip work","-","Posture stability"],
  ["Week 4","2025-11-29","Saturday","Parkrun 5 km","Warm up 2 km + strides ×4 → 5 km race effort","Z4 (167–179 bpm)","Benchmark run"],
  ["Week 4","2025-11-30","Sunday","Pilates + Long Run","10–12 km @ 5:20–6:20 /km (hill option)","Z2 (135–150 bpm)","Endurance build"],

  // Week 5
  ["Week 5","2025-12-01","Monday","Easy Run + Pilates","5 km easy @ 5:30–5:50 /km","Z1–Z2 (125–145 bpm)","Aerobic recovery & fat-burn"],
  ["Week 5","2025-12-02","Tuesday","Gym (Lower Body)","Squats 3×8, lunges 3×10, calf raises 3×15, core finish","Strength / Mobility","Power output maintenance"],
  ["Week 5","2025-12-03","Wednesday","Pilates + Key Run","Varies weekly — see focus","Z3–Z4 (155–179 bpm)","Threshold or speed development"],
  ["Week 5","2025-12-04","Thursday","Swim","1.5–2 km steady + drills","Aerobic","Active recovery"],
  ["Week 5","2025-12-05","Friday","Gym (Upper + Core)","Bench press, rows, planks, hip work","-","Posture stability"],
  ["Week 5","2025-12-06","Saturday","Parkrun 5 km","Warm up 2 km + strides ×4 → 5 km race effort","Z4 (167–179 bpm)","Benchmark run"],
  ["Week 5","2025-12-07","Sunday","Pilates + Long Run","10–12 km @ 5:20–6:20 /km (hill option)","Z2 (135–150 bpm)","Endurance build"],
];

// === App ===
const LS_KEY = "run_checkoff_exact_v1";
const byId = (id)=>document.getElementById(id);

function loadState(){ try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch(e){ return {}; } }
function saveState(s){ localStorage.setItem(LS_KEY, JSON.stringify(s)); }

function humanDate(iso){
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined,{weekday:"short",day:"2-digit",month:"short",year:"numeric"});
}
function humanDay(iso){
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined,{weekday:"long"});
}

function render(){
  const tbody = document.querySelector("#planTable tbody");
  tbody.innerHTML = "";
  const state = loadState();

  let total=0, done=0, weights=[];

  ROWS.forEach(([week, iso, , session, details, hr, purpose])=>{
    const st = state[iso] || {done:false, weight:""};
    total++;
    if(st.done) done++;
    if(st.weight !== "" && !isNaN(parseFloat(st.weight))) weights.push(parseFloat(st.weight));

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><span class="badge">${week}</span></td>
      <td>${humanDate(iso)}</td>
      <td>${humanDay(iso)}</td>
      <td contenteditable="true">${session}</td>
      <td contenteditable="true">${details}</td>
      <td contenteditable="true">${hr}</td>
      <td contenteditable="true">${purpose}</td>
      <td style="text-align:center"><input type="checkbox" class="doneBox" data-date="${iso}" ${st.done?"checked":""}></td>
      <td><input type="number" step="0.1" inputmode="decimal" class="weightInput" data-date="${iso}" placeholder="kg" value="${st.weight}"></td>
    `;
    tbody.appendChild(tr);
  });

  byId("totalCount").textContent = total;
  byId("doneCount").textContent = done;
  byId("progressPct").textContent = total ? Math.round(done/total*100) + "%" : "0%";
  byId("avgWeight").textContent = weights.length ? (weights.reduce((a,b)=>a+b,0)/weights.length).toFixed(1) : "—";
}

function init(){
  byId("year").textContent = new Date().getFullYear();
  render();

  // Change handlers (delegate)
  document.addEventListener("change", (e)=>{
    if(e.target.classList.contains("doneBox")){
      const iso = e.target.dataset.date;
      const s = loadState();
      s[iso] = s[iso] || {done:false,weight:""};
      s[iso].done = e.target.checked;
      saveState(s);
      render();
    }
    if(e.target.classList.contains("weightInput")){
      const iso = e.target.dataset.date;
      const s = loadState();
      s[iso] = s[iso] || {done:false,weight:""};
      s[iso].weight = e.target.value;
      saveState(s);
      // just update avg weight quickly
      const weights = Object.values(s).map(v=>parseFloat(v.weight)).filter(v=>!isNaN(v));
      byId("avgWeight").textContent = weights.length ? (weights.reduce((a,b)=>a+b,0)/weights.length).toFixed(1) : "—";
    }
  });

  byId("resetBtn").addEventListener("click", ()=>{
    if(confirm("Clear all checkmarks and weights?")){
      localStorage.removeItem(LS_KEY);
      render();
    }
  });

  byId("exportCsvBtn").addEventListener("click", ()=>{
    const rows = [];
    const headers = ["Week","Date","Day","Session Type","Workout Details","Intensity / HR Zone","Purpose","Done","Weight (kg)"];
    rows.push(headers.join(","));
    // Build from the rendered table so edited cells are captured
    document.querySelectorAll("#planTable tbody tr").forEach(tr=>{
      const tds = tr.querySelectorAll("td");
      const week = tds[0].innerText.trim();
      const date = tds[1].innerText.trim();
      const day  = tds[2].innerText.trim();
      const session = tds[3].innerText.replace(/,/g,";").trim();
      const details = tds[4].innerText.replace(/,/g,";").trim();
      const hr      = tds[5].innerText.replace(/,/g,";").trim();
      const purpose = tds[6].innerText.replace(/,/g,";").trim();
      const done = tr.querySelector(".doneBox").checked ? "Yes" : "No";
      const weight = tr.querySelector(".weightInput").value;
      rows.push([week,date,day,session,details,hr,purpose,done,weight].join(","));
    });
    const blob = new Blob([rows.join("\n")], {type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "training-plan.csv";
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  });
}

document.addEventListener("DOMContentLoaded", init);

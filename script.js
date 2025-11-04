// ===== Helpers =====
const byId = (id)=>document.getElementById(id);
const LS_KEY = "run_checkoff_multi_v1";

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

// ===== Data (exact rows, but activities are split so each can be checked) =====
// Each row: {week, date, session, details, hr, purpose, activities:[...] }
const ROWS = [
  // Week 1
  r(1,"2025-11-03","Easy Run + Pilates","5 km easy @ 5:30–5:50 /km","Z1–Z2 (125–145 bpm)","Aerobic recovery & fat-burn",["Easy Run","Pilates"]),
  r(1,"2025-11-04","Gym (Lower Body)","Squats 3×8, lunges 3×10, calf raises 3×15, core finish","Strength / Mobility","Power output maintenance",["Gym – Lower"]),
  r(1,"2025-11-05","Pilates + Key Run","Varies weekly — see focus","Z3–Z4 (155–179 bpm)","Threshold or speed development",["Pilates","Key Run"]),
  r(1,"2025-11-06","Swim","1.5–2 km steady + drills","Aerobic","Active recovery",["Swim"]),
  r(1,"2025-11-07","Gym (Upper + Core)","Bench press, rows, planks, hip work","-","Posture stability",["Gym – Upper/Core"]),
  r(1,"2025-11-08","Parkrun 5 km","Warm up 2 km + strides ×4 → 5 km race effort","Z4 (167–179 bpm)","Benchmark run",["Parkrun 5 km"]),
  r(1,"2025-11-09","Pilates + Long Run","10–12 km @ 5:20–6:20 /km (hill option)","Z2 (135–150 bpm)","Endurance build",["Pilates","Long Run"]),

  // Week 2
  r(2,"2025-11-10","Easy Run + Pilates","5 km easy @ 5:30–5:50 /km","Z1–Z2 (125–145 bpm)","Aerobic recovery & fat-burn",["Easy Run","Pilates"]),
  r(2,"2025-11-11","Gym (Lower Body)","Squats 3×8, lunges 3×10, calf raises 3×15, core finish","Strength / Mobility","Power output maintenance",["Gym – Lower"]),
  r(2,"2025-11-12","Pilates + Key Run","Varies weekly — see focus","Z3–Z4 (155–179 bpm)","Threshold or speed development",["Pilates","Key Run"]),
  r(2,"2025-11-13","Swim","1.5–2 km steady + drills","Aerobic","Active recovery",["Swim"]),
  r(2,"2025-11-14","Gym (Upper + Core)","Bench press, rows, planks, hip work","-","Posture stability",["Gym – Upper/Core"]),
  r(2,"2025-11-15","Parkrun 5 km","Warm up 2 km + strides ×4 → 5 km race effort","Z4 (167–179 bpm)","Benchmark run",["Parkrun 5 km"]),
  r(2,"2025-11-16","Pilates + Long Run","10–12 km @ 5:20–6:20 /km (hill option)","Z2 (135–150 bpm)","Endurance build",["Pilates","Long Run"]),

  // Week 3
  r(3,"2025-11-17","Easy Run + Pilates","5 km easy @ 5:30–5:50 /km","Z1–Z2 (125–145 bpm)","Aerobic recovery & fat-burn",["Easy Run","Pilates"]),
  r(3,"2025-11-18","Gym (Lower Body)","Squats 3×8, lunges 3×15, core finish","Strength / Mobility","Power output maintenance",["Gym – Lower"]),
  r(3,"2025-11-19","Pilates + Key Run","Varies weekly — see focus","Z3–Z4 (155–179 bpm)","Threshold or speed development",["Pilates","Key Run"]),
  r(3,"2025-11-20","Swim","1.5–2 km steady + drills","Aerobic","Active recovery",["Swim"]),
  r(3,"2025-11-21","Gym (Upper + Core)","Bench press, rows, planks, hip work","-","Posture stability",["Gym – Upper/Core"]),
  r(3,"2025-11-22","Parkrun 5 km","Warm up 2 km + strides ×4 → 5 km race effort","Z4 (167–179 bpm)","Benchmark run",["Parkrun 5 km"]),
  r(3,"2025-11-23","Pilates + Long Run","10–12 km @ 5:20–6:20 /km (hill option)","Z2 (135–150 bpm)","Endurance build",["Pilates","Long Run"]),

  // Week 4
  r(4,"2025-11-24","Easy Run + Pilates","5 km easy @ 5:30–5:50 /km","Z1–Z2 (125–145 bpm)","Aerobic recovery & fat-burn",["Easy Run","Pilates"]),
  r(4,"2025-11-25","Gym (Lower Body)","Squats 3×8, lunges 3×10, calf raises 3×15, core finish","Strength / Mobility","Power output maintenance",["Gym – Lower"]),
  r(4,"2025-11-26","Pilates + Key Run","Varies weekly — see focus","Z3–Z4 (155–179 bpm)","Threshold or speed development",["Pilates","Key Run"]),
  r(4,"2025-11-27","Swim","1.5–2 km steady + drills","Aerobic","Active recovery",["Swim"]),
  r(4,"2025-11-28","Gym (Upper + Core)","Bench press, rows, planks, hip work","-","Posture stability",["Gym – Upper/Core"]),
  r(4,"2025-11-29","Parkrun 5 km","Warm up 2 km + strides ×4 → 5 km race effort","Z4 (167–179 bpm)","Benchmark run",["Parkrun 5 km"]),
  r(4,"2025-11-30","Pilates + Long Run","10–12 km @ 5:20–6:20 /km (hill option)","Z2 (135–150 bpm)","Endurance build",["Pilates","Long Run"]),

  // Week 5
  r(5,"2025-12-01","Easy Run + Pilates","5 km easy @ 5:30–5:50 /km","Z1–Z2 (125–145 bpm)","Aerobic recovery & fat-burn",["Easy Run","Pilates"]),
  r(5,"2025-12-02","Gym (Lower Body)","Squats 3×8, lunges 3×10, calf raises 3×15, core finish","Strength / Mobility","Power output maintenance",["Gym – Lower"]),
  r(5,"2025-12-03","Pilates + Key Run","Varies weekly — see focus","Z3–Z4 (155–179 bpm)","Threshold or speed development",["Pilates","Key Run"]),
  r(5,"2025-12-04","Swim","1.5–2 km steady + drills","Aerobic","Active recovery",["Swim"]),
  r(5,"2025-12-05","Gym (Upper + Core)","Bench press, rows, planks, hip work","-","Posture stability",["Gym – Upper/Core"]),
  r(5,"2025-12-06","Parkrun 5 km","Warm up 2 km + strides ×4 → 5 km race effort","Z4 (167–179 bpm)","Benchmark run",["Parkrun 5 km"]),
  r(5,"2025-12-07","Pilates + Long Run","10–12 km @ 5:20–6:20 /km (hill option)","Z2 (135–150 bpm)","Endurance build",["Pilates","Long Run"]),
];

function r(week,date,session,details,hr,purpose,activities){
  return {week,date,session,details,hr,purpose,activities};
}

// ===== Rendering =====
function render(){
  const tbody = document.querySelector("#planTable tbody");
  tbody.innerHTML = "";
  const state = loadState();

  let total = 0, done = 0, weights = [];

  ROWS.forEach(row=>{
    const iso = row.date;
    const day = humanDay(iso);

    // per-activity state object (activity name -> bool)
    const st = state[iso] || { weight:"", done:{} };
    row.activities.forEach(a=>{
      if (typeof st.done[a] !== "boolean") st.done[a] = false;
    });

    // counts
    total += row.activities.length;
    done  += row.activities.filter(a=>st.done[a]).length;
    if(st.weight !== "" && !isNaN(parseFloat(st.weight))) weights.push(parseFloat(st.weight));

    // build activity pills with checkboxes
    const pills = row.activities.map((a,i)=>`
      <label class="pill">
        <span class="tick">
          <input class="checkbox activityBox"
                 type="checkbox"
                 data-date="${iso}"
                 data-activity="${a}"
                 ${st.done[a] ? "checked":""}>
          ${a}
        </span>
      </label>
    `).join("");

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><span class="badge-week"><span class="badge-dot"></span> Week ${row.week}</span></td>
      <td>${humanDate(iso)}</td>
      <td>${day}</td>
      <td><div class="pills">${row.session.split(" + ").map(s=>`<span class="pill">${s}</span>`).join("")}</div></td>
      <td contenteditable="true">${row.details}</td>
      <td contenteditable="true">${row.hr}</td>
      <td contenteditable="true">${row.purpose}</td>
      <td>${pills}</td>
      <td><input class="weight-input" type="number" step="0.1" inputmode="decimal"
                 placeholder="kg" data-date="${iso}" value="${st.weight || ""}"></td>
    `;
    tbody.appendChild(tr);

    // persist normalized shape
    state[iso] = st;
  });

  saveState(state);
  updateStats(total, done, weights);
}

function updateStats(total, done, weights){
  const pct = total ? Math.round(done/total*100) : 0;
  byId("totalCount").textContent = total;
  byId("doneCount").textContent  = done;
  byId("progressPct").textContent = pct + "%";
  byId("progressBar").style.width = pct + "%";
  byId("avgWeight").textContent = weights.length
    ? (weights.reduce((a,b)=>a+b,0)/weights.length).toFixed(1)
    : "—";
}

// ===== Events =====
function init(){
  byId("year").textContent = new Date().getFullYear();
  render();

  document.addEventListener("change",(e)=>{
    // tick/untick an activity
    if(e.target.classList.contains("activityBox")){
      const iso = e.target.dataset.date;
      const act = e.target.dataset.activity;
      const st = loadState();
      st[iso] = st[iso] || {weight:"", done:{}};
      st[iso].done[act] = e.target.checked;
      saveState(st);
      // quick update without full re-render
      const {total,done,weights} = aggregate(st);
      updateStats(total,done,weights);
    }
    // weight input
    if(e.target.classList.contains("weight-input")){
      const iso = e.target.dataset.date;
      const st = loadState();
      st[iso] = st[iso] || {weight:"", done:{}};
      st[iso].weight = e.target.value;
      saveState(st);
      const {total,done,weights} = aggregate(st);
      updateStats(total,done,weights);
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
    const headers = ["Week","Date","Day","Session","Workout Details","Intensity / HR","Purpose","Activities (status)","Weight (kg)"];
    rows.push(headers.join(","));
    // Build from live DOM to capture any inline edits
    document.querySelectorAll("#planTable tbody tr").forEach(tr=>{
      const tds = tr.querySelectorAll("td");
      const week = tds[0].innerText.trim();          // Week pill text
      const dateHuman = tds[1].innerText.trim();
      const day = tds[2].innerText.trim();
      const session = tds[3].innerText.replace(/,/g,";").trim();
      const details = tds[4].innerText.replace(/,/g,";").trim();
      const hr = tds[5].innerText.replace(/,/g,";").trim();
      const purpose = tds[6].innerText.replace(/,/g,";").trim();
      const acts = Array.from(tr.querySelectorAll(".activityBox"))
        .map(cb=>`${cb.dataset.activity}: ${cb.checked ? "Yes":"No"}`).join(" | ").replace(/,/g,";");
      const weight = tr.querySelector(".weight-input").value;
      rows.push([week,dateHuman,day,session,details,hr,purpose,acts,weight].join(","));
    });
    const blob = new Blob([rows.join("\n")], {type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "training-plan.csv";
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  });
}

function aggregate(state){
  let total=0, done=0, weights=[];
  ROWS.forEach(row=>{
    const st = state[row.date] || {weight:"",done:{}};
    row.activities.forEach(a=>{
      total += 1;
      if (st.done[a]) done += 1;
    });
    if(st.weight !== "" && !isNaN(parseFloat(st.weight))) weights.push(parseFloat(st.weight));
  });
  return {total,done,weights};
}

document.addEventListener("DOMContentLoaded", init);

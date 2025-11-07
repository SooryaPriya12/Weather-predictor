// Frontend-only Weather Predictor
// Model: simple linear regression with precomputed coefficients.
// Features: ["pressure_hpa", "humidity_pct", "wind_speed_ms", "precipitation_mm", "cloud_pct", "hour", "dayofyear"]

const model = {
  "pressure_hpa": 0.33397868253229385,
  "humidity_pct": -0.00511360063325933,
  "wind_speed_ms": -0.018228242302317926,
  "precipitation_mm": 0.37947740809838704,
  "cloud_pct": 0.0008783270102705396,
  "hour": -0.2541513138677904,
  "dayofyear": 0.08112679453969047,
  "intercept": -317.45347055474576
};

function predict(features){
  let y = model.intercept || 0;
  for (const k of Object.keys(model)){ if(k==='intercept') continue; y += (model[k] || 0) * (features[k] || 0); }
  return y;
}

function readInputs(){
  return {
    pressure_hpa: parseFloat(document.getElementById('pressure').value)||0,
    humidity_pct: parseFloat(document.getElementById('humidity').value)||0,
    wind_speed_ms: parseFloat(document.getElementById('wind').value)||0,
    precipitation_mm: parseFloat(document.getElementById('precip').value)||0,
    cloud_pct: parseFloat(document.getElementById('cloud').value)||0,
    hour: parseFloat(document.getElementById('hour').value)||0,
    dayofyear: parseFloat(document.getElementById('doy').value)||0
  };
}

document.getElementById('predict-btn').addEventListener('click', ()=>{
  const f = readInputs();
  const p = predict(f);
  document.getElementById('output').textContent = `Prediction: ${p.toFixed(2)} °C`;
});

document.getElementById('sample-btn').addEventListener('click', ()=>{
  document.getElementById('pressure').value = 1010;
  document.getElementById('humidity').value = 60;
  document.getElementById('wind').value = 3.5;
  document.getElementById('precip').value = 0.0;
  document.getElementById('cloud').value = 30;
  document.getElementById('hour').value = 14;
  document.getElementById('doy').value = 200;
});

// show coefficients in page
document.getElementById('coeffs').textContent = JSON.stringify(model, null, 2);

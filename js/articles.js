// ============================================================
//  ARTICLES DATABASE
//  juliogustavo.com
//
//  HOW TO ADD A NEW ARTICLE:
//  1. Copy one of the objects below
//  2. Give it a unique "id" (slug, no spaces)
//  3. Set "date" in YYYY-MM-DD format
//  4. Fill in title, excerpt, tags
//  5. Write the full HTML body in the "body" field
//  6. Save the file — the site updates automatically
// ============================================================

const ARTICLES = [
  {
    id: "esp32-ble-sensor-hub",
    title: "Building a BLE Sensor Hub with ESP32",
    date: "2025-03-15",
    tags: ["ESP32", "BLE", "IoT", "Embedded C"],
    excerpt: "A walkthrough of building a multi-sensor Bluetooth Low Energy hub using the ESP32, reading temperature, humidity, and accelerometer data over BLE to a mobile app.",
    github: "https://github.com/juliogustavo/esp32-ble-hub",
    body: `
      <h2>Overview</h2>
      <p>This project explores building a BLE (Bluetooth Low Energy) sensor aggregator using the ESP32 microcontroller. The hub reads data from multiple I2C sensors and exposes them as BLE GATT characteristics, which can be read by any BLE-capable device.</p>

      <h2>Hardware Used</h2>
      <ul>
        <li>ESP32-WROOM-32 dev board</li>
        <li>BME280 — temperature, humidity, pressure</li>
        <li>MPU-6050 — 6-axis IMU (accelerometer + gyroscope)</li>
        <li>LiPo battery + TP4056 charger module</li>
      </ul>

      <h2>Firmware Architecture</h2>
      <p>The firmware is written in C using the ESP-IDF framework. The main loop reads sensor data every 500ms and updates the BLE characteristic values. BLE notifications are pushed to connected clients on change.</p>

      <pre><code>// Simplified BLE notify example
esp_ble_gatts_send_indicate(
    gl_profile.gatts_if,
    gl_profile.conn_id,
    temp_handle,
    sizeof(temp_val),
    (uint8_t*)&temp_val,
    false
);</code></pre>

      <h2>Results & Next Steps</h2>
      <p>The hub maintains a stable BLE connection at up to 10 meters and achieves ~14 days of battery life on a 1000mAh LiPo with periodic sleep modes enabled. Next, I plan to add OTA firmware updates and a simple React Native companion app.</p>

      <h2>Links</h2>
      <p>Full code and schematics are on <a href="https://github.com/juliogustavo/esp32-ble-hub" target="_blank">GitHub</a>.</p>
    `
  },
  {
    id: "pcb-design-kicad-tips",
    title: "10 KiCad PCB Design Habits That Saved My Boards",
    date: "2025-01-28",
    tags: ["PCB", "KiCad", "Hardware Design"],
    excerpt: "Lessons learned after taping out several boards — from DRC rules and stackup planning to silkscreen hygiene and panelization tricks.",
    github: null,
    body: `
      <h2>Why This Post?</h2>
      <p>After a few embarrassing board respins, I compiled the design habits that now save me time and money. These apply mostly to 2-layer and 4-layer boards in KiCad 7+.</p>

      <h2>1. Set Your Design Rules First</h2>
      <p>Before placing a single component, configure Board Setup → Design Rules. Match your manufacturer's minimum trace width, clearance, and drill sizes. This avoids painful DRC surprises at the end.</p>

      <h2>2. Use a Dedicated Fab Layer Checklist</h2>
      <p>Add a <code>User.Comments</code> layer note listing: board thickness, copper weight, surface finish, and silkscreen color. Your future self will thank you when ordering six months later.</p>

      <h2>3. Ground Planes Are Not Optional</h2>
      <p>Pour a copper fill on both sides tied to GND. This improves EMI, reduces ground bounce, and gives you a thermal path. Use <code>B</code> to fill and always inspect for isolated islands.</p>

      <h2>4. Stitch Your Planes</h2>
      <p>Add via stitching around the board edge and between split planes. A spacing of 3–5mm works well for most low-frequency designs.</p>

      <h2>5. Label Every Connector</h2>
      <p>Pin 1, voltage, and signal labels on the silkscreen prevent assembly errors. If your fab's minimum text size is 0.8mm, enforce it in KiCad's text defaults.</p>
    `
  }
];

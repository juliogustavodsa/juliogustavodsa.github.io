// ============================================================
//  SITE DATA
//  juliogustavo.com
//
//  Edit this file to update your profile, CV, publications,
//  and links. No HTML needed — just fill in the fields.
// ============================================================

const SITE = {

  // ── YOUR PROFILE ─────────────────────────────────────────
  name: "Julio Gustavo",
  title: "Electronics Engineer",
  tagline: "Embedded systems · PCB design · IoT · Signal processing",
  location: "Goa, India",
  email: "julio@juliogustavo.com",     // replace with yours
  about: `
    I'm an electronics engineer with a focus on embedded systems, PCB design,
    and IoT applications. I enjoy building hardware that solves real problems —
    from sensor nodes and motor controllers to custom RF circuits.
    <br><br>
    I write about my projects here, share code on GitHub, and occasionally
    publish research on signal processing and wireless systems.
  `,

  // ── SOCIAL LINKS ──────────────────────────────────────────
  links: {
    github:   "https://github.com/juliogustavo",       // your GitHub
    linkedin: "https://linkedin.com/in/juliogustavo",  // your LinkedIn
    cv:       "assets/julio-gustavo-cv.pdf",            // drop your PDF here
    email:    "mailto:julio@juliogustavo.com",
    // scholar: "https://scholar.google.com/...",       // uncomment if needed
    // orcid:  "https://orcid.org/...",
  },

  // ── SKILLS / EXPERTISE TAGS ───────────────────────────────
  skills: [
    "Embedded C/C++", "ESP32 / STM32", "KiCad PCB Design",
    "RTOS (FreeRTOS)", "BLE / Zigbee / LoRa", "MATLAB / Simulink",
    "Python", "Signal Processing", "RF Design", "I2C / SPI / UART",
    "Git", "Linux"
  ],

  // ── WORK EXPERIENCE ───────────────────────────────────────
  // HOW TO ADD: copy an entry object, fill in fields, add to array
  experience: [
    {
      role: "Electronics Engineer",
      org:  "Your Company",
      orgUrl: "https://yourcompany.com",
      date: "2023 – Present",
      desc: "Designed and brought up custom STM32-based PCBs for industrial IoT sensors. Led firmware development for a BLE mesh network deployed across a 500-node factory floor."
    },
    {
      role: "Junior Hardware Engineer",
      org:  "Previous Company",
      orgUrl: null,
      date: "2021 – 2023",
      desc: "Schematic capture and PCB layout for power electronics modules. Wrote Python test scripts for automated board bring-up and production testing."
    }
  ],

  // ── EDUCATION ─────────────────────────────────────────────
  education: [
    {
      degree: "B.Tech in Electronics Engineering",
      school: "Your University",
      date:   "2017 – 2021",
      desc:   "Thesis: Adaptive noise cancellation in MEMS microphone arrays."
    }
  ],

  // ── PUBLICATIONS ──────────────────────────────────────────
  // HOW TO ADD: copy a publication object and fill in fields
  publications: [
    {
      title: "Adaptive Noise Cancellation in MEMS Microphone Arrays Using LMS Filtering",
      venue: "IEEE Sensors Journal, 2022",
      authors: "J. Gustavo, Co-Author A, Co-Author B",
      abstract: "We propose an adaptive LMS filter architecture implemented on an FPGA for real-time noise cancellation in close-talk MEMS microphone arrays, achieving 18 dB SNR improvement over fixed-coefficient designs.",
      doi: "https://doi.org/10.1109/EXAMPLE",   // replace
      pdf: null,
      github: null
    },
    {
      title: "Low-Power BLE Mesh Topology for Industrial Sensor Networks",
      venue: "International Conference on Embedded Systems, 2023",
      authors: "J. Gustavo, Co-Author C",
      abstract: "A study of BLE mesh topology configurations and their energy consumption trade-offs in dense industrial deployments, with measurements from a 200-node pilot installation.",
      doi: null,
      pdf:  "assets/papers/ble-mesh-2023.pdf",  // drop PDF in assets/papers/
      github: "https://github.com/juliogustavo/ble-mesh-study"
    }
  ]
};

#Link-
word-divider.netlify.app

# Word Divider Hardware Simulation

This project implements an **8-bit binary division algorithm** in Verilog.  
It uses registers and an FSM (Finite State Machine) to perform division at the hardware level.

## ⚙️ Features
- Binary division using shift-subtract method  
- Simulated on EPWave (iverilog + GTKWave)
- Visual hardware animation via interactive simulator

## 🧩 Example
**Input:**  
Dividend = 27 (00011011)  
Divisor = 5 (00000101)

**Output:**  
Quotient = 5 (00000101)  
Remainder = 2 (00000010)

## 📸 Simulation
<img width="1643" height="870" alt="image" src="https://github.com/user-attachments/assets/46bea163-1819-4db5-b40a-de702b1aceb7" />

## 🧠 Tools Used
- **HTML5**, **CSS3**, **JavaScript (Vite Framework)**  
- **TailwindCSS** for styling  
- **Modular FSM and Register components**
- Icarus Verilog
- EPWave / GTKWave
# Word Divider Hardware Simulation

Interactive visualization showing binary division at the hardware level (registers, ALU, control signals). This project is built with Vite, React and TypeScript.

## Quick start (Windows PowerShell)

1) Install dependencies

```powershell
npm install
```

2) Start development server

```powershell
npm run dev
```

3) Build for production

```powershell
npm run build
```

4) Preview production build

```powershell
npm run preview
```

## Notes
- Node.js 18+ is recommended.
- The project uses path alias `@` (configured in `tsconfig.json` and `vite.config.ts`).
- If you previously relied on Lovable tooling, those integrations have been removed from this repo.
 

## License
This repository contains code for educational/demo purposes. Update the license as appropriate for your project.

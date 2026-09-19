# AgentSam CAD Creator

<div align="center">
  <img src="https://imagedelivery.net/g7wf09fCONpnidkRnR_5vw/2a047804-2626-4529-4324-f5a800f48500/avatar" width="96" height="96" alt="AgentSam Avatar" style="border-radius: 20px; box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);" />
  <h3>Production Physical-Design Workbench & Robotics Simulation Suite</h3>
  <p><b>MuJoCo 500Hz Physics · OpenSCAD Parametric CSG · Blender 4.2 Cycles PBR · FreeCAD OpenCASCADE · Meshy AI · Gemini Embodied Reasoning</b></p>
</div>

---

## 1. Executive Summary & Architecture

**AgentSam CAD Creator** is an integrated CAD engineering workbench and embodied robotics studio. It bridges deterministic parametric solid modeling, kinematic assembly verification, photorealistic raytracing, and high-frequency real-time physics simulation into a cohesive glassmorphic desktop and mobile application shell.

### Core Capabilities
* **MuJoCo WebAssembly Physics (500 Hz)**: Real-time rigid-body dynamics, contact manifold resolution, impulse calculation, and soft-finger friction physics.
* **7-DOF Franka Panda Analytical Kinematics**: Closed-form analytical Inverse Kinematics (`FrankaAnalyticalIK.ts`) for sub-millisecond cartesian pose tracking.
* **Embodied Reasoning 2.0 (Gemini Multimodal)**: Zero-shot visual object localization, 2D bounding boxes, centroid extraction, and autonomous grasp trajectory generation.
* **Real-Time Telemetry & Diagnostic HUD**: Live frame rate (FPS), collision pair counters, contact impulse monitoring, and interactive SVG trend sparklines.
* **Remastered Glassmorphic Shell & Mobile Dock**: Clean top navigation, collapsible workspace sidenav drawer, and thumb-friendly mobile dock with 44px+ touch targets.

---

## 2. Interactive Application Sitemap & Workspaces

| Workspace Route | Engine / Kernel | Primary Engineering Functionality | Data Inputs / Outputs |
| :--- | :--- | :--- | :--- |
| **Robotics Studio** (`robotics`) | MuJoCo WASM (500Hz) | Real-time robot manipulation, 7-DOF Franka Panda IK, pick-and-place, Gemini Embodied Reasoning | MJCF XML, URDF, Collision Mesh, Telemetry Stream |
| **OpenSCAD CAD** (`parametric`) | OpenSCAD CSG Engine | Constructive Solid Geometry code editor, parametric variables, deterministic geometric compilation | `.scad` code $\rightarrow$ STL, DXF, 3MF, CSG Trees |
| **Blender Studio** (`render`) | Blender 4.2 Cycles PBR | High-fidelity material shader studio, three-point HDRI lighting, turntable camera baking | `.blend`, GLTF / GLB, Roughness/Metallic PBR Maps |
| **3D Assemblies** (`model`) | Three.js / WebGL B-Rep | Spatial component hierarchies, kinematic constraints, exploded parts view, dimensional inspection | STEP, IGES, OBJ, Three.js Object3D Hierarchies |
| **2D Floorplan** (`plan`) | 2D Vector CAD / BIM | Workcell layouts, safety boundaries, robot reach radii envelopes, conveyor alignment | SVG, DXF, Workcell Geometry Schematics |
| **Meshy AI 3D** (`generative`) | Meshy Generative AI | AI-assisted text-to-3D and image-to-3D mesh synthesis for obstacles, fixtures, and target objects | Text Prompts / PNG $\rightarrow$ GLB, USDZ, Textured Meshes |
| **AgentSam Copilot** (Global) | Gemini 2.0 Flash / Pro | Multimodal engineering design copilot for CAD script generation, kinematics guidance, and physics tuning | Chat Prompts, Viewport Snapshots, CAD Scripts |
| **Diagnostic HUD** (Global) | Canonical Telemetry Hub | Real-time simulation statistics, frame rate, collision counters, 7-DOF velocity bars, and trend sparklines | High-Frequency WebSocket / RAF Telemetry Stream |

---

## 3. Complete Repository File Tree

```
AgentSam-CAD-Creator/
├── .gitignore                                 # Git version control exclusions
├── App.tsx                                    # Original monolithic prototype entry point
├── CapsuleGeometry.ts                         # Three.js procedural capsule geometry generator
├── Code.md                                    # Architectural specifications and prompt notes
├── DragStateManager.ts                        # 3D raycasting and interactive gizmo drag manager
├── FrankaAnalyticalIK.ts                      # Sub-millisecond closed-form 7-DOF Franka Panda IK solver
├── IkSystem.ts                                # Kinematic chain, joint limit bounds, and IK target controller
├── MatMath.ts                                 # Quaternion, SE(3) matrix transformation, and math utilities
├── MujocoSim.ts                               # MuJoCo WebAssembly physics bridge, model binding, and step loop
├── Reflector.ts                               # Real-time planar reflective ground mirror for Three.js
├── RenderSystem.ts                            # WebGL Three.js render pipeline, shadow maps, and camera controls
├── RobotLoader.ts                             # MJCF XML and URDF robot model parser and mesh loader
├── SelectionManager.ts                        # Viewport object selection, hover highlights, and outline effects
├── SequenceAnimator.ts                        # Trajectory waypoint interpolation and timeline playback animator
│
├── app/                                       # Application Shell & Workspace Orchestration
│   ├── CadCreatorApp.tsx                      # Root application component orchestrating all 6 CAD workspaces
│   ├── CadCreatorShell.tsx                    # Remastered glassmorphic top header with responsive workspace pills
│   └── workspaceRegistry.ts                   # Central workspace catalog, metadata, badges, and icons
│
├── components/                                # Reusable UI Components & Modals
│   ├── AgentSamDrawer.tsx                     # Floating AI Copilot assistant with prompt suggestions and chat
│   ├── CadCreatorSidenav.tsx                  # Collapsible glassmorphic vertical workspace & CAD pipeline sidenav
│   ├── MobileNavigationDock.tsx               # Mobile-prioritized bottom dock with touch-optimized workspace switching
│   ├── RobotSelector.tsx                      # Robot model and end-effector gripper selection dropdown
│   ├── Toolbar.tsx                            # Top viewport camera, transform gizmo, and playback control bar
│   └── UnifiedSidebar.tsx                     # Gemini Embodied Reasoning prompt input and detection results panel
│
├── lib/                                       # Core Engineering & Domain Libraries
│   ├── cad/                                   # External CAD Tool Bridge Definitions
│   │   ├── providers.ts                       # OpenSCAD, Blender Cycles, and FreeCAD bridge connectors
│   │   └── types.ts                           # Multi-CAD interchange types and format definitions
│   └── robotics/                              # Robotics Abstraction Layer
│       ├── perception/                        # Vision & Multimodal AI Perception
│       │   ├── gemini-provider.ts             # Gemini 2.0 Embodied Reasoning provider with structured prompting
│       │   └── provider.ts                    # RoboticsPerceptionProvider interface definition
│       ├── simulation/                        # Physics Engine Simulation Providers
│       │   ├── mujoco-provider.ts             # Concrete MuJoCo WASM simulation provider implementation
│       │   └── provider.ts                    # Canonical SimulationProvider lifecycle and control interface
│       └── types.ts                           # Robotics domain types re-export
│
├── shared/                                    # Cross-cutting Domain Contracts & Shared Types
│   └── cad/
│       └── src/
│           └── robotics/
│               └── types.ts                   # Canonical types: RobotInstance, Pose, DetectionResult, SimulationTelemetry
│
├── workspaces/                                # 6 Modular CAD & Engineering Workspaces
│   ├── generative/
│   │   └── GenerativeAssetWorkspace.tsx       # Meshy AI text-to-3D asset synthesizer with GLB preview
│   ├── model/
│   │   └── ModelWorkspace.tsx                 # 3D spatial assembly viewer with exploded views and hierarchy tree
│   ├── parametric/
│   │   └── ParametricWorkspace.tsx            # OpenSCAD CSG code editor with live syntax view and STL export
│   ├── plan/
│   │   └── PlanWorkspace.tsx                  # 2D workcell floorplan designer with reach envelope circles
│   ├── render/
│   │   └── RenderWorkspace.tsx                # Blender 4.2 Cycles PBR studio with HDRI lighting and material controls
│   └── robotics/                              # MuJoCo Physics & Kinematics Studio
│       ├── DiagnosticOverlay.tsx              # Real-time 500Hz HUD overlay with frame rates and collision counters
│       ├── EmbodiedReasoningPanel.tsx         # Multimodal reasoning inspector and log viewer
│       ├── RobotSelector.tsx                  # Workspace-specific robot model picker
│       ├── RoboticsToolbar.tsx                # Simulation controls: Run/Pause, Reset, Speed, Gizmos, Camera
│       ├── RoboticsWorkspace.tsx              # Primary robotics workspace coordinating 3D viewport, IK, and HUD
│       ├── SparklineChart.tsx                 # Hardware-accelerated SVG sparkline chart component with hover scrubbing
│       └── useSimulationStats.ts              # High-frequency telemetry subscription hook with circular history buffers
│
├── rendering/                                 # Low-Level Three.js Mesh Construction
│   └── GeomBuilder.ts                         # MuJoCo geom type to Three.js BufferGeometry converters
│
├── utils/                                     # Utility Helpers
│   └── StringUtils.ts                         # String formatting, number parsing, and label sanitizers
│
├── index.css                                  # Global Tailwind CSS imports, custom scrollbars, and glass styles
├── index.html                                 # HTML entry point with AgentSam avatar branding and font imports
├── index.tsx                                  # React DOM 19 application mount point
├── metadata.json                              # Application metadata, permissions, and platform capabilities
├── package.json                               # NPM package manifest with dependencies and build scripts
├── tsconfig.json                              # TypeScript 5.8 configuration with strict typechecking
└── vite.config.ts                             # Vite 6 build configuration with React plugin
```

---

## 4. Telemetry Stream & Real-Time Diagnostic HUD

### Canonical Data Contract (`shared/cad/src/robotics/types.ts`)
The robotics architecture relies on strict canonical interfaces to ensure consistency across the physics loop, UI overlays, and background services:
* **`SimulationTelemetry`**: Full state snapshot capturing timestamp, simulation time, render FPS, physics step rate (Hz), real-time factor (RTF), gripper clamping force (N), joint velocities/positions, collision pair count, robot contacts, environment contacts, and TCP end-effector spatial pose.
* **`TelemetryHistoryPoint`**: High-frequency sample point maintained in circular buffers for time-series trend analysis.
* **`SimulationTrendMetrics`**: Computed rolling aggregates including `avgFps`, `minFps`, `maxFps`, `peakForce`, `peakVelocity`, and `totalCollisions`.

### The `useSimulationStats` Hook
Subscribes to the active `SimulationProvider` via `requestAnimationFrame` with throttled React state dispatching (~30–40 Hz). This guarantees responsive HUD updates without inducing React reconciliation bottlenecking:
```typescript
const stats = useSimulationStats(simProviderRef);
// stats.fps, stats.collisionCount, stats.fpsHistory, stats.forceHistory, stats.metrics
```

### Sparkline Chart Visualization (`SparklineChart.tsx`)
* **Dynamic Cubic Bezier Curves**: Renders SVG time-series paths with linear gradient shading under the curve.
* **Color-Coded Themes**:
  * `emerald`: Frame rate & physics loop health (with 60 FPS reference guide).
  * `amber`: Active collision pairs and contact impulses.
  * `indigo`: Franka Panda gripper clamping force (N).
  * `sky`: 7-DOF joint velocity dynamics (rad/s).
* **Interactive Hover Scrub**: Dragging or hovering over the chart reveals a vertical cursor line and a floating glass tooltip displaying the exact historical value and unit.

---

## 5. Multi-CAD Bridge Architecture

AgentSam CAD Creator integrates 4 external CAD paradigms directly with MuJoCo robotics:
1. **OpenSCAD (CSG)**: Generates deterministic end-effector finger geometries and mounting brackets with parametric tolerances.
2. **Blender 4.2 Cycles (PBR)**: Bakes realistic surface materials, roughness/metalness textures, and lighting environments for synthetic data generation.
3. **FreeCAD / OpenCASCADE (B-Rep)**: Validates boundary-representation solid topology and supports STEP/IGES CAD interchange.
4. **Meshy Generative 3D (GenAI)**: Synthesizes novel 3D mesh obstacles and graspable objects from text or image prompts.

---

## 6. Development & Build

### Running Locally
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Compile production bundle
npm run build
```

---

<div align="center">
  <p><sub>Built with React 19, Vite, Three.js, MuJoCo WebAssembly, and Google Gemini.</sub></p>
</div>

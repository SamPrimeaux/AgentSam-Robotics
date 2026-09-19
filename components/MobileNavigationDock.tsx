/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Activity,
  Box,
  Code2,
  Cpu,
  Layers,
  LayoutGrid,
  Menu,
  Sparkles,
  SunMedium
} from 'lucide-react';
import React from 'react';
import { WorkspaceId } from '../app/workspaceRegistry';

interface MobileNavigationDockProps {
  activeWorkspace: WorkspaceId;
  onSelectWorkspace: (id: WorkspaceId) => void;
  onOpenSidenav: () => void;
  onToggleDiagnostics: () => void;
  showDiagnostics: boolean;
  isDarkMode: boolean;
}

export function MobileNavigationDock({
  activeWorkspace,
  onSelectWorkspace,
  onOpenSidenav,
  onToggleDiagnostics,
  showDiagnostics,
  isDarkMode
}: MobileNavigationDockProps) {
  const dockBg = isDarkMode
    ? 'bg-slate-950/90 border-white/10 text-slate-200 backdrop-blur-2xl'
    : 'bg-white/95 border-slate-200 text-slate-800 backdrop-blur-2xl';

  return (
    <nav
      id="mobile-navigation-dock"
      aria-label="Mobile workspace navigation"
      className={`fixed bottom-0 left-0 right-0 z-30 h-16 border-t px-2 flex items-center justify-around md:hidden select-none safe-area-pb ${dockBg}`}
    >
      {/* Robotics */}
      <button
        onClick={() => onSelectWorkspace('robotics')}
        className={`flex flex-col items-center justify-center min-w-[56px] h-12 rounded-xl transition-all ${
          activeWorkspace === 'robotics'
            ? isDarkMode
              ? 'text-indigo-400 font-bold'
              : 'text-indigo-600 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <div className={`p-1 rounded-lg ${activeWorkspace === 'robotics' ? 'bg-indigo-500/20' : ''}`}>
          <Cpu className="w-5 h-5" />
        </div>
        <span className="text-[10px] tracking-tight mt-0.5">Physics</span>
      </button>

      {/* OpenSCAD */}
      <button
        onClick={() => onSelectWorkspace('parametric')}
        className={`flex flex-col items-center justify-center min-w-[56px] h-12 rounded-xl transition-all ${
          activeWorkspace === 'parametric'
            ? isDarkMode
              ? 'text-emerald-400 font-bold'
              : 'text-emerald-600 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <div className={`p-1 rounded-lg ${activeWorkspace === 'parametric' ? 'bg-emerald-500/20' : ''}`}>
          <Code2 className="w-5 h-5" />
        </div>
        <span className="text-[10px] tracking-tight mt-0.5">OpenSCAD</span>
      </button>

      {/* Blender PBR */}
      <button
        onClick={() => onSelectWorkspace('render')}
        className={`flex flex-col items-center justify-center min-w-[56px] h-12 rounded-xl transition-all ${
          activeWorkspace === 'render'
            ? isDarkMode
              ? 'text-amber-400 font-bold'
              : 'text-amber-600 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <div className={`p-1 rounded-lg ${activeWorkspace === 'render' ? 'bg-amber-500/20' : ''}`}>
          <SunMedium className="w-5 h-5" />
        </div>
        <span className="text-[10px] tracking-tight mt-0.5">Blender</span>
      </button>

      {/* 3D Assembly Studio */}
      <button
        onClick={() => onSelectWorkspace('model')}
        className={`flex flex-col items-center justify-center min-w-[56px] h-12 rounded-xl transition-all ${
          activeWorkspace === 'model'
            ? isDarkMode
              ? 'text-violet-400 font-bold'
              : 'text-violet-600 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <div className={`p-1 rounded-lg ${activeWorkspace === 'model' ? 'bg-violet-500/20' : ''}`}>
          <Box className="w-5 h-5" />
        </div>
        <span className="text-[10px] tracking-tight mt-0.5">3D Model</span>
      </button>

      {/* Quick HUD Diagnostics toggle */}
      <button
        onClick={onToggleDiagnostics}
        className={`flex flex-col items-center justify-center min-w-[52px] h-12 rounded-xl transition-all ${
          showDiagnostics
            ? 'text-amber-400 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
        title="Simulation Diagnostics HUD"
      >
        <div className={`p-1 rounded-lg ${showDiagnostics ? 'bg-amber-500/20' : ''}`}>
          <Activity className="w-5 h-5" />
        </div>
        <span className="text-[10px] tracking-tight mt-0.5">HUD</span>
      </button>

      {/* Full Workspaces & Pipelines Sidenav Menu */}
      <button
        onClick={onOpenSidenav}
        className="flex flex-col items-center justify-center min-w-[52px] h-12 rounded-xl text-slate-400 hover:text-slate-200 transition-all"
        title="All Workspaces & CAD Tools"
      >
        <div className="p-1 rounded-lg hover:bg-white/10">
          <Menu className="w-5 h-5" />
        </div>
        <span className="text-[10px] tracking-tight mt-0.5">Workspaces</span>
      </button>
    </nav>
  );
}

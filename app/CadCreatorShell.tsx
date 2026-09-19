/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Activity,
  Box,
  ChevronRight,
  Code2,
  Cpu,
  Layers,
  Menu,
  Moon,
  PanelLeft,
  Sparkles,
  Sun,
  SunMedium,
  Wand2,
  Wrench
} from 'lucide-react';
import React from 'react';
import { WORKSPACE_REGISTRY, WorkspaceId } from './workspaceRegistry';

interface CadCreatorShellProps {
  activeWorkspace: WorkspaceId;
  onSelectWorkspace: (id: WorkspaceId) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  showDiagnostics: boolean;
  onToggleDiagnostics: () => void;
  onOpenCopilot: () => void;
  onToggleSidenav: () => void;
  isSidenavOpen?: boolean;
}

export function CadCreatorShell({
  activeWorkspace,
  onSelectWorkspace,
  isDarkMode,
  onToggleDarkMode,
  showDiagnostics,
  onToggleDiagnostics,
  onOpenCopilot,
  onToggleSidenav,
  isSidenavOpen = false
}: CadCreatorShellProps) {
  const headerBg = isDarkMode
    ? 'bg-slate-950/80 border-white/10 text-slate-100 backdrop-blur-2xl'
    : 'bg-white/85 border-slate-200 text-slate-800 backdrop-blur-2xl';

  const currentWorkspaceInfo = WORKSPACE_REGISTRY.find(ws => ws.id === activeWorkspace);

  return (
    <header
      id="cad-creator-header"
      className={`h-14 px-3 sm:px-5 border-b flex items-center justify-between z-30 shrink-0 select-none transition-colors ${headerBg}`}
    >
      {/* Brand Identity & Sidenav Toggle */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        {/* Sidenav Rail/Drawer Button */}
        <button
          onClick={onToggleSidenav}
          className={`p-2 rounded-xl border transition-all flex items-center justify-center ${
            isSidenavOpen
              ? isDarkMode
                ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40'
                : 'bg-indigo-50 text-indigo-600 border-indigo-200'
              : isDarkMode
              ? 'border-white/5 hover:border-white/15 text-slate-400 hover:text-slate-200 hover:bg-white/5'
              : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Toggle Workspaces & Pipelines Sidenav"
          aria-label="Toggle Sidenav"
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        {/* Brand Avatar & Name */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-md flex items-center justify-center overflow-hidden shrink-0">
            <img
              src="https://imagedelivery.net/g7wf09fCONpnidkRnR_5vw/2a047804-2626-4529-4324-f5a800f48500/avatar"
              alt="AgentSam Logo"
              className="w-full h-full object-cover rounded-[9px]"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-tight text-slate-900 dark:text-white">AgentSam</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">CAD Creator</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded font-bold bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20">
                PROD
              </span>
            </div>
            <p className="text-[9px] text-slate-400 font-mono hidden xl:block">
              Parametric Solids · Physics Simulation · Generative AI
            </p>
          </div>
        </div>
      </div>

      {/* Primary Workspace Navigation Tabs (Desktop & Tablet) */}
      <nav
        aria-label="Workspaces"
        className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
      >
        {WORKSPACE_REGISTRY.map(ws => {
          const Icon = ws.icon;
          const isActive = activeWorkspace === ws.id;

          return (
            <button
              key={ws.id}
              onClick={() => onSelectWorkspace(ws.id)}
              className={`px-2.5 lg:px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                isActive
                  ? isDarkMode
                    ? 'bg-white/15 text-white shadow-sm border border-white/10'
                    : 'bg-white text-indigo-600 shadow-sm border border-slate-200/80'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-black/5'
              }`}
              title={`${ws.name} (${ws.engine})`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">{ws.shortName}</span>
              {ws.badge && (
                <span
                  className={`hidden lg:inline-block text-[8px] font-mono px-1 py-0.2 rounded font-bold uppercase ${
                    isActive
                      ? isDarkMode
                        ? 'bg-indigo-500 text-white'
                        : 'bg-indigo-100 text-indigo-700'
                      : isDarkMode
                      ? 'bg-slate-800 text-slate-400'
                      : 'bg-slate-200/80 text-slate-500'
                  }`}
                >
                  {ws.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Active Workspace Indicator on Mobile */}
      <div className="flex md:hidden items-center gap-1.5 px-2 py-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
        {currentWorkspaceInfo && (
          <>
            <currentWorkspaceInfo.icon className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[100px]">
              {currentWorkspaceInfo.shortName}
            </span>
          </>
        )}
      </div>

      {/* Global Actions Suite */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Diagnostic HUD Button */}
        <button
          onClick={onToggleDiagnostics}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
            showDiagnostics
              ? isDarkMode
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/40 shadow-sm'
                : 'bg-amber-50 text-amber-600 border-amber-300 shadow-sm'
              : isDarkMode
              ? 'border-white/5 hover:border-white/15 text-slate-400 hover:text-slate-200 hover:bg-white/5'
              : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Toggle Simulation Diagnostics (Shortcut: D)"
        >
          <Activity className={`w-3.5 h-3.5 ${showDiagnostics ? 'animate-pulse text-amber-400' : ''}`} />
          <span className="hidden sm:inline font-mono text-[11px]">500Hz HUD</span>
        </button>

        {/* Dark / Light Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          className={`p-2 rounded-xl border transition-all flex items-center justify-center ${
            isDarkMode
              ? 'border-white/5 hover:border-white/15 text-slate-400 hover:text-slate-200 hover:bg-white/5'
              : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle color theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* AgentSam AI Copilot Trigger */}
        <button
          onClick={onOpenCopilot}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95 shrink-0"
          title="Open AgentSam Physical Design Assistant"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">AgentSam</span>
        </button>
      </div>
    </header>
  );
}

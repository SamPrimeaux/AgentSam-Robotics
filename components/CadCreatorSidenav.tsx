/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Activity,
  Box,
  ChevronLeft,
  ChevronRight,
  Code2,
  Cpu,
  ExternalLink,
  Flame,
  HelpCircle,
  Layers,
  LayoutGrid,
  Menu,
  RotateCw,
  Sparkles,
  SunMedium,
  Wrench,
  X,
  Zap
} from 'lucide-react';
import React, { useState } from 'react';
import { WORKSPACE_REGISTRY, WorkspaceDescriptor, WorkspaceId } from '../app/workspaceRegistry';

interface CadCreatorSidenavProps {
  isOpen: boolean;
  onClose: () => void;
  activeWorkspace: WorkspaceId;
  onSelectWorkspace: (id: WorkspaceId) => void;
  isDarkMode: boolean;
  onOpenCopilot: () => void;
}

export function CadCreatorSidenav({
  isOpen,
  onClose,
  activeWorkspace,
  onSelectWorkspace,
  isDarkMode,
  onOpenCopilot
}: CadCreatorSidenavProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorkspaces = WORKSPACE_REGISTRY.filter(ws =>
    ws.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ws.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ws.engine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const panelBg = isDarkMode
    ? 'bg-slate-950/90 border-white/10 text-slate-100 backdrop-blur-2xl shadow-2xl'
    : 'bg-white/95 border-slate-200 text-slate-800 backdrop-blur-2xl shadow-2xl';

  const cardBg = isDarkMode ? 'bg-slate-900/60 border-white/5' : 'bg-slate-50/80 border-slate-200/80';

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay for mobile screens */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidenav Container */}
      <aside
        id="cad-creator-sidenav"
        className={`fixed top-0 bottom-0 left-0 z-50 w-80 sm:w-88 border-r flex flex-col transition-transform duration-300 ease-in-out ${panelBg}`}
      >
        {/* Sidenav Header */}
        <div className="h-14 px-4 border-b border-inherit flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-md flex items-center justify-center overflow-hidden">
              <img
                src="https://imagedelivery.net/g7wf09fCONpnidkRnR_5vw/2a047804-2626-4529-4324-f5a800f48500/avatar"
                alt="AgentSam Avatar"
                className="w-full h-full object-cover rounded-[9px]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="text-xs font-bold tracking-tight leading-none">AgentSam Shell</h2>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">Workspaces & Pipelines</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-colors"
            title="Close Sidenav"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Filter Search */}
        <div className="p-3 border-b border-inherit shrink-0">
          <input
            type="text"
            placeholder="Filter workspaces & CAD tools..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={`w-full px-3 py-1.5 text-xs rounded-xl border font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
              isDarkMode
                ? 'bg-slate-900 border-white/10 text-slate-200 placeholder-slate-500'
                : 'bg-slate-100 border-slate-200 text-slate-800 placeholder-slate-400'
            }`}
          />
        </div>

        {/* Workspaces List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
            Engineering Workspaces
          </div>

          {filteredWorkspaces.map(ws => {
            const Icon = ws.icon;
            const isActive = activeWorkspace === ws.id;

            return (
              <button
                key={ws.id}
                onClick={() => {
                  onSelectWorkspace(ws.id);
                  // Auto close on mobile
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`w-full text-left p-3 rounded-2xl border transition-all duration-150 flex flex-col gap-1.5 group ${
                  isActive
                    ? isDarkMode
                      ? 'bg-indigo-600/15 border-indigo-500/40 text-white shadow-md'
                      : 'bg-indigo-50/90 border-indigo-300 text-indigo-950 shadow-md'
                    : isDarkMode
                    ? 'border-white/5 hover:border-white/15 hover:bg-white/5 text-slate-300'
                    : 'border-slate-200/70 hover:border-slate-300 hover:bg-slate-100/70 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : isDarkMode
                          ? 'bg-slate-800 text-slate-300 group-hover:text-indigo-400'
                          : 'bg-white text-slate-600 group-hover:text-indigo-600 border border-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">{ws.name}</div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">{ws.engine}</div>
                    </div>
                  </div>

                  {ws.badge && (
                    <span
                      className={`text-[8px] font-mono px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide border ${
                        isActive
                          ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                          : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                      }`}
                    >
                      {ws.badge}
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed pl-10">
                  {ws.description}
                </p>
              </button>
            );
          })}

          {/* Connected Tool Pipelines Quick Launch */}
          <div className="pt-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
              Connected Tool Pipelines
            </div>
            <div className="space-y-1.5 mt-1">
              <div
                onClick={() => {
                  onSelectWorkspace('parametric');
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer hover:border-emerald-500/40 transition-colors ${cardBg}`}
              >
                <div className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-medium">OpenSCAD CSG Generator</span>
                </div>
                <span className="text-[9px] font-mono text-emerald-400">READY</span>
              </div>

              <div
                onClick={() => {
                  onSelectWorkspace('render');
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer hover:border-amber-500/40 transition-colors ${cardBg}`}
              >
                <div className="flex items-center gap-2">
                  <SunMedium className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-medium">Blender 4.2 Cycles PBR</span>
                </div>
                <span className="text-[9px] font-mono text-amber-400">READY</span>
              </div>

              <div
                onClick={() => {
                  onSelectWorkspace('generative');
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer hover:border-violet-500/40 transition-colors ${cardBg}`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  <span className="text-xs font-medium">Meshy Generative 3D</span>
                </div>
                <span className="text-[9px] font-mono text-violet-400">READY</span>
              </div>
            </div>
          </div>
        </div>

        {/* System & Physics Engine Status Footer */}
        <div className="p-3 border-t border-inherit shrink-0 space-y-2">
          <div className={`p-2.5 rounded-xl border ${cardBg} space-y-1 text-[11px]`}>
            <div className="flex items-center justify-between font-mono">
              <span className="text-slate-400">Engine Loop:</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                500 Hz WASM
              </span>
            </div>
            <div className="flex items-center justify-between font-mono text-slate-400">
              <span>Kinematics:</span>
              <span className="text-slate-200">7-DOF Analytical IK</span>
            </div>
            <div className="flex items-center justify-between font-mono text-slate-400">
              <span>Vision-Action:</span>
              <span className="text-indigo-400">Gemini ER 2.0</span>
            </div>
          </div>

          <button
            onClick={onOpenCopilot}
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 hover:opacity-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AgentSam Copilot</span>
          </button>
        </div>
      </aside>
    </>
  );
}

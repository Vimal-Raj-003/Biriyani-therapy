import React from 'react';
import { Download, Copy, Check, ZoomIn, ZoomOut, RotateCcw, Layers, Sparkles } from 'lucide-react';
import { CalligraphyFontId, CalligraphyScope } from '../types';
import { CALLIGRAPHY_FONTS } from '../utils/calligraphy';

interface BannerToolbarProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  showSpecGuide: boolean;
  onToggleSpecGuide: () => void;
  onCopyPhone: () => void;
  copiedPhone: boolean;
  onDownloadHtml: () => void;
  calligraphyFont: CalligraphyFontId;
  onCalligraphyFontChange: (font: CalligraphyFontId) => void;
  calligraphyScope: CalligraphyScope;
  onCalligraphyScopeChange: (scope: CalligraphyScope) => void;
}

export const BannerToolbar: React.FC<BannerToolbarProps> = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  showSpecGuide,
  onToggleSpecGuide,
  onCopyPhone,
  copiedPhone,
  onDownloadHtml,
  calligraphyFont,
  onCalligraphyFontChange,
  calligraphyScope,
  onCalligraphyScopeChange,
}) => {
  return (
    <div className="w-full max-w-[860px] flex flex-col gap-2.5 px-4 py-3 bg-[#190c06]/90 border border-white/15 backdrop-blur-md rounded-xl text-white shadow-xl">
      {/* Top Row: Brand Info & Primary Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Font Info */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-extrabold text-sm tracking-wide uppercase text-white">
              Biryani Therapy Banner
            </span>
          </div>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-white/10 text-white/90 border border-white/20">
            Calligraphy Styling Active • Pure White • 900px
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Spec Guide Overlay */}
          <button
            onClick={onToggleSpecGuide}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all flex items-center space-x-1.5 ${
              showSpecGuide
                ? 'bg-white text-[#1b0d06] border-white'
                : 'border-white/30 text-white/90 hover:bg-white/10'
            }`}
            title="Toggle reference alignment grid"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Grid Guide</span>
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center bg-white/10 rounded-lg border border-white/20 p-0.5">
            <button
              onClick={onZoomOut}
              disabled={zoom <= 0.7}
              className="p-1.5 text-white hover:bg-white/20 rounded disabled:opacity-30 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-bold px-1.5 min-w-[36px] text-center text-white/90">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={onZoomIn}
              disabled={zoom >= 1.3}
              className="p-1.5 text-white hover:bg-white/20 rounded disabled:opacity-30 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            {zoom !== 1 && (
              <button
                onClick={onResetZoom}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/20 rounded transition-colors"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Quick Phone Copy */}
          <button
            onClick={onCopyPhone}
            className="px-3 py-1.5 rounded-lg border border-white/30 text-xs font-bold uppercase tracking-wider text-white/90 hover:bg-white/10 transition-all flex items-center space-x-1.5"
            title="Copy 0309-6747611"
          >
            {copiedPhone ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">0309-6747611</span>
              </>
            )}
          </button>

          {/* Export / Print Banner */}
          <button
            onClick={onDownloadHtml}
            className="px-3 py-1.5 rounded-lg bg-white text-[#1b0d06] text-xs font-black uppercase tracking-wider hover:bg-amber-300 transition-all flex items-center space-x-1.5 active:scale-95"
            title="Download Banner High-Res HTML/Print Ready"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save / Print</span>
          </button>
        </div>
      </div>

      {/* Bottom Row: Calligraphy Font & Scope Selector */}
      <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center space-x-1 font-bold text-amber-300 uppercase tracking-wider text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Calligraphy Style:</span>
          </span>
          <div className="inline-flex flex-wrap rounded-lg bg-black/40 border border-white/15 p-0.5 gap-0.5">
            {CALLIGRAPHY_FONTS.map((font) => (
              <button
                key={font.id}
                type="button"
                onClick={() => onCalligraphyFontChange(font.id)}
                className={`px-3 py-1 rounded-md text-sm sm:text-base transition-all cursor-pointer ${
                  calligraphyFont === font.id
                    ? 'bg-amber-400 text-black font-bold shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                style={{ fontFamily: font.family }}
                title={font.description}
              >
                {font.name}
              </button>
            ))}
          </div>
        </div>

        {/* Scope Selector */}
        <div className="inline-flex rounded-lg bg-white/5 border border-white/10 p-0.5">
          <button
            type="button"
            onClick={() => onCalligraphyScopeChange('signature')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              calligraphyScope === 'signature'
                ? 'bg-white text-neutral-900 shadow'
                : 'text-white/70 hover:text-white'
            }`}
            title="Therapy, Magic!, Doorstep and taglines in calligraphy"
          >
            Signature Script
          </button>
          <button
            type="button"
            onClick={() => onCalligraphyScopeChange('full')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              calligraphyScope === 'full'
                ? 'bg-white text-neutral-900 shadow'
                : 'text-white/70 hover:text-white'
            }`}
            title="Full Biryani Therapy headline & accents in calligraphy"
          >
            Full Title Calligraphy
          </button>
        </div>
      </div>
    </div>
  );
};

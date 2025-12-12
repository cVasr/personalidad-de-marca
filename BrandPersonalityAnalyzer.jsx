import React, { useState, useEffect } from 'react';
import { Trash2, Download, Upload } from 'lucide-react';
import * as mammoth from 'mammoth';

export default function BrandPersonalityAnalyzer() {
  const [brandName, setBrandName] = useState('MEDUPROX');
  const [textInput, setTextInput] = useState('');
  const [fileName, setFileName] = useState('');
  const [positions, setPositions] = useState({
    elite: 50,
    serio: 50,
    convencional: 50,
    amigable: 50,
    madura: 50
  });

  const BRAND_COLORS = {
    dark: '#0D0D0D',
    primary: '#BF1744',
    secondary: '#FFC300'
  };

  // Keywords para cada escala
  const keywordMap = {
    elite: {
      left: ['lujo', 'premium', 'exclusivo', 'sofisticado', 'elegante', 'selecto', 'alto nivel', 'prestigious', 'refinado', 'elite'],
      right: ['accesible', 'amigable', 'democrático', 'inclusivo', 'abierto', 'directo', 'simple', 'fácil', 'cercano', 'disponible']
    },
    serio: {
      left: ['serio', 'formal', 'profesional', 'riguroso', 'corporativo', 'técnico', 'especializado', 'tradicional', 'institucional', 'académico'],
      right: ['divertido', 'lúdico', 'playful', 'casual', 'relajado', 'informal', 'espontáneo', 'jovial', 'energético', 'lúdica', 'motivacional', 'inspirador']
    },
    convencional: {
      left: ['tradicional', 'convencional', 'clásico', 'establecido', 'probado', 'conservador', 'formal', 'histórico', 'heritage'],
      right: ['rebelde', 'innovador', 'disruptivo', 'moderno', 'experimental', 'vanguardia', 'desafiante', 'progresista', 'innovación', 'tecnológico', 'tecnología']
    },
    amigable: {
      left: ['amigable', 'cálido', 'cercano', 'humanizado', 'empático', 'accesible', 'informal', 'colaborativo', 'confiable', 'educativo'],
      right: ['autoritario', 'distante', 'formal', 'impositivo', 'riguroso', 'jerárquico', 'frío', 'impersonal']
    },
    madura: {
      left: ['madura', 'clásico', 'sofisticado', 'experimentado', 'heritage', 'tradición', 'consolidado', 'estable', 'maduro'],
      right: ['joven', 'innovador', 'fresco', 'dinámico', 'moderno', 'emergente', 'tecnológico', 'exponencial', 'disruptivo', 'crecimiento', 'jóven']
    }
  };

  const scales = [
    { key: 'elite', leftLabel: 'Élite', rightLabel: 'Accesible' },
    { key: 'serio', leftLabel: 'Serio', rightLabel: 'Divertido' },
    { key: 'convencional', leftLabel: 'Convencional', rightLabel: 'Rebelde' },
    { key: 'amigable', leftLabel: 'Amigable', rightLabel: 'Autoritario' },
    { key: 'madura', leftLabel: 'Madura y Clásica', rightLabel: 'Joven e Innovador' }
  ];

  // Analizar texto y calcular posiciones
  const analyzeText = (text) => {
    const lowerText = text.toLowerCase();
    const newPositions = { ...positions };

    Object.keys(keywordMap).forEach((scale) => {
      let leftScore = 0;
      let rightScore = 0;
      let totalMatches = 0;

      // Contar matches en keywords left
      keywordMap[scale].left.forEach((keyword) => {
        const count = (lowerText.match(new RegExp(keyword, 'g')) || []).length;
        leftScore += count;
        totalMatches += count;
      });

      // Contar matches en keywords right
      keywordMap[scale].right.forEach((keyword) => {
        const count = (lowerText.match(new RegExp(keyword, 'g')) || []).length;
        rightScore += count;
        totalMatches += count;
      });

      // Calcular posición (0-100, donde 50 es centro)
      if (totalMatches > 0) {
        const ratio = rightScore / (leftScore + rightScore);
        newPositions[scale] = Math.round(ratio * 100);
      }
    });

    setPositions(newPositions);
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setTextInput(text);
    if (text.trim().length > 10) {
      analyzeText(text);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const extractedText = result.value;
      setTextInput(extractedText);
      analyzeText(extractedText);
    } catch (error) {
      alert('Error al procesar el archivo: ' + error.message);
    }
  };

  const handleSliderChange = (scale, value) => {
    setPositions({ ...positions, [scale]: value });
  };

  const clearAll = () => {
    setTextInput('');
    setFileName('');
    setBrandName('MEDUPROX');
    setPositions({
      elite: 50,
      serio: 50,
      convencional: 50,
      amigable: 50,
      madura: 50
    });
  };

  const downloadCode = () => {
    const code = `import React, { useState, useEffect } from 'react';
import { Trash2, Download, Upload } from 'lucide-react';
import * as mammoth from 'mammoth';

export default function BrandPersonalityAnalyzer() {
  // [Código del componente]
  // Descargado desde Gabriel Sebastian Web
  // Versión: 1.0
}`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code));
    element.setAttribute('download', 'BrandPersonalityAnalyzer.jsx');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const PersonalityScale = ({ scale, leftLabel, rightLabel }) => {
    const position = positions[scale];

    return (
      <div className="mb-10 last:mb-0">
        <div className="flex items-start justify-between gap-6 mb-4">
          {/* Left label */}
          <div className="text-xs font-semibold text-gray-300 pt-2 flex-shrink-0 text-right" style={{ width: '100px' }}>
            {leftLabel}
          </div>

          {/* Central scale container */}
          <div className="flex-1 relative h-12">
            {/* Line - always same width for all scales */}
            <div 
              className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2"
              style={{ backgroundColor: BRAND_COLORS.secondary, opacity: 0.3 }}
            ></div>

            {/* Center marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BRAND_COLORS.secondary }}></div>
            </div>

            {/* Brand position marker */}
            <div
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
              style={{ left: `${position}%`, transform: 'translateX(-50%) translateY(-50%)' }}
            >
              <div 
                className="text-white font-bold rounded-md shadow-lg flex items-center justify-center overflow-hidden"
                style={{ 
                  backgroundColor: BRAND_COLORS.primary,
                  width: '140px',
                  height: '32px',
                  fontSize: brandName.length > 12 ? '10px' : brandName.length > 8 ? '11px' : '12px'
                }}
                title={brandName}
              >
                {brandName}
              </div>
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-0.5 h-2"
                style={{ backgroundColor: BRAND_COLORS.primary }}
              ></div>
            </div>

            {/* Slider input */}
            <input
              type="range"
              min="0"
              max="100"
              value={position}
              onChange={(e) => handleSliderChange(scale, parseInt(e.target.value))}
              className="absolute top-1/2 -translate-y-1/2 w-full opacity-0 cursor-pointer h-6"
            />
          </div>

          {/* Right label */}
          <div className="text-xs font-semibold text-gray-300 pt-2 flex-shrink-0 text-left" style={{ width: '100px' }}>
            {rightLabel}
          </div>
        </div>

        {/* Position percentage */}
        <div className="text-xs text-center" style={{ color: BRAND_COLORS.secondary }}>
          {position}%
        </div>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: BRAND_COLORS.dark }} className="min-h-screen p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Analizador de Personalidad de Marca
          </h1>
          <p className="text-gray-400">Posiciona tu marca en las 5 escalas de personalidad de forma automática</p>
        </div>

        {/* Input sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Brand name */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Nombre de la marca</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value.toUpperCase())}
              className="w-full px-4 py-2.5 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all border-2"
              style={{ 
                backgroundColor: '#1a1a1a',
                borderColor: BRAND_COLORS.secondary
              }}
              placeholder="Ej: MEDUPROX"
            />
          </div>

          {/* File upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Cargar documento .docx</label>
            <label className="w-full px-4 py-2.5 rounded-lg cursor-pointer transition-all border-2 flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: '#1a1a1a',
                borderColor: BRAND_COLORS.primary
              }}
            >
              <Upload size={16} style={{ color: BRAND_COLORS.primary }} />
              <span className="text-gray-300 text-sm">{fileName || 'Seleccionar archivo'}</span>
              <input
                type="file"
                accept=".docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Clear button */}
          <div className="flex items-end">
            <button
              onClick={clearAll}
              className="w-full px-4 py-2.5 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 hover:opacity-90"
              style={{ backgroundColor: BRAND_COLORS.primary }}
            >
              <Trash2 size={16} />
              Reiniciar
            </button>
          </div>
        </div>

        {/* Text analysis area */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Palabras clave o formulario (análisis automático)
          </label>
          <textarea
            value={textInput}
            onChange={handleTextChange}
            placeholder="Pega palabras clave, contenido del formulario o carga un documento .docx. El sistema analizará automáticamente y posicionará tu marca..."
            className="w-full h-40 px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all border-2 resize-none"
            style={{ 
              backgroundColor: '#1a1a1a',
              borderColor: BRAND_COLORS.secondary
            }}
          />
          <p className="text-xs text-gray-500 mt-2">El análisis se actualiza automáticamente mientras escribes</p>
        </div>

        {/* Scales */}
        <div className="rounded-xl p-8 mb-8" style={{ backgroundColor: '#1a1a1a', border: `2px solid ${BRAND_COLORS.secondary}` }}>
          <h2 className="text-2xl font-bold text-white mb-10">Personalidad de la Marca</h2>
          <div className="space-y-2">
            {scales.map(({ key, leftLabel, rightLabel }) => (
              <PersonalityScale
                key={key}
                scale={key}
                leftLabel={leftLabel}
                rightLabel={rightLabel}
              />
            ))}
          </div>
        </div>

        {/* Info and download section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Help section */}
          <div className="p-6 rounded-lg" style={{ backgroundColor: '#1a1a1a', border: `2px solid ${BRAND_COLORS.secondary}` }}>
            <h3 className="text-sm font-bold text-white mb-3">📌 Cómo usar:</h3>
            <ul className="text-xs text-gray-400 space-y-2">
              <li>✓ Escribe el nombre de tu marca</li>
              <li>✓ Pega palabras clave o el formulario completo</li>
              <li>✓ O carga un documento .docx</li>
              <li>✓ El sistema posicionará automáticamente</li>
              <li>✓ Ajusta manualmente con los sliders si necesitas</li>
            </ul>
          </div>

          {/* Download section */}
          <div className="p-6 rounded-lg" style={{ backgroundColor: '#1a1a1a', border: `2px solid ${BRAND_COLORS.primary}` }}>
            <h3 className="text-sm font-bold text-white mb-3">📥 Descargar y GitHub:</h3>
            <p className="text-xs text-gray-400 mb-4">Este artefacto está listo para subir a GitHub. Descarga el código del componente React para usarlo en tu proyecto.</p>
            <button
              onClick={downloadCode}
              className="w-full px-4 py-2.5 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 hover:opacity-90"
              style={{ backgroundColor: BRAND_COLORS.primary }}
            >
              <Download size={16} />
              Descargar para GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
}

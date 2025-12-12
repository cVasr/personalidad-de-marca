# Analizador de Personalidad de Marca

Herramienta interactiva para posicionar marcas en las 5 escalas de personalidad de forma automática.

**Desarrollado por:** Gabriel Sebastian Web
**Colores de marca:** #0D0D0D (fondo) | #BF1744 (principal) | #FFC300 (secundario)

---

## Características

✅ **Análisis automático** - Pega palabras clave o formularios y el sistema posiciona tu marca automáticamente  
✅ **Carga de documentos** - Soporta archivos .docx (Word)  
✅ **Ajuste manual** - Controles deslizantes para refinar el posicionamiento  
✅ **5 escalas de personalidad:**
- Élite ↔ Accesible
- Serio ↔ Divertido
- Convencional ↔ Rebelde
- Amigable ↔ Autoritario
- Madura y Clásica ↔ Joven e Innovador

---

## Instalación

1. Clona este repositorio
2. Instala dependencias:
```bash
npm install
```

3. Importa el componente en tu proyecto React:
```jsx
import BrandPersonalityAnalyzer from './BrandPersonalityAnalyzer';

export default function App() {
  return <BrandPersonalityAnalyzer />;
}
```

---

## Dependencias

- `react` - Framework UI
- `lucide-react` - Iconos
- `mammoth` - Lectura de archivos .docx

---

## Cómo usar

1. **Ingresa el nombre de la marca** en el campo superior
2. **Carga un documento .docx** O **pega palabras clave** en el área de texto
3. El sistema analizará automáticamente y posicionará tu marca
4. Ajusta manualmente con los sliders si es necesario
5. Descarga una captura o exporta los datos

---

## Análisis automático

El sistema busca palabras clave asociadas a cada escala:

### Élite ↔ Accesible
- **Élite:** lujo, premium, exclusivo, sofisticado, elegante
- **Accesible:** accesible, amigable, democrático, inclusivo, fácil

### Serio ↔ Divertido
- **Serio:** formal, profesional, riguroso, corporativo, técnico
- **Divertido:** divertido, playful, casual, relajado, energético

### Convencional ↔ Rebelde
- **Convencional:** tradicional, clásico, establecido, conservador
- **Rebelde:** innovador, disruptivo, moderno, experimental, progresista

### Amigable ↔ Autoritario
- **Amigable:** amigable, cálido, cercano, humanizado, empático
- **Autoritario:** autoritario, distante, formal, jerárquico

### Madura y Clásica ↔ Joven e Innovador
- **Madura:** madura, clásico, sofisticado, experimentado
- **Joven e Innovador:** joven, innovador, dinámico, tecnológico, exponencial

---

## Personalización

Puedes modificar:
- **Colores:** Cambia `BRAND_COLORS` en el código
- **Keywords:** Actualiza `keywordMap` para agregar o cambiar palabras clave
- **Escalas:** Añade nuevas escalas modificando el array `scales`

---

## Autor

**Gabriel Sebastian Web**  
Agencia de diseño especializada en branding, web design y UI/UX  
[gabrielsebastianweb.com](https://gabrielsebastianweb.com)

---

## Licencia

Este proyecto está disponible bajo licencia MIT. Úsalo libremente en tus proyectos.

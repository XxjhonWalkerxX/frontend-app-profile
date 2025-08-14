# 📁 Estructura de Estilos del Perfil

Esta carpeta contiene los estilos organizados por componente para una mejor mantenibilidad.

## 📋 Estructura de Archivos

```
src/profile/styles/
├── index.scss                      # Archivo principal - importa todos los estilos
├── _base.scss                      # Estilos base y utilidades globales
├── _buttons.scss                   # Sobrescritura de botones de Paragon/Bootstrap
└── components/
    ├── _avatar.scss                # Estilos del avatar y controles de edición
    ├── _banner.scss                # Banner superior del perfil
    ├── _certificates.scss          # Estilos de certificados
    ├── _forms.scss                 # Estilos de formularios editables
    └── _username-description.scss  # Descripción del username
```

## 🎯 Propósito de cada archivo

### **index.scss** - Archivo Principal
- Importa todos los archivos de estilos
- Contiene el wrapper principal `.profile-page`

### **_base.scss** - Estilos Base
- Utilidades globales (`.word-break-all`, `.mb-2rem`)
- Iconos base

### **_buttons.scss** - Override de Botones
- Sobrescribe estilos por defecto de Paragon
- Manejo de decoración de texto en botones

### **components/_banner.scss** - Banner
- Banner superior con gradiente
- Patrón de puntos de fondo

### **components/_avatar.scss** - Avatar
- Avatar circular con responsive
- Controles de edición (upload/delete)
- Menú de opciones

### **components/_certificates.scss** - Certificados
- Cards de certificados
- Ilustraciones de tipo
- Títulos con tipografía serif

### **components/_forms.scss** - Formularios
- Headers de secciones editables
- Controles de formularios

### **components/_username-description.scss** - Username
- Descripción posicionada del usuario
- Estilos de fecha de ingreso

## 🔧 Uso

Para usar esta estructura, el archivo `src/profile/index.scss` importa:

```scss
@import './styles/index';
```

## ✨ Ventajas de esta Organización

1. **Mantenibilidad**: Cada componente tiene sus estilos separados
2. **Escalabilidad**: Fácil agregar nuevos componentes
3. **Reutilización**: Estilos modulares y bien organizados
4. **Debugging**: Más fácil encontrar y corregir estilos específicos
5. **Colaboración**: Varios desarrolladores pueden trabajar sin conflictos

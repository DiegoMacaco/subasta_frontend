# Sistema de Subastas (Frontend)

Sistema web para la gestión integral de subastas en línea, diseñado para facilitar la compra y venta de productos mediante un sistema de pujas en tiempo real.

## Tabla de Contenidos

* **Características**
* **Tecnologías**
* **Requisitos Previos**
* **Instalación**
* **Configuración**
* **Ejecución**
* **Estructura del Proyecto**
* **Scripts Disponibles**

## Características

* Sistema de pujas en tiempo real
* Catálogo de productos en subasta
* Gestión de usuarios y perfiles
* Autenticación segura
* Panel de administración
* Historial de pujas y transacciones
* Temporizadores de subasta
* Notificaciones de cambios en subastas
* Interfaz intuitiva y responsiva

## 🛠 Tecnologías

* **React** - Librería de JavaScript para interfaces de usuario
* **Vite** - Build tool y dev server ultrarrápido
* **Tailwind CSS** - Framework de CSS utility-first con plugin para Vite
* **React Router DOM** - Navegación entre páginas
* **Lucide React** - Librería de iconos moderna y limpia

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

* **Node.js** (v16 o superior)
* **npm** o **yarn**
* **Git**

> **Nota:** Este frontend requiere que el backend esté ejecutándose. Revisa el **README del backend** para instrucciones de instalación.

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/DiegoMacaco/subasta_frontend.git
```

### 2. Navegar al directorio del proyecto

```bash
cd subastas-frontend
```

### 3. Instalar dependencias

Instala todas las dependencias necesarias ejecutando los siguientes comandos:

```bash
npm install
npm install tailwindcss @tailwindcss/vite
npm install react-router-dom
npm install lucide-react
```

> **Nota:** Estos comandos instalarán React, Vite, Tailwind CSS con su plugin para Vite, React Router para la navegación, y Lucide React para los iconos.

## Configuración

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

Ajusta las URLs según la configuración de tu backend.

## Ejecución

### Iniciar el servidor de desarrollo

Con npm:

```bash
npm run dev
```


La aplicación estará disponible en: `http://localhost:5173/`

## Estructura del Proyecto

```
subastas-frontend/
├── src/
│   ├── assets/             # Recursos estáticos (logos, iconos)
│   │   └── react.svg
│   ├── components/         # Componentes reutilizables
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── img/                # Imágenes del proyecto
│   │   ├── l.jpg
│   │   └── q.jpg
│   ├── pages/              # Páginas de la aplicación
│   │   ├── Home.tsx        # Página principal
│   │   ├── Login.tsx       # Inicio de sesión
│   │   ├── Register.tsx    # Registro de usuarios
│   │   ├── Subastas.tsx    # Listado de subastas
│   │   ├── CrearSubasta.tsx # Crear nueva subasta
│   │   ├── Perfil.tsx      # Perfil de usuario
│   │   └── Notificaciones.tsx # Notificaciones
│   ├── services/           # Servicios API
│   │   └── api.ts          # Configuración de axios/fetch
│   ├── types/              # Definiciones de TypeScript
│   │   ├── User.ts         # Tipos de usuario
│   │   └── Producto.ts     # Tipos de producto
│   ├── utils/              # Funciones utilitarias
│   │   ├── auth.ts         # Utilidades de autenticación
│   │   └── helpers.ts      # Funciones auxiliares
│   ├── App.tsx             # Componente principal
│   ├── App.css             # Estilos del componente principal
│   ├── main.tsx            # Punto de entrada
│   ├── index.css           # Estilos globales
│   ├── iniciarpuja.tsx     # Lógica para iniciar pujas
│   └── pujar.tsx           # Lógica para realizar pujas
├── .env                    # Variables de entorno
├── package.json            # Dependencias y scripts
├── vite.config.ts          # Configuración de Vite
└── tailwind.config.js      # Configuración de Tailwind
```

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | Ejecuta el linter |

## Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request


## Autor

Tu Nombre - [DiegoMacao](https://github.com/tu-usuario)



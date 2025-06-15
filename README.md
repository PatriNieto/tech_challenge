# Fruteka Tech Challenge

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)

Una aplicación creada con Next.js, TypeScript y Styled Components para mostrar una lista de películas usando la API de The Movie Database (TMDB).

## Tecnologías

- Next.js con Turbopack
- TypeScript
- Styled Components con SSR
- Axios
- Server Side Rendering (getServerSideProps)
- Jest + React Testing Library
- Prettier + ESLint

## Scripts disponibles

npm run dev # Inicia la app en desarrollo
npm run build # Compila el proyecto
npm start # Ejecuta en modo producción
npm test # Corre los tests
npm run format # Formatea el código con Prettier

Variables de entorno

Crea un archivo .env.local en la raíz del proyecto con el siguiente contenido:

TMDB_API_KEY=your_tmdb_api_key_here

Estructura del proyecto:

```
├── pages/
│   ├── index.tsx
│   └── movie/
│       └── [id].tsx
├── features/
│   ├── list/
│   │   ├── components/
│   │   │   └── MovieCard/
│   │   │       ├── index.tsx
│   │   │       ├── styles.ts
│   │   │       └── __tests__/
│   │   │           └── MovieCard.test.tsx
│   │   └── pages/
│   │       └── MoviesListPage.tsx
│   └── detail/
|       └── components/
|           └── BackButton/
│               └── index.tsx
│               └── styles.ts
│       └── pages/
│           └── MovieDetailPage.tsx
│           └── styles.ts
|           └── __tests__/
│                 └── MovieDetailPage.test.tsx
├── lib/
│   └── apiClient.ts
├── styles/
│   └── global.ts
├── next.config.ts
├── jest.config.ts
├── tsconfig.json
└── ...
```

Decisiones de diseño
Styled Components con soporte para SSR.

SSR con getServerSideProps para mejorar el SEO y evitar datos desactualizados.

Cliente Axios centralizado en lib/apiClient.ts con baseURL y API key.

Prettier y ESLint configurados para formateo automático.

Accesibilidad integrada mediante reglas aplicadas a componentes de estilo.

Configuración recomendada para VSCode
Archivo .vscode/settings.json:

json
{
"editor.formatOnSave": true,
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.codeActionsOnSave": {
"source.fixAll.eslint": true}
}

Extensiones recomendadas:
ESLint
Prettier – Code formatter

Testing
npm run test

Recursos
https://nextjs.org/docs/pages/getting-started/installation

https://developer.themoviedb.org/reference/intro/login

Autor
Patricia Nieto
GitHub: @PatriNieto

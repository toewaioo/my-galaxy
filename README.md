# My Love in the Galaxy 🌌

An immersive, cinematic 3D web experience built to celebrate memories amongst the stars. This project leverages the power of **WebGL** and **React Three Fiber** to create a high-performance, interactive galactic environment.

![Project Preview](/public/preview.png)

## ✨ Overview

**My Love in the Galaxy** is a sophisticated 3D application that places the user in a stunning orbital environment. At its core lies a pulsating, holographic planet rendered with custom **Fresnel shaders**, surrounded by dynamic star fields and orbiting "memory comets."

This project serves as a showcase of modern web graphics engineering, demonstrating seamless integration between React state management, Three.js 3D rendering, and post-processing effects.

## 🚀 Key Features

### 🌌 Immersive 3D Environment

- **Procedural Universe**: A rich, deeply layered background featuring randomized star fields, misty glowing nebulas, and a custom gradient atmospheric sphere.
- **Dynamic Lighting**: Multi-point lighting system simulating a vibrant galactic visual palette with deep pinks, magentas, and cosmic purples.
- **Cinematic Camera**: Features a smooth, automated camera entry animation that transitions into user-controlled orbital navigation (OrbitControls).

### 🪐 Advanced Shaders & Visuals

- **Holographic Planet**: A custom `ShaderMaterial` implementing a Fresnel effect to create a mesmerizing, edge-glowing "hearthbeat" planet.
- **Post-Processing Bloom**: High-performance bloom effects using `@react-three/postprocessing` to create a dreamy, ethereal glow around light sources and particles.
- **Particle Systems**: Optimized instanced meshes for thousands of background stars and interactive orbiting elements.

### 💫 Interactive Memories

- **Orbiting Comets**: Hundreds of interactive comets orbit the planet, each representing a potential memory.
- **Glassmorphic UI**: Clicking a comet reveals a memory (photo & message) in a beautifully styled, glassmorphic modal overlay.
- **Audio Atmosphere**: Integrated ambient background music with user-toggleable mute controls.

### 📹 Media Capture

- **Video Recording**: Built-in functionality using the MediaStream Recording API to capture high-quality, 60FPS video loops of the scene directly from the canvas.

## 🛠️ Technology Stack

This project is built with a modern, performance-oriented stack:

- **Core Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) (for lightning-fast builds)
- **3D Engine**: [Three.js](https://threejs.org/) via [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **3D Abstractions**: [@react-three/drei](https://github.com/pmndrs/drei) (OrbitControls, Sparkles, Shaders)
- **Post-Processing**: [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing)
- **UI Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js**: v18.0.0 or higher recommended.
- **Package Manager**: npm or yarn.

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/my-galaxy.git
    cd my-galaxy
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start the development server**

    ```bash
    npm run dev
    ```

4.  **Launch**
    Open your browser and navigate to `http://localhost:5173` to view the application.

## 🔧 Building for Production

To create an optimized production build:

```bash
npm run build
```

This will generate a `dist` folder containing the compiled assets, ready for deployment to static hosting services like Vercel, Netlify, or GitHub Pages.

## 🎨 Configuration & Customization

### Adding Memories

To personalize the experience with your own photos and messages, modify the `memories` array located in `src/components/Scene.tsx`:

```typescript
// src/components/Scene.tsx

const memories = [
  { image: "/your-photo-1.jpg", message: "A beautiful memory..." },
  { image: "/your-photo-2.jpg", message: "Another special moment..." },
  // Add more entries as needed
];
```

_Note: Ensure all image files are placed in the `public/` directory so they are accessible by the application._

### Adjusting Visuals

- **Planet Aesthetics**: Tweak the `uColor`, `uFresnelColor`, and `uIntensity` uniforms in `src/components/Planet.tsx` to change the planet's holographic appearance.
- **Text Ring**: Update the orbiting text in `src/components/TextRing.tsx`.

## 📂 Project Structure

```
my-galaxy/
├── public/              # Static assets (images, music)
├── src/
│   ├── components/      # React components (3D & UI)
│   │   ├── Planet.tsx   # Custom shader planet
│   │   ├── Scene.tsx    # Main R3F Canvas composition
│   │   ├── Overlay.tsx  # UI Overlay (Music, Intro, Modals)
│   │   └── ...
│   ├── App.tsx          # Root application component
│   └── main.tsx         # Entry point
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

_Engineered with ❤️ and React Three Fiber_

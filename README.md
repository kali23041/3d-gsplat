<div align="center">

# 3D Gsplat

**A web portal for a Gaussian Splatting 2D-to-3D reconstruction project.**<br/>
Users sign up, create reconstruction projects from multi-view photos and follow their progress, while admins manage projects and explore training, parameter and quality dashboards.

<p>
  <img src="https://img.shields.io/badge/React-19-48484d?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-6-48484d?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite 6" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-48484d?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8" alt="Tailwind CSS 3" />
  <img src="https://img.shields.io/badge/Firebase-Auth_%2B_Firestore-48484d?style=for-the-badge&logo=firebase&logoColor=FFCA28" alt="Firebase" />
  <img src="https://img.shields.io/badge/license-MIT-48484d?style=for-the-badge" alt="MIT License" />
</p>

<p>
  <a href="https://3d-gsplat.vercel.app"><b>Live demo</b></a> ·
  <a href="#-features">Features</a> ·
  <a href="#-tech-stack">Tech stack</a> ·
  <a href="#-getting-started">Getting started</a> ·
  <a href="#-project-structure">Structure</a>
</p>

<sub>BE Final Year Project 2024-25 · ENTC Department, Dattakala College of Engineering, Pune</sub>

<!-- Screenshot: add docs/screenshots/dashboard.png and reference it here -->

</div>

---

> [!NOTE]
> This repository is the **web front end** of the project. It does not include the Gaussian Splatting training pipeline itself: project queues and progress are simulated, uploaded images are stored as metadata only, and the training, progress and parameter screens use sample data to show how the pipeline would be monitored.

## About the project

[3D Gaussian Splatting](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/) turns a set of ordinary photos of an object or scene into a real-time renderable 3D model. This portal is the user-facing side of our final-year project: a place to submit photo sets, track reconstructions and present the system's design, specifications and applications (cultural heritage, education, medical imaging, real estate, automotive, gaming and VR).

## ✨ Features

### 🔐 Accounts & roles
- **Email/password and Google sign-in** with Firebase Authentication.
- User profiles in Firestore with a **role** (`user` or `admin`); login routes each role to its own dashboard.
- A live **Firebase connection indicator** in the admin sidebar.

### 👤 User side
- **Upload project:** name a project and pick multiple images. A Firestore project document is created with the image list, a queue position and an estimated completion time.
- **User dashboard:** see your projects with status and progress, and delete the ones you no longer need.

### 🛠️ Admin side
- **Project overview dashboard:** system overview, technical specifications, system requirements, real-world applications, development timeline, budget and team.
- **Projects:** every user's projects in real time (Firestore `onSnapshot`), with delete.
- **Gallery:** every uploaded image across projects (name, size, project and uploader), updated in real time.
- **Upload monitor:** client images by source device, resolution and view angle.
- **Training:** a simulated training run with epoch counter, live loss and accuracy charts, GPU stats and a terminal log.
- **Progress & quality:** loss, accuracy and PSNR charts, model comparison and resource requirements.
- **Parameters:** Gaussian Splatting training, optimisation, quality, rendering and system settings, with presets and history.
- **Tools:** the processing steps (prepare images, generate 3D points, convert to Gaussian splats, optimise) with a queue and recent activity.
- **Point cloud, poses and export** pages are placeholders for future work.

## 🛠️ Tech stack

| Area | Tools |
|---|---|
| UI | React 19, React Router 7 (hash routing), Tailwind CSS 3, shadcn-style UI components (Radix Slot, CVA) |
| Charts | Recharts |
| Backend | Firebase Authentication (email + Google), Cloud Firestore |
| Icons & utils | lucide-react, clsx, tailwind-merge |
| Tooling | Vite 6, ESLint 9 |

## 🚀 Getting started

**Requirements:** Node.js 18+ and npm.

```bash
git clone https://github.com/kali23041/3d-gsplat.git
cd 3d-gsplat
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

**Use your own Firebase project:** replace the values in `src/firebase/config.js` with your project's web config, enable **Email/Password** and **Google** sign-in, and create a **Cloud Firestore** database. To make an admin, set `role: "admin"` on that user's document in the `users` collection (documents are keyed by email).

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## 📁 Project structure

```
src/
├── App.jsx                  # Routes
├── auth/                    # Login, Signup (role-based redirect)
├── components/              # Sidebar, shadcn-style Button and Card
├── firebase/config.js       # Firebase app, auth, Firestore, Google provider
├── hooks/useFirebaseConnection.js
├── landing/LandingPage.jsx  # Project landing page
├── users/                   # User dashboard and project upload
└── pages/                   # Admin: dashboard, projects, gallery, upload, training,
                             # progress, parameters, tools, point cloud, poses, export
```

## 👥 Team

**Kartik Sabale** · Bhavana Borkar · Sai Rakshe

## 📄 License

Released under the [MIT License](LICENSE).

## 📬 Contact

**Kartik Sabale** · [kartiksabale.com](https://kartiksabale.com) · [hello@kartiksabale.com](mailto:hello@kartiksabale.com)

---

<div align="center">

**3D Gsplat** · Created by **Kartik Sabale** · © 2026

</div>

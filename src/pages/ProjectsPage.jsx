
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

function GitHubIcon() {
  return (
    <svg height="28" width="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white hover:text-yellow-300 transition-colors duration-200">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 21.13V24" />
    </svg>
  );
}

function ProjectSection({ project, isActive }) {
  const navigate = useNavigate();
  const [imgIdx, setImgIdx] = useState(0);
  const [centerHover, setCenterHover] = useState(false);
  const [isSwitchingImage, setIsSwitchingImage] = useState(false);
  const [arrowHover, setArrowHover] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Fade overlay text when mouse is near center
  function handleMouseMove(e) {
    const { clientX, clientY } = e;
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Center 40% of screen triggers fade
    const centerX = w * 0.3 < clientX && clientX < w * 0.7;
    const centerY = h * 0.3 < clientY && clientY < h * 0.7;
    setCenterHover(centerX && centerY);
  }
  function handleMouseLeave() {
    setCenterHover(false);
  }

  // Hide overlay when switching images
  function handlePrev(e) {
    e.stopPropagation();
    setIsSwitchingImage(true);
    setImgIdx((prev) => (prev - 1 + project.images.length) % project.images.length);
    setTimeout(() => setIsSwitchingImage(false), 400);
  }
  function handleNext(e) {
    e.stopPropagation();
    setIsSwitchingImage(true);
    setImgIdx((prev) => (prev + 1) % project.images.length);
    setTimeout(() => setIsSwitchingImage(false), 400);
  }

  // Hide overlay when hovering over carousel arrows
  function handleArrowEnter() {
    setArrowHover(true);
  }
  function handleArrowLeave() {
    setArrowHover(false);
  }

  const summary = project.summary || project.bullets[0];
  const overlayVisible = !centerHover && !isSwitchingImage && !arrowHover;

  return (
    <section
      ref={ref}
      className="min-h-screen w-full flex items-end snap-center relative overflow-hidden"
      style={{ background: 'none' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background image or gray fallback */}
      {project.images && project.images.length > 0 ? (
        <motion.img
          key={imgIdx}
          src={project.images[imgIdx]}
          alt={project.title + ' screenshot'}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: isInView ? 1 : 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 w-full h-full min-h-screen object-contain bg-black z-0 select-none pointer-events-none"
          draggable={false}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full min-h-screen bg-black z-0" />
      )}
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />
      {/* Carousel arrows */}
      {project.images && project.images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            onMouseEnter={handleArrowEnter}
            onMouseLeave={handleArrowLeave}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white rounded-full p-3 shadow-lg border border-white/20"
            aria-label="Previous image"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            onMouseEnter={handleArrowEnter}
            onMouseLeave={handleArrowLeave}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white rounded-full p-3 shadow-lg border border-white/20"
            aria-label="Next image"
          >
            &#8594;
          </button>
        </>
      )}
      {/* Dots for carousel */}
      {project.images && project.images.length > 1 && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {project.images.map((_, i) => (
            <span key={i} className={`inline-block w-2 h-2 rounded-full ${i === imgIdx ? 'bg-white' : 'bg-gray-500/60'}`}></span>
          ))}
        </div>
      )}
      {/* Overlayed text */}
      <motion.div
        className="relative z-20 w-full max-w-5xl px-10 pb-16 md:pb-24 flex flex-col items-start text-white dark:text-white"
        animate={{ opacity: overlayVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4">
          {project.title}
        </h2>
        <p className="text-xl md:text-2xl text-white font-medium mb-6 drop-shadow-lg max-w-2xl">
          {summary}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
            aria-label="GitHub Repository"
            onClick={e => e.stopPropagation()}
          >
            <GitHubIcon />
          </a>
          <button
            className="px-6 py-2 bg-white/90 text-black rounded-lg font-semibold shadow hover:bg-yellow-400 transition-colors duration-200 text-lg dark:text-black"
            onClick={e => { e.stopPropagation(); navigate(`/blog/${project.slug}`); }}
          >
            Read Full Blog
          </button>
        </div>
      </motion.div>
    </section>
  );
}

function ProjectsPage() {
  const scrollContainerRef = useRef(null);
  const [currentProjectIdx, setCurrentProjectIdx] = useState(0);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    // Scroll event to update current project index
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const sections = Array.from(scrollContainerRef.current.children).filter(
        el => el.tagName === 'SECTION'
      );
      const vh = window.innerHeight;
      let idx = 0;
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top < vh / 2 && rect.bottom > vh / 2) {
          idx = i;
          break;
        }
      }
      setCurrentProjectIdx(idx);
    };
    const container = scrollContainerRef.current;
    if (container) container.addEventListener('scroll', handleScroll);
    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const projects = [
    {
      title: 'Causana – Temporal Causal Inference Explorer',
      slug: 'causana-temporal-causal-inference-explorer',
      github: 'https://github.com/xorhaan/Causana',
      images: [
        '/projects/causana1.jpg',
        '/projects/causana2.jpg',
      ],
      summary: 'End-to-end causal analysis platform for time-lagged relationships in multivariate time series.',
      bullets: [
        'End-to-end causal analysis platform for time-lagged relationships in multivariate time series.',
        'Implemented a modular pipeline with FastAPI-based causal engine, Go job runner, and Spring Boot gateway, enabling CSV ingestion, lag configuration, and concurrent job handling.',
        'Programmed a REST interface to output weighted causal graphs as JSON, integrating seamlessly with an interactive frontend DAG visualizer.',
        'Achieved 80% reduction in manual analysis time and ensured scalability to 100+ variables with tunable parameters for robust exploration.'
      ]
    },
    {
      title: 'Convidat – AI-Powered Sustainable Tourism Platform',
      slug: 'convidat-ai-powered-sustainable-tourism-platform',
      github: 'https://github.com/xorhaan/Convidat',
      images: [
        '/projects/convidat1.png',
        '/projects/convidat2.png',
        '/projects/convidat3.png',
        '/projects/convidat4.png',
        '/projects/convidat5.png',
        '/projects/convidat6.png',
        '/projects/convidat7.png',
      ],
      summary: 'Production-grade MERN microservices platform for eco-conscious tourism.',
      bullets: [
        'Production-grade MERN microservices platform for eco-conscious tourism.',
        'Trained and deployed an SVD-based recommendation model via Flask to suggest optimal cities using contextual user–city interaction data, achieving 92% top-5 accuracy.',
        'Implemented modular services for eco-stay filtering, carbon emission tracking, and season-aware city ranking using Google Maps & Places APIs, cutting down route planning time by 40%.',
        'Developed REST APIs for Trip Itinerary, Packing, and Budget Planning, enabling personalized travel plans and reducing manual effort with auto-filled recommendations and dynamic carbon summaries.'
      ]
    },
    {
      title: 'OccluFix – Face Inpainting with Perceptual and Adversarial Losses',
      slug: 'occlufix-face-inpainting-with-perceptual-and-adversarial-losses',
      github: 'https://github.com/xorhaan/OccluFix',
      images: [
        '/projects/occlufix1.png',
        '/projects/occlufix2.png',
        '/projects/occlufix3.png',
      ],
      summary: 'U-Net-based inpainting model for occluded facial regions using CelebA dataset.',
      bullets: [
        'U-Net-based inpainting model for occluded facial regions using CelebA dataset.',
        'Enhanced output realism by combining L1, VGG16-based perceptual loss, and PatchGAN adversarial loss, boosting structural fidelity by 35%.',
        'Trained using mixed precision on a T4 GPU, cutting training time by 40% and achieving convergence within 4 hours.',
        'Reduced visual artifacts by 70% and improved masked-region reconstruction accuracy by 30% compared to L1-only baselines.'
      ]
    }
  ];

  return (
    <div ref={scrollContainerRef} className="w-full h-screen snap-y snap-mandatory overflow-y-scroll relative">
      {/* Vertical project hint */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 select-none">
        {projects.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-8 rounded-full transition-all duration-300 ${i === currentProjectIdx ? 'bg-white' : 'bg-white/40'}`}
          />
        ))}
      </div>
      {projects.map((project, idx) => (
        <ProjectSection key={project.slug} project={project} isActive={idx === currentProjectIdx} />
      ))}
    </div>
  );
}

export default ProjectsPage;

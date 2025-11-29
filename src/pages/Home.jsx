import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';


function useSectionFade(ref, threshold = 0.2, minOpacity = 0.1) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    function handleScroll() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const t = threshold * vh;
      let newOp = 1;

      if (rect.bottom < 0 || rect.top > vh) {
        newOp = 0;
      }
      else if (rect.top > vh - t) {
        const p = (vh - rect.top) / t;          
        newOp = minOpacity + (1 - minOpacity) * p;
      }
      
      else if (rect.bottom < t) {
        const p = rect.bottom / t;               
        newOp = minOpacity + (1 - minOpacity) * p;
      }
      
      else {
        newOp = 1;
      }

      setOpacity(newOp);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, threshold, minOpacity]);

  return opacity;
}

export default function Home() {
  const summaryRef = useRef(null);
  const skillsRef  = useRef(null);
  const projectsRef = useRef(null);
  const footerRef = useRef(null);
  const navigate = useNavigate();

  const summaryOpacity = useSectionFade(summaryRef, 0.2, 0.1);
  const skillsOpacity  = useSectionFade(skillsRef,  0.2, 0.1);
  const projectsOpacity = useSectionFade(projectsRef, 0.2, 0.1);
  const footerOpacity = useSectionFade(footerRef, 0.2, 0.1);

  const [theme, setTheme] = useState('light');

  const handleThemeToggle = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div ref={summaryRef}>
        <Hero />
      </div>

      <motion.section
        ref={summaryRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: summaryOpacity }}
        transition={{ duration: 0.3 }}
        className="relative flex justify-center items-center w-full h-screen px-4 py-24 text-black dark:text-white transition-colors duration-300"
      >
        <span className="absolute top-8 left-8 text-2xl text-gray-700 dark:text-gray-200 select-none">
          &#x250C;
        </span>
        <span className="absolute top-8 right-8 text-2xl text-gray-700 dark:text-gray-200 select-none">
          &#x2510;
        </span>
        <span className="absolute bottom-8 left-8 text-2xl text-gray-700 dark:text-gray-200 select-none">
          &#x2514;
        </span>
        <span className="absolute bottom-8 right-8 text-2xl text-gray-700 dark:text-gray-200 select-none">
          &#x2518;
        </span>

        <div className="relative z-10 max-w-6xl w-full rounded-2xl p-10 md:p-16 flex flex-col gap-8 items-center justify-center" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
          <div className="flex flex-col gap-6 text-left w-full">
            <div className="text-black dark:text-white text-3xl md:text-4xl font-extrabold leading-snug mb-2">
              Hi, I'm Rohaan.<br />
              I love building seamless, accessible, and robust software experiences.
            </div>
            <div className="text-black dark:text-white text-2xl md:text-3xl font-semibold leading-snug">
              I specialize in backend systems, AI, and scalable architectures—crafting products that blend logic, performance, and real-world impact.
            </div>
            <div className="text-black dark:text-white text-xl md:text-2xl font-medium leading-snug">
              From full-stack apps and ML pipelines to recommendation engines, I thrive on solving complex problems and delivering clean, efficient solutions.
            </div>
            <div className="text-black dark:text-white text-xl md:text-2xl font-medium leading-snug">
              Currently exploring distributed systems, concurrency in Go, and microservices in Java Spring Boot.
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={skillsRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: skillsOpacity }}
        transition={{ duration: 0.5 }}
        className="w-full min-h-screen px-6 py-32 flex justify-center items-start relative transition-colors duration-300"
      >
        <div
          className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          <div className="flex flex-col justify-center space-y-6 px-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-white">
              Skills
            </h2>
            <h1 className="text-5xl md:text-6xl font-bold text-black dark:text-white">
              Stack
            </h1>
            <p className="text-md md:text-lg text-gray-700 dark:text-gray-200 font-medium leading-relaxed">
              I build with modern languages, frameworks, and tools that make
              scalable software not just possible—but fast and reliable.
            </p>
          </div>

          <div className="flex flex-col items-start justify-center pl-4 space-y-10 overflow-hidden relative w-full">
            <div className="w-full">
              <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                Languages
              </h3>
              <div className="h-[1px] bg-black dark:bg-white w-1/2 mb-4" />
              <div className="flex flex-col space-y-4">
                {['Python','Java','JavaScript','TypeScript','Go','C','C++'].map((lang,i)=>(
                  <motion.div
                    key={lang}
                    initial={{ x: 100 }}
                    whileInView={{ x: 0 }}
                    viewport={{ amount: 0.3 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="text-2xl font-semibold text-gray-800 dark:text-gray-200"
                  >
                    {lang}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="w-full">
              <h3 className="text-2xl font-bold text-black dark:text-white mt-6 mb-2">
                Frameworks
              </h3>
              <div className="h-[1px] bg-black dark:bg-white w-1/2 mb-4" />
              <div className="flex flex-col space-y-4">
                {['Spring Boot','FastAPI','React.js','Flask','Express', 'Pytorch', 'Tensorflow'].map((fw,i)=>(
                  <motion.div
                    key={fw}
                    initial={{ x: 100 }}
                    whileInView={{ x: 0 }}
                    viewport={{ amount: 0.3 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="text-2xl font-semibold text-gray-800 dark:text-gray-200"
                  >
                    {fw}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="w-full">
              <h3 className="text-2xl font-bold text-black dark:text-white mt-6 mb-2">
                Tools
              </h3>
              <div className="h-[1px] bg-black dark:bg-white w-1/2 mb-4" />
              <div className="flex flex-col space-y-4">
                {['Git','Docker','PostgreSQL','MongoDB','Redis','AWS','Postman'].map((tool,i)=>(
                  <motion.div
                    key={tool}
                    initial={{ x: 100 }}
                    whileInView={{ x: 0 }}
                    viewport={{ amount: 0.3 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="text-2xl font-semibold text-gray-800 dark:text-gray-200"
                  >
                    {tool}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={projectsRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: projectsOpacity }}
        transition={{ duration: 0.5 }}
        className="w-full min-h-screen text-black dark:text-white px-6 py-32 flex flex-col items-center relative transition-colors duration-300"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-8">Projects</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center max-w-2xl">
          Here are some of the projects I'm proud of. Explore more on the projects page!
        </p>
        <div className="w-full max-w-7xl min-h-[420px] pt-6 pr-8 pb-10 overflow-visible">
          <div className="flex gap-8 min-w-[1200px] h-[370px] items-stretch overflow-visible">
            {[
              {
                title: 'Causana – Temporal Causal Inference Explorer',
                slug: 'causana-temporal-causal-inference-explorer',
                github: 'https://github.com/xorhaan/Causana',
                bullets: [
                  'End-to-end causal analysis platform for time-lagged relationships in multivariate time series.',
                  'Modular pipeline: FastAPI engine, Go job runner, Spring Boot gateway.',
                  'REST interface outputs weighted causal graphs for interactive DAG visualizer.'
                ]
              },
              {
                title: 'Convidat – AI-Powered Sustainable Tourism Platform',
                slug: 'convidat-ai-powered-sustainable-tourism-platform',
                github: 'https://github.com/xorhaan/Convidat',
                bullets: [
                  'Production-grade MERN microservices platform for eco-conscious tourism.',
                  'SVD-based recommendation model, modular services for eco-stay, carbon tracking, city ranking.',
                  'REST APIs for trip planning, packing, and budget.'
                ]
              },
              {
                title: 'OccluFix – Face Inpainting with Perceptual and Adversarial Losses',
                slug: 'occlufix-face-inpainting-with-perceptual-and-adversarial-losses',
                github: 'https://github.com/xorhaan/OccluFix',
                bullets: [
                  'U-Net-based inpainting model for occluded facial regions using CelebA dataset.',
                  'Combines L1, VGG16 perceptual loss, PatchGAN adversarial loss for realism.',
                  'Reduced visual artifacts by 70%, improved masked-region accuracy by 30%.'
                ]
              }
            ].map((project) => (
              <Tilt
                key={project.slug}
                glareEnable={true}
                glareMaxOpacity={0.12}
                glareColor="#fff"
                glarePosition="all"
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                scale={1.03}
                transitionSpeed={1000}
                className="w-[350px] h-[340px] flex-1 overflow-visible"
              >
                <div
                  className="w-full h-full rounded-2xl border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-6 py-8 flex flex-col gap-4 hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/blog/${project.slug}`)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Read more about ${project.title}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-yellow-300 transition-colors duration-200"
                      aria-label="GitHub Repository"
                      onClick={e => e.stopPropagation()}
                    >
                      <svg height="24" width="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 21.13V24" /></svg>
                    </a>
                  </div>
                  <ul className="list-disc pl-5 text-base text-gray-800 dark:text-gray-200 font-medium space-y-2 leading-relaxed">
                    {project.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
        <button
          onClick={() => navigate('/projects')}
          className="mt-8 inline-block bg-black dark:bg-white text-white dark:text-black font-semibold py-3 px-8 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300"
        >
          View All Projects
        </button>
      </motion.section>

      <section className="w-full min-h-[50vh] flex flex-col justify-center items-center gap-12 py-20 px-4 bg-transparent dark:bg-black transition-colors duration-300" style={{ background: 'none' }}>
        <div className="max-w-3xl w-full mb-8 text-center">
          <h3 className="text-3xl font-extrabold mb-4 text-black dark:text-white">LeetCode Activity</h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">I love the thrill of problem solving and the art of competitive programming. Tackling algorithmic challenges on LeetCode sharpens my skills, fuels my curiosity, and keeps me at the top of my game. Whether it's a tricky DP problem or a clever graph algorithm, I enjoy the process of breaking down complex problems and finding elegant solutions.</p>
        </div>
        <Tilt
          glareEnable={true}
          glareMaxOpacity={0.18}
          glareColor="#fff"
          glarePosition="all"
          tiltMaxAngleX={12}
          tiltMaxAngleY={12}
          scale={1.06}
          transitionSpeed={1200}
          className="w-full flex justify-center"
        >
          <a
            href="https://leetcode.com/u/xorhaan/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full max-w-3xl"
            style={{ textDecoration: 'none' }}
          >
            <div className="flex flex-col items-center justify-center w-full rounded-3xl border-2 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg p-12 hover:shadow-[16px_16px_0px_rgba(0,0,0,1)] z-10 transition-all duration-300 cursor-pointer">
              <img
                src="https://leetcard.jacoblin.cool/xorhaan?theme=light&ext=heatmap"
                alt="LeetCode Stats"
                className="w-full max-w-2xl rounded-xl border border-gray-300 shadow-lg dark:border-gray-700"
                style={{ background: 'inherit' }}
              />
            </div>
          </a>
        </Tilt>
      </section>

      <motion.div
        ref={footerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: footerOpacity }}
        transition={{ duration: 0.5 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}

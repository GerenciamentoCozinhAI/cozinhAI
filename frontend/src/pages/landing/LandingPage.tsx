"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChefHat,
  Users,
  Zap,
  ArrowRight,
  UtensilsCrossed,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Efeito para detectar scroll e aplicar estilo ao header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Variantes para animações
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white text-gray-800">
      <header
        className={`w-full py-4 fixed top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-green-700 shadow-md" : "bg-green-700/95"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/logos/Logo CozinhAI-2.png"
                alt="CozinhAI Logo"
                className="w-20 md:w-24"
              />
              <span className="text-white text-xl md:text-2xl font-bold leading-tight">
                CozinhAI
              </span>
            </div>

            <div className="flex space-x-2 md:space-x-3">
              <button
                onClick={() => navigate("/login")}
                className="px-3 py-1.5 md:px-4 md:py-2 bg-white text-green-700 font-semibold rounded-md hover:bg-gray-100 transition-colors text-sm"
              >
                Entrar
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-3 py-1.5 md:px-4 md:py-2 bg-green-600 text-white font-semibold rounded-md border border-green-500 hover:bg-green-500 transition-colors text-sm"
              >
                Registrar-se
              </button>
            </div>

            <div className="w-full hidden md:flex items-center justify-center space-x-6 text-white">
              <a
                href="#features"
                className="hover:text-green-200 transition-colors"
              >
                Recursos
              </a>
              <a
                href="#how-it-works"
                className="hover:text-green-200 transition-colors"
              >
                Como Funciona
              </a>
              <a href="#about" className="hover:text-green-200 transition-colors">
                Sobre o Site
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              className="flex flex-col md:flex-row items-center justify-between gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              <motion.div
                className="md:w-1/2 text-center md:text-left"
                variants={fadeIn}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 leading-tight">
                  Bem-vindo ao <span className="text-green-600">CozinhAI</span>
                </h1>
                <p className="mt-4 text-base md:text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
                  Um site de receitas com geração por IA. Organize suas receitas
                  favoritas e compartilhe com amigos.
                </p>
                <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button
                    onClick={() => navigate("/home")}
                    className="px-6 py-2 md:px-8 md:py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    Começar Agora <ArrowRight size={18} />
                  </button>
                  <button
                    onClick={() => navigate("/about")}
                    className="px-6 py-2 md:px-8 md:py-3 bg-white text-green-700 font-semibold rounded-lg border border-green-200 hover:bg-green-50 transition-colors"
                  >
                    Saiba Mais
                  </button>
                </div>
              </motion.div>

              <motion.div className="md:w-1/2 mt-8 md:mt-0" variants={fadeIn}>
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-16 md:w-24 h-16 md:h-24 bg-green-100 rounded-full opacity-70"></div>
                  <div className="absolute -bottom-6 -right-6 w-20 md:w-32 h-20 md:h-32 bg-green-200 rounded-full opacity-70"></div>
                  <img
                    src="/CozinhAI-feature.png?height=400&width=500"
                    alt="CozinhAI em ação"
                    className="rounded-xl shadow-xl relative z-10 w-full max-w-lg mx-auto"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-green-800">
                Recursos Principais
              </h2>
              <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                Descubra como o CozinhAI pode transformar sua experiência na
                cozinha
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <FeatureCard
                icon={<BookOpen className="h-7 w-7 text-green-600" />}
                title="Organização"
                description="Mantenha suas receitas organizadas em um só lugar, com categorias personalizadas e busca inteligente."
              />

              <FeatureCard
                icon={<Users className="h-7 w-7 text-green-600" />}
                title="Colaboração"
                description="Compartilhe receitas com amigos e familiares, receba sugestões e crie coleções colaborativas."
                highlighted={true}
              />

              <FeatureCard
                icon={<Zap className="h-7 w-7 text-green-600" />}
                title="Produtividade"
                description="Crie receitas com ajuda da IA de forma rápida e eficiente, adaptadas aos ingredientes disponíveis."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-12 md:py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-green-800">
                Como o CozinhAI funciona
              </h2>
              <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                Três passos simples para melhorar sua experiência na cozinha
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <StepCard
                number={1}
                title="Descreva o que deseja"
                description="Informe os ingredientes que você tem ou o tipo de prato que deseja preparar."
                icon={<UtensilsCrossed className="h-6 w-6 text-white" />}
              />

              <StepCard
                number={2}
                title="Receba sugestões"
                description="Nossa IA irá gerar receitas personalizadas com base nas suas preferências e ingredientes."
                icon={<Sparkles className="h-6 w-6 text-white" />}
              />

              <StepCard
                number={3}
                title="Explore a comunidade"
                description="Descubra receitas compartilhadas por outros usuários e adicione seu toque pessoal."
                icon={<ChefHat className="h-6 w-6 text-white" />}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="about"
          className="py-12 md:py-16 bg-gradient-to-r from-green-600 to-green-700 text-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                Esse site foi criado como projeto da Disciplina de Gerenciamento de Projetos
              </h2>
              <p className="text-base md:text-lg mb-6 md:mb-8 text-green-100">
                Um site para gerar e organizar suas receitas de forma
                prática.
              </p>
              <motion.button
                onClick={() => navigate("/register")}
                className="px-6 py-3 md:px-8 md:py-4 bg-white text-green-700 font-bold rounded-lg hover:bg-green-100 transition-colors text-base md:text-lg shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Experimente Gratuitamente
              </motion.button>
              <p className="mt-4 text-xs md:text-sm text-green-200">
                Não é necessário pagar nada. Comece a usar agora mesmo!
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className=" text-green-800 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <img
                src="/logos/Logo Fundo Branco.png"
                alt="CozinhAI Logo"
                className="w-28 md:w-32 mx-auto md:mx-0"
              />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-green-800 hover:text-green-950 transition-colors"
                  >
                    Início
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-green-800 hover:text-green-950 transition-colors"
                  >
                    Recursos
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-green-800 hover:text-green-950 transition-colors"
                  >
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-green-800 hover:text-green-950 transition-colors"
                  >
                    Sobre o Site
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center md:text-right">
              <h3 className="text-lg font-semibold mb-4">Criador</h3>
              <ul className="space-y-2">
                <li>
                    <a
                    href="https://github.com/eslycaetano"
                    className="text-green-800 hover:text-green-950 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Contato
                    </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-700 mt-8 pt-6 text-center">
            <p>
              &copy; {new Date().getFullYear()} CozinhAI. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Componentes auxiliares
type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlighted?: boolean;
};

function FeatureCard({
  icon,
  title,
  description,
  highlighted = false,
}: FeatureCardProps) {
  return (
    <motion.div
      className={`p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all ${
        highlighted ? "bg-green-50 border border-green-200" : "bg-white"
      }`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-green-800 text-center">
        {title}
      </h3>
      <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-600 text-center">
        {description}
      </p>
    </motion.div>
  );
}

type StepCardProps = {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
};

function StepCard({ number, title, description, icon }: StepCardProps) {
  return (
    <motion.div
      className="bg-white p-5 md:p-6 rounded-xl shadow-md relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: number * 0.1 }}
    >
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
        <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
          {icon}
        </div>
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-lg md:text-xl font-semibold text-green-700">
          {title}
        </h3>
        <p className="mt-2 text-sm md:text-base text-gray-600">{description}</p>
      </div>
      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-sm font-bold text-green-700">
          {number}
        </div>
      </div>
    </motion.div>
  );
}

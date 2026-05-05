import { createClient } from "@/utils/supabase/server";
import { getProducts } from "./actions";
import AddProductForm from "@/components/AddProductForm";
import ProductCard from "@/components/ProductCard";
import { TrendingDown, Shield, Bell, Rabbit, Zap, BarChart3 } from "lucide-react";
import AuthButton from "@/components/AuthButton";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = user ? await getProducts() : [];

  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description:
        "Extracts prices in seconds, handling JavaScript and dynamic content with ease.",
      color: "blue",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description:
        "Works across all major e-commerce sites with built-in anti-bot protection.",
      color: "orange",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target price.",
      color: "purple",
    },
  ];

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50 via-white to-white dark:from-gray-900 dark:via-gray-950 dark:to-black">
      {/* Header */}
      <header className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-orange-500 p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-orange-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
              PRICE<span className="text-orange-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">TRACKER</span>
            </h1>
          </div>

          <AuthButton user={user} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[300px] h-[300px] bg-orange-300 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-blue-300 rounded-full blur-[150px] animate-pulse [animation-delay:2s]"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-orange-100/80 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 px-6 py-2 rounded-full text-sm font-bold mb-8 border border-orange-200/50 dark:border-orange-500/20 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Made with ❤️ by Bhanu
          </div>

          <h2 className="text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Never Miss a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700 dark:from-orange-400 dark:to-orange-600">
              Price Drop
            </span> Again.
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            The smartest way to track products across Amazon, Walmart, and more. 
            Get instant alerts when prices hit your target.
          </p>

          <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-400">
            <AddProductForm user={user} />
          </div>

          {/* Features Grid */}
          {products.length === 0 && (
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
              {FEATURES.map(({ icon: Icon, title, description, color }) => (
                <div
                  key={title}
                  className="group bg-white/50 dark:bg-gray-900/50 p-8 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 hover:border-orange-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/5"
                >
                  <div className={`w-14 h-14 bg-orange-100 dark:bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      {user && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 p-2 rounded-lg">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                Tracked Products
              </h3>
            </div>
            <div className="bg-orange-100 dark:bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-200/50 dark:border-orange-500/20">
              <span className="text-sm font-bold text-orange-700 dark:text-orange-400">
                {products.length} {products.length === 1 ? "Product" : "Products"}
              </span>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 items-start">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {user && products.length === 0 && (
        <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
          <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-800 p-16 group hover:border-orange-400 transition-colors duration-500">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-orange-50 transition-all duration-500">
              <TrendingDown className="w-10 h-10 text-gray-400 group-hover:text-orange-500 transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Start Your Tracking Journey
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
              You haven't added any products yet. Paste a URL above to begin tracking and save money today!
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-500" />
            <span className="font-black tracking-tighter text-gray-900 dark:text-white">
              PRICE<span className="text-orange-500">TRACKER</span>
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Price Tracker. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-orange-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

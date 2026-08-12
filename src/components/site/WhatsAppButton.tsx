import { MessageCircle, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function WhatsAppButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <div className="relative">
        <motion.a
          href="https://wa.me/33759440105"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactez-nous sur WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="group flex items-center justify-center w-14 h-14 bg-gradient-to-br from-brand to-[oklch(0.65_0.24_270)] text-white rounded-full shadow-[0_4px_20px_oklch(0.6_0.22_265/0.3)] hover:shadow-[0_8px_30px_oklch(0.6_0.22_265/0.5)] transition-all duration-300"
        >
          <MessageCircle size={24} strokeWidth={2} />
        </motion.a>
        
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-surface/95 backdrop-blur-xl border border-border rounded-lg shadow-lg whitespace-nowrap"
            >
              <div className="text-sm font-medium text-foreground">Bonjour 👋</div>
              <div className="text-xs text-muted-foreground">Discutons de votre projet</div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-surface border-r border-b border-border" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center justify-center w-14 h-14 bg-surface/90 border border-border/80 backdrop-blur-xl text-foreground rounded-full shadow-lg hover:bg-brand hover:border-brand hover:text-white transition-all duration-300"
            aria-label="Retour en haut"
          >
            <ArrowUp size={20} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

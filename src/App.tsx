import { InvoiceProvider } from './context/InvoiceContext';
import Header from './components/Header';
import FormPanel from './components/form/FormPanel';
import PreviewPanel from './components/preview/PreviewPanel';
import { motion } from 'framer-motion';

function App() {
  return (
    <InvoiceProvider>
      <div className="min-h-screen bg-bg-base flex flex-col selection:bg-accent/30 selection:text-white">
        <Header />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex-1 flex flex-col lg:flex-row max-w-[1680px] w-full mx-auto"
        >
          {/* Form Panel - Left */}
          <div className="w-full lg:w-[500px] xl:w-[560px] flex-shrink-0 border-r border-border-default/80 p-4 sm:p-6">
            <div className="lg:h-[calc(100vh-73px)] lg:overflow-y-auto pr-1">
              <FormPanel />
            </div>
          </div>

          {/* Preview Panel - Right */}
          <div className="flex-1 bg-[#09090b]">
            <div className="lg:h-[calc(100vh-73px)] lg:sticky lg:top-[73px]">
              <PreviewPanel />
            </div>
          </div>
        </motion.main>
      </div>
    </InvoiceProvider>
  );
}

export default App;

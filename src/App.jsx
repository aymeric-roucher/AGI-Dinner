import { useEffect, useRef, useState } from 'react';
import Giscus from '@giscus/react';

const models = [
  { value: 'codex', label: 'Codex // OpenAI' },
  { value: 'claude', label: 'Claude // Anthropic' },
  { value: 'gemini', label: 'Gemini // Google' },
];

const defaultModel = 'codex'; // default display: Codex // OpenAI

function ModelSelector({ value, onChange }) {
  return (
    <div className="bg-black p-4">
      <select
        className="w-full max-w-md bg-black text-white border border-white px-4 py-2 cursor-pointer focus:outline-none"
        value={value}
        onChange={onChange}
      >
        {models.map((model) => (
          <option key={model.value} value={model.value}>
            {model.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ModelFrame({ model }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const adjustHeight = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const iframeBody = iframeDoc.body;
        const iframeHtml = iframeDoc.documentElement;
        const height = Math.max(
          iframeBody.scrollHeight,
          iframeBody.offsetHeight,
          iframeHtml.clientHeight,
          iframeHtml.scrollHeight,
          iframeHtml.offsetHeight,
        );
        iframe.style.height = `${height}px`;
      } catch (error) {
        console.warn('Cannot access iframe content (cross-origin). Using 100vh.');
        iframe.style.height = '100vh';
      }
    };

    iframe.addEventListener('load', adjustHeight);
    return () => iframe.removeEventListener('load', adjustHeight);
  }, [model]);

  return (
    <div className="bg-black">
      <iframe
        key={model}
        ref={iframeRef}
        src={`/versions/${model}/index.html`}
        title={`${model} invitation`}
        loading="lazy"
        className="w-full border-none block"
        style={{ minHeight: '100vh' }}
      />
    </div>
  );
}

function CommentsPanel() {
  return (
    <div className="bg-black p-8">
      <Giscus
        id="model-comments"
        repo="aymeric-roucher/AGI-Dinner"
        repoId="R_kgDOQYuBxQ"
        category="Ideas"
        categoryId="DIC_kwDOQYuBxc4Cx9jG"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="dark"
        lang="fr"
        loading="lazy"
      />
    </div>
  );
}

export default function App() {
  const [selectedModel, setSelectedModel] = useState(defaultModel);

  return (
    <div className="bg-black text-white min-h-screen">
      <ModelSelector value={selectedModel} onChange={(event) => setSelectedModel(event.target.value)} />
      <ModelFrame model={selectedModel} />
      <CommentsPanel />
    </div>
  );
}

import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ImageGallery from './components/ImageGallery';
import './App.css';

function App() {
  const [refreshGallery, setRefreshGallery] = useState(0);

  const handleUploadSuccess = () => {
    // Actualizar la galería cuando se sube una nueva imagen
    setRefreshGallery(prev => prev + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CDN de Imágenes de samuel jonathan</h1>
      </header>
      <main>
        <ImageUploader onUploadSuccess={handleUploadSuccess} />
        <ImageGallery refreshTrigger={refreshGallery} />
      </main>
    </div>
  );
  
}

export default App;
import React, { useState, useEffect } from 'react';

const ImageCard = ({ image }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    console.log('Image object:', image);
    console.log('Variants:', image.variants);
    console.log('Base URL:', image.variants?.[0]);
  }, [image]);

  useEffect(() => {
    const baseUrl = image.variants && image.variants.length > 0 ? image.variants[0] : '';
    setImageUrl(baseUrl || '');
  }, [image]);

  const filename = image.filename || 'Imagen sin nombre';
  const uploadDate = image.uploaded ? new Date(image.uploaded).toLocaleString() : '';

  return (
    <div className="image-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '100%' }}>
      <div className="debug-info" style={{ display: 'none' }}>
        URL: {imageUrl}
      </div>
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={filename}
          className="image-preview"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', objectFit: 'contain' }}
          onError={(e) => {
            console.error('Error cargando imagen:', imageUrl);
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x200?text=Error+de+carga';
          }} 
        />
      ) : (
        <div className="image-placeholder">No hay vista previa disponible</div>
      )}
      <div className="image-details" style={{ textAlign: 'center', marginTop: '10px' }}>
        <h3>{filename}</h3>
        {uploadDate && <p>Subida: {uploadDate}</p>}
        <p>ID: {image.id}</p>
      </div>
    </div>
  );
};

export default ImageCard;
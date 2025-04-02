/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { getImages } from '../services/api';
import ImageCard from './ImageCard';

const ImageGallery = ({ refreshTrigger }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const data = await getImages();
        console.log('API response:', data); // Para debuggear la estructura
        
        // Comprobación más robusta para asegurar que images sea siempre un array
        if (data && data.result && Array.isArray(data.result)) {
          setImages(data.result);
        } else if (Array.isArray(data)) {
          setImages(data);
        } else {
          console.error('Unexpected response format:', data);
          setImages([]);
          setError('Formato de respuesta inesperado');
        }
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Error al cargar las imágenes');
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [refreshTrigger]);

  if (loading) return <div className="loading">Cargando imágenes...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="gallery">
      <h2>Galería de imágenes ({images.length})</h2>
      {images.length === 0 ? (
        <p>No hay imágenes para mostrar</p>
      ) : (
        <div className="image-grid">
         {images.map((image, index) => (
  <ImageCard key={image.id || index} image={image} />
))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
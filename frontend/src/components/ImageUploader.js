import React, { useState } from 'react';
import { uploadImage } from '../services/api';

const ImageUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    // Validación de tipo de archivo
    if (!selectedFile.type.match('image/*')) {
      setError('Por favor selecciona un archivo de imagen válido');
      return;
    }
    
    // Validación de tamaño
    if (selectedFile.size > 5 * 1024 * 1024) { // 5MB
      setError('La imagen no debe exceder 5MB');
      return;
    }
    
    setFile(selectedFile);
    setError(null);
    
    // Generar vista previa
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setProgress(0);
    
    try {
      // Simulación de progreso (axios no proporciona progreso real para FormData)
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);
      
      await uploadImage(file);
      clearInterval(interval);
      setProgress(100);
      setUploading(false);
      setFile(null);
      setPreview(null);
      
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      setError('Error al subir la imagen: ' + err.message);
      setUploading(false);
    }
  };

  return (
    <div className="image-uploader">
      <h3>Subir nueva imagen</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="upload-form">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange}
          disabled={uploading}
        />
        
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Vista previa" />
          </div>
        )}
        
        {uploading && (
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
            <span>{progress}%</span>
          </div>
        )}
        
        <button 
          onClick={handleUpload} 
          disabled={!file || uploading}
          className="upload-button"
        >
          {uploading ? 'Subiendo...' : 'Subir imagen'}
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
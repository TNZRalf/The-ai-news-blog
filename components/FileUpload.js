import React, { useState, useRef } from 'react';

export default function FileUpload({ onUploadComplete, acceptedTypes = "image/*,.json,.md,.pdf,.txt" }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = async (files) => {
    if (files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);
    setUploadStatus(null);

    const formData = new FormData();
    files.forEach(file => {
      formData.append('file', file);
    });

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setUploadStatus({
          type: 'success',
          message: `Successfully uploaded ${result.files.length} file(s)`,
          files: result.files
        });
        
        if (onUploadComplete) {
          onUploadComplete(result.files);
        }
      } else {
        setUploadStatus({
          type: 'error',
          message: result.error || 'Upload failed'
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus({
        type: 'error',
        message: 'Upload failed. Please try again.'
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="file-upload-container">
      <div
        className={`file-upload-zone ${isDragging ? 'dragging' : ''} ${uploading ? 'uploading' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        
        <div className="file-upload-content">
          <div className="file-upload-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4L24 32M24 32L16 24M24 32L32 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 36L4 40C4 42.2091 5.79086 44 8 44L40 44C42.2091 44 44 42.2091 44 40L44 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {uploading ? (
            <div className="file-upload-uploading">
              <p>Uploading files...</p>
              <div className="upload-progress-bar">
                <div 
                  className="upload-progress-fill"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="file-upload-text">
              <h3>Drop files here or click to upload</h3>
              <p>
                Supported formats: Images, Documents, Articles (JSON/MD), Data files<br/>
                Maximum size: 10MB per file
              </p>
            </div>
          )}
        </div>
      </div>

      {uploadStatus && (
        <div className={`upload-status ${uploadStatus.type}`}>
          <div className="upload-status-message">
            {uploadStatus.type === 'success' ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.667 5L7.5 14.167L3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            <span>{uploadStatus.message}</span>
          </div>
          
                     {uploadStatus.files && uploadStatus.files.length > 0 && (
             <div className="uploaded-files-list">
               {uploadStatus.files.map((file, index) => (
                 <div key={index} className={`uploaded-file ${file.success ? 'success' : 'error'}`}>
                   <div className="file-info">
                     <span className="file-name">{file.filename}</span>
                     {file.success ? (
                       <div className="file-details">
                         {file.isArticleUpdate ? (
                           <div className="article-import-info">
                             <span className="import-success">
                               ✅ Blog Updated! {file.articlesImported} articles imported
                               {file.articlesSkipped > 0 && ` (${file.articlesSkipped} skipped)`}
                             </span>
                             <span className="file-url">Articles are now live on your blog</span>
                           </div>
                         ) : (
                           <span className="file-url">{file.url}</span>
                         )}
                       </div>
                     ) : (
                       <span className="file-error">{file.error}</span>
                     )}
                   </div>
                 </div>
               ))}
             </div>
           )}
        </div>
      )}
    </div>
  );
} 
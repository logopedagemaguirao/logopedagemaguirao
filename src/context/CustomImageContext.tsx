import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// IndexedDB Helper
const DB_NAME = 'GemaGuiraoImagesDB';
const DB_VERSION = 1;
const STORE_NAME = 'uploaded_images';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function dbGetAll(): Promise<Record<string, string>> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();
      const results: Record<string, string> = {};
      req.onsuccess = () => {
        const cursor = req.result;
        if (cursor) {
          results[cursor.key.toString()] = cursor.value;
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      req.onerror = () => resolve({});
    });
  } catch {
    return {};
  }
}

async function dbPut(key: string, value: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to save image in IndexedDB:', err);
  }
}

async function dbDelete(key: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  } catch (err) {
    console.warn('Failed to delete image from IndexedDB:', err);
  }
}

async function dbClear(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  } catch {
    // ignore
  }
}

interface CustomImageContextType {
  customImages: Record<string, string>;
  isModalOpen: boolean;
  activeSlot: string | null;
  openUploadModal: (targetSlot?: string) => void;
  closeUploadModal: () => void;
  uploadFile: (file: File, explicitSlot?: string) => Promise<string>;
  uploadMultipleFiles: (files: FileList | File[]) => Promise<number>;
  removeImage: (key: string) => Promise<void>;
  resetAllImages: () => Promise<void>;
  getImageFor: (keyOrPath: string) => string | null;
}

const CustomImageContext = createContext<CustomImageContextType | undefined>(undefined);

export function CustomImageProvider({ children }: { children: ReactNode }) {
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState<string | null>(null);

  useEffect(() => {
    dbGetAll().then((data) => {
      setCustomImages(data);
    });
  }, []);

  const openUploadModal = (targetSlot?: string) => {
    setActiveSlot(targetSlot || null);
    setIsModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsModalOpen(false);
    setActiveSlot(null);
  };

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  const categorizeFilename = (fileName: string, explicitSlot?: string): string[] => {
    if (explicitSlot) return [explicitSlot, fileName];

    const lower = fileName.toLowerCase();
    const keys: string[] = [fileName];

    if (lower.includes('logo')) {
      keys.push('logo', 'Mi_logo-sin fondo.png', 'Mi logo.jpeg');
    }
    if (lower.includes('20_11_11') || lower.includes('20_11_58') || lower.includes('retrato')) {
      keys.push('portrait', 'ChatGPT Image 9 sept 2026, 20_11_11 (1).png', 'ChatGPT Image 9 sept 2026, 20_11_58.png');
    }
    if (lower.includes('20_14_36') || lower.includes('consulta')) {
      keys.push('consultation', 'ChatGPT Image 9 sept 2026, 20_14_36.png');
    }
    if (lower.includes('19.22.02') || lower.includes('material')) {
      keys.push('WhatsApp Image 2026-09-09 at 19.22.02 (1).jpeg', 'clinic-wa-therapy-materials');
    }

    return keys;
  };

  const uploadFile = async (file: File, explicitSlot?: string): Promise<string> => {
    const dataUrl = await readFileAsDataUrl(file);
    const slots = categorizeFilename(file.name, explicitSlot);

    const updated = { ...customImages };
    for (const slot of slots) {
      updated[slot] = dataUrl;
      await dbPut(slot, dataUrl);
    }
    setCustomImages(updated);
    return dataUrl;
  };

  const uploadMultipleFiles = async (files: FileList | File[]): Promise<number> => {
    let count = 0;
    const fileArray = Array.from(files);
    const updated = { ...customImages };

    for (const file of fileArray) {
      try {
        const dataUrl = await readFileAsDataUrl(file);
        const slots = categorizeFilename(file.name);
        for (const slot of slots) {
          updated[slot] = dataUrl;
          await dbPut(slot, dataUrl);
        }
        count++;
      } catch (err) {
        console.error('Error processing file:', file.name, err);
      }
    }
    setCustomImages(updated);
    return count;
  };

  const removeImage = async (key: string) => {
    await dbDelete(key);
    setCustomImages((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const resetAllImages = async () => {
    await dbClear();
    setCustomImages({});
  };

  const getImageFor = (keyOrPath: string): string | null => {
    if (!keyOrPath) return null;
    // Clean key: strip leading slashes and decoded/encoded variants
    const rawKey = keyOrPath.replace(/^\//, '');
    const decodedKey = decodeURI(rawKey);

    if (customImages[keyOrPath]) return customImages[keyOrPath];
    if (customImages[rawKey]) return customImages[rawKey];
    if (customImages[decodedKey]) return customImages[decodedKey];

    // Fallbacks for known aliases
    if (keyOrPath.includes('logo') && customImages['logo']) return customImages['logo'];
    if (keyOrPath.includes('20_11_11') && customImages['portrait']) return customImages['portrait'];
    if (keyOrPath.includes('20_14_36') && customImages['consultation']) return customImages['consultation'];

    return null;
  };

  return (
    <CustomImageContext.Provider
      value={{
        customImages,
        isModalOpen,
        activeSlot,
        openUploadModal,
        closeUploadModal,
        uploadFile,
        uploadMultipleFiles,
        removeImage,
        resetAllImages,
        getImageFor
      }}
    >
      {children}
    </CustomImageContext.Provider>
  );
}

export function useCustomImages() {
  const context = useContext(CustomImageContext);
  if (!context) {
    throw new Error('useCustomImages must be used within a CustomImageProvider');
  }
  return context;
}

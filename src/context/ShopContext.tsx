import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TherapyMaterial, CartItem } from '../types';
import { INITIAL_MATERIALS } from '../data/materialsData';

interface ShopContextType {
  materials: TherapyMaterial[];
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  isAddModalOpen: boolean;
  editingMaterial: TherapyMaterial | null;
  gatewayUrl: string;
  setGatewayUrl: (url: string) => void;
  addToCart: (material: TherapyMaterial) => void;
  removeFromCart: (materialId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openAddModal: (materialToEdit?: TherapyMaterial) => void;
  closeAddModal: () => void;
  saveMaterial: (materialData: Omit<TherapyMaterial, 'id' | 'createdDate'>, existingId?: string) => TherapyMaterial;
  deleteMaterial: (materialId: string) => void;
  resetMaterialsToDefault: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const STORAGE_CUSTOM_MATERIALS = 'gema_guirao_shop_custom_materials';
const STORAGE_CART = 'gema_guirao_shop_cart';
const STORAGE_GATEWAY_URL = 'gema_guirao_payment_gateway_url';

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [materials, setMaterials] = useState<TherapyMaterial[]>(INITIAL_MATERIALS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<TherapyMaterial | null>(null);
  const [gatewayUrl, setGatewayUrlState] = useState<string>('');

  // Load custom materials, cart, and gatewayUrl from localStorage
  useEffect(() => {
    try {
      const savedGateway = localStorage.getItem(STORAGE_GATEWAY_URL);
      if (savedGateway) {
        setGatewayUrlState(savedGateway);
      }

      const savedCustom = localStorage.getItem(STORAGE_CUSTOM_MATERIALS);
      if (savedCustom) {
        const parsed: TherapyMaterial[] = JSON.parse(savedCustom);
        // Merge: keep all user created materials and overrides
        const initialMap = new Map(INITIAL_MATERIALS.map((m) => [m.id, m]));
        parsed.forEach((m) => {
          initialMap.set(m.id, m);
        });
        setMaterials(Array.from(initialMap.values()));
      }

      const savedCart = localStorage.getItem(STORAGE_CART);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch {
      // Fallback to initial
    }
  }, []);

  const saveToStorage = (updatedMaterials: TherapyMaterial[]) => {
    try {
      localStorage.setItem(STORAGE_CUSTOM_MATERIALS, JSON.stringify(updatedMaterials));
    } catch (err) {
      console.error('Error saving materials to storage', err);
    }
  };

  const saveCartToStorage = (updatedCart: CartItem[]) => {
    try {
      localStorage.setItem(STORAGE_CART, JSON.stringify(updatedCart));
    } catch (err) {
      console.error('Error saving cart to storage', err);
    }
  };

  const addToCart = (material: TherapyMaterial) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.material.id === material.id);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.material.id === material.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [...prev, { material, quantity: 1 }];
      }
      saveCartToStorage(updated);
      return updated;
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (materialId: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.material.id !== materialId);
      saveCartToStorage(updated);
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    saveCartToStorage([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openAddModal = (materialToEdit?: TherapyMaterial) => {
    setEditingMaterial(materialToEdit || null);
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setEditingMaterial(null);
    setIsAddModalOpen(false);
  };

  const saveMaterial = (
    data: Omit<TherapyMaterial, 'id' | 'createdDate'>,
    existingId?: string
  ): TherapyMaterial => {
    let saved: TherapyMaterial;

    if (existingId) {
      // Update
      const existing = materials.find((m) => m.id === existingId);
      saved = {
        ...data,
        id: existingId,
        createdDate: existing?.createdDate || 'Reciente'
      };
      setMaterials((prev) => {
        const next = prev.map((m) => (m.id === existingId ? saved : m));
        saveToStorage(next);
        return next;
      });
    } else {
      // Create new
      saved = {
        ...data,
        id: `mat-custom-${Date.now()}`,
        createdDate: new Date().toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      };
      setMaterials((prev) => {
        const next = [saved, ...prev];
        saveToStorage(next);
        return next;
      });
    }

    closeAddModal();
    return saved;
  };

  const deleteMaterial = (materialId: string) => {
    setMaterials((prev) => {
      const next = prev.filter((m) => m.id !== materialId);
      saveToStorage(next);
      return next;
    });
    removeFromCart(materialId);
  };

  const resetMaterialsToDefault = () => {
    localStorage.removeItem(STORAGE_CUSTOM_MATERIALS);
    setMaterials(INITIAL_MATERIALS);
  };

  const setGatewayUrl = (url: string) => {
    setGatewayUrlState(url);
    try {
      localStorage.setItem(STORAGE_GATEWAY_URL, url);
    } catch (err) {
      console.error('Error saving gateway URL', err);
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.material.price * item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        materials,
        cart,
        cartCount,
        cartTotal,
        isCartOpen,
        isAddModalOpen,
        editingMaterial,
        gatewayUrl,
        setGatewayUrl,
        addToCart,
        removeFromCart,
        clearCart,
        openCart,
        closeCart,
        openAddModal,
        closeAddModal,
        saveMaterial,
        deleteMaterial,
        resetMaterialsToDefault
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

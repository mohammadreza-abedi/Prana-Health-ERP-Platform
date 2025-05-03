import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AvatarContextType {
  activeAvatarUrl: string;
  setActiveAvatarUrl: (url: string) => void;
  avatarName: string;
  setAvatarName: (name: string) => void;
  avatarLevel: number;
  setAvatarLevel: (level: number) => void;
}

const defaultContext: AvatarContextType = {
  activeAvatarUrl: '/avatar-images/Pria Gimbal Kacamata.png',
  setActiveAvatarUrl: () => {},
  avatarName: 'کاراکتر سبز',
  setAvatarName: () => {},
  avatarLevel: 1,
  setAvatarLevel: () => {},
};

export const AvatarContext = createContext<AvatarContextType>(defaultContext);

export const useAvatar = () => useContext(AvatarContext);

interface AvatarProviderProps {
  children: ReactNode;
}

export const AvatarProvider: React.FC<AvatarProviderProps> = ({ children }) => {
  // در یک برنامه واقعی، این مقادیر باید از API گرفته شوند
  const [activeAvatarUrl, setActiveAvatarUrl] = useState<string>(defaultContext.activeAvatarUrl);
  const [avatarName, setAvatarName] = useState<string>(defaultContext.avatarName);
  const [avatarLevel, setAvatarLevel] = useState<number>(defaultContext.avatarLevel);

  // ذخیره‌ی تنظیمات در localStorage
  useEffect(() => {
    const savedAvatar = localStorage.getItem('prana_active_avatar');
    if (savedAvatar) {
      try {
        const parsed = JSON.parse(savedAvatar);
        setActiveAvatarUrl(parsed.url);
        setAvatarName(parsed.name);
        setAvatarLevel(parsed.level);
      } catch (e) {
        console.error('Error parsing avatar data from localStorage', e);
      }
    }
  }, []);

  // ذخیره‌ی تغییرات آواتار فعال در localStorage
  useEffect(() => {
    localStorage.setItem('prana_active_avatar', JSON.stringify({
      url: activeAvatarUrl,
      name: avatarName,
      level: avatarLevel
    }));
  }, [activeAvatarUrl, avatarName, avatarLevel]);

  return (
    <AvatarContext.Provider 
      value={{ 
        activeAvatarUrl, 
        setActiveAvatarUrl, 
        avatarName, 
        setAvatarName, 
        avatarLevel, 
        setAvatarLevel 
      }}
    >
      {children}
    </AvatarContext.Provider>
  );
};
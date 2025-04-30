import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Star } from 'lucide-react';
import { Link } from 'wouter';
import { GlassPanel } from './glassmorphism';

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  path?: string;
  active?: boolean;
  badge?: string | number;
  badgeColor?: string;
  children?: MenuItem[];
  highlight?: boolean;
  info?: string;
  feature?: 'new' | 'popular' | 'recommended' | 'beta' | 'premium' | undefined;
  onClick?: () => void;
  separator?: boolean;
}

interface AdvancedMenuProps {
  items: MenuItem[];
  title?: string;
  subtitle?: string;
  onItemClick?: (item: MenuItem) => void;
  vertical?: boolean;
  glassmorphism?: boolean;
  hoverEffects?: boolean;
  animations?: boolean;
  colorScheme?: 'blue' | 'purple' | 'teal' | 'orange' | 'neutral';
  compact?: boolean;
  showIcons?: boolean;
  showBadges?: boolean;
  alignment?: 'start' | 'center' | 'end';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  closableSubmenu?: boolean;
  withSearch?: boolean;
  fullWidth?: boolean;
  withBorder?: boolean;
  className?: string;
}

/**
 * منوی پیشرفته با امکانات زیرمنو، انیمیشن، نشان، هایلایت و غیره
 */
export function AdvancedMenu({
  items,
  title,
  subtitle,
  onItemClick,
  vertical = true,
  glassmorphism = false,
  hoverEffects = true,
  animations = true,
  colorScheme = 'blue',
  compact = false,
  showIcons = true,
  showBadges = true,
  alignment = 'start',
  rounded = 'md',
  closableSubmenu = true,
  withSearch = false,
  fullWidth = false,
  withBorder = true,
  className
}: AdvancedMenuProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(items);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Color schemes for different colorScheme options
  const colorVariants = {
    blue: {
      active: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      hover: 'hover:bg-blue-50/70 dark:hover:bg-blue-900/20',
      border: 'border-blue-100 dark:border-blue-800',
      highlight: 'border-l-4 border-l-blue-500 dark:border-l-blue-400',
      badge: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
      header: 'border-b-blue-200 dark:border-b-blue-800',
      icon: 'text-blue-500 dark:text-blue-400',
    },
    purple: {
      active: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      hover: 'hover:bg-purple-50/70 dark:hover:bg-purple-900/20',
      border: 'border-purple-100 dark:border-purple-800',
      highlight: 'border-l-4 border-l-purple-500 dark:border-l-purple-400',
      badge: 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
      header: 'border-b-purple-200 dark:border-b-purple-800',
      icon: 'text-purple-500 dark:text-purple-400',
    },
    teal: {
      active: 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
      hover: 'hover:bg-teal-50/70 dark:hover:bg-teal-900/20',
      border: 'border-teal-100 dark:border-teal-800',
      highlight: 'border-l-4 border-l-teal-500 dark:border-l-teal-400',
      badge: 'bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100',
      header: 'border-b-teal-200 dark:border-b-teal-800',
      icon: 'text-teal-500 dark:text-teal-400',
    },
    orange: {
      active: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
      hover: 'hover:bg-orange-50/70 dark:hover:bg-orange-900/20',
      border: 'border-orange-100 dark:border-orange-800',
      highlight: 'border-l-4 border-l-orange-500 dark:border-l-orange-400',
      badge: 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100',
      header: 'border-b-orange-200 dark:border-b-orange-800',
      icon: 'text-orange-500 dark:text-orange-400',
    },
    neutral: {
      active: 'bg-gray-100 text-gray-900 dark:bg-gray-800/50 dark:text-gray-100',
      hover: 'hover:bg-gray-100/70 dark:hover:bg-gray-800/30',
      border: 'border-gray-200 dark:border-gray-700',
      highlight: 'border-l-4 border-l-gray-500 dark:border-l-gray-400',
      badge: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
      header: 'border-b-gray-200 dark:border-b-gray-700',
      icon: 'text-gray-500 dark:text-gray-400',
    },
  };

  // Border radius based on the 'rounded' prop
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  // Text alignment classes based on alignment prop
  const alignmentClasses = {
    start: 'text-start justify-start',
    center: 'text-center justify-center',
    end: 'text-end justify-end',
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = items.filter(item => 
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  }, [searchTerm, items]);

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  const handleItemClick = (e: React.MouseEvent, item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      e.preventDefault();
      toggleExpanded(item.label);
    }
    
    if (onItemClick) {
      onItemClick(item);
    }
    
    if (item.onClick) {
      item.onClick();
    }
  };

  // Badge renderer
  const renderBadge = (badge: string | number, color?: string) => {
    const badgeClass = color || colorVariants[colorScheme].badge;
    return (
      <span className={`px-1.5 py-0.5 text-xs rounded-full ${badgeClass} ml-1.5 rtl:mr-1.5 rtl:ml-0`}>
        {badge}
      </span>
    );
  };

  // Feature badge renderer
  const renderFeatureBadge = (feature: 'new' | 'popular' | 'recommended' | 'beta' | 'premium') => {
    const featureBadges = {
      new: { text: 'جدید', class: 'bg-blue-500 text-white' },
      popular: { text: 'محبوب', class: 'bg-amber-500 text-white' },
      recommended: { text: 'پیشنهادی', class: 'bg-green-500 text-white' },
      beta: { text: 'بتا', class: 'bg-purple-500 text-white' },
      premium: { text: 'پریمیوم', class: 'bg-teal-500 text-white' },
    };
    
    const badge = featureBadges[feature];
    return (
      <span className={`px-1.5 py-0.5 text-xs rounded-full ${badge.class} ml-1.5 rtl:mr-1.5 rtl:ml-0`}>
        {badge.text}
      </span>
    );
  };

  // Renders a single menu item
  const renderMenuItem = (item: MenuItem, index: number, isSubmenu = false) => {
    const isActive = item.active;
    const isExpanded = expandedItems.has(item.label);
    const hasChildren = item.children ? item.children.length > 0 : false;

    // Base item styles
    const itemClasses = cn(
      'flex items-center select-none',
      vertical ? 'w-full' : 'px-4',
      compact ? 'py-1.5' : 'py-2.5',
      isSubmenu ? 'pl-8 rtl:pr-8 rtl:pl-4' : 'px-4',
      isActive ? colorVariants[colorScheme].active : '',
      !isActive && hoverEffects ? colorVariants[colorScheme].hover : '',
      item.highlight ? colorVariants[colorScheme].highlight : '',
      item.separator ? 'border-b' : '',
      item.separator ? colorVariants[colorScheme].border : '',
      hasChildren ? 'cursor-pointer' : item.path ? 'cursor-pointer' : '',
      animations ? 'transition-all duration-200' : '',
      roundedClasses[rounded],
      alignmentClasses[alignment]
    );

    // Submenu animation variants
    const submenuVariants = {
      hidden: { 
        height: 0,
        opacity: 0,
        transition: {
          duration: 0.2,
          ease: "easeInOut"
        }
      },
      visible: { 
        height: "auto",
        opacity: 1,
        transition: {
          duration: 0.3,
          ease: "easeInOut"
        }
      }
    };

    return (
      <React.Fragment key={`${item.label}-${index}`}>
        {item.path ? (
          <Link href={item.path} onClick={(e) => handleItemClick(e, item)}>
            <div className={itemClasses}>
              {showIcons && item.icon && (
                <span className={`inline-flex mr-2 rtl:ml-2 rtl:mr-0 ${isActive ? colorVariants[colorScheme].icon : 'text-gray-500 dark:text-gray-400'}`}>
                  {item.icon}
                </span>
              )}
              
              <span className="flex-1">{item.label}</span>
              
              {/* Badges */}
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {showBadges && item.badge && renderBadge(item.badge, item.badgeColor)}
                {item.feature && renderFeatureBadge(item.feature)}
                
                {/* Chevron for submenu */}
                {hasChildren && (
                  <ChevronDown 
                    className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform ${
                      isExpanded ? 'transform rotate-180' : ''
                    }`} 
                  />
                )}
              </div>
            </div>
          </Link>
        ) : (
          <div className={itemClasses} onClick={(e) => handleItemClick(e, item)}>
            {showIcons && item.icon && (
              <span className={`inline-flex mr-2 rtl:ml-2 rtl:mr-0 ${isActive ? colorVariants[colorScheme].icon : 'text-gray-500 dark:text-gray-400'}`}>
                {item.icon}
              </span>
            )}
            
            <span className="flex-1">{item.label}</span>
            
            {/* Badges */}
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {showBadges && item.badge && renderBadge(item.badge, item.badgeColor)}
              {item.feature && renderFeatureBadge(item.feature)}
              
              {/* Chevron for submenu */}
              {hasChildren && (
                <ChevronDown 
                  className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform ${
                    isExpanded ? 'transform rotate-180' : ''
                  }`} 
                />
              )}
            </div>
          </div>
        )}

        {/* Submenu */}
        {hasChildren && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={submenuVariants}
                className="overflow-hidden"
              >
                <div className={cn(
                  "pl-2 border-l ml-4 rtl:mr-4 rtl:ml-0 rtl:border-r rtl:border-l-0",
                  colorVariants[colorScheme].border
                )}>
                  {item.children.map((child, childIndex) => 
                    renderMenuItem(child, childIndex, true)
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </React.Fragment>
    );
  };

  // Render the menu wrapper with optional glassmorphism
  const renderMenuWrapper = () => {
    const menuContent = (
      <div className="w-full">
        {/* Header Section with Title and Search */}
        {(title || subtitle || withSearch) && (
          <div className={cn(
            "p-4 mb-2",
            (title || subtitle) && withBorder ? `border-b ${colorVariants[colorScheme].header}` : ''
          )}>
            {/* Title and Subtitle */}
            {(title || subtitle) && (
              <div className="mb-3">
                {title && <h3 className="text-lg font-semibold">{title}</h3>}
                {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
              </div>
            )}
            
            {/* Search Input */}
            {withSearch && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="جستجو..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn(
                    "w-full p-2 pr-8 rtl:pl-8 rtl:pr-2 text-sm bg-white dark:bg-gray-800",
                    "border border-gray-200 dark:border-gray-700",
                    "focus:outline-none focus:ring-2",
                    `focus:ring-${colorScheme}-500/50`,
                    roundedClasses[rounded]
                  )}
                />
                <Search className="absolute left-2 rtl:right-2 rtl:left-auto top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            )}
          </div>
        )}
        
        {/* Menu Items */}
        <div className={cn(
          vertical ? 'flex flex-col space-y-0.5' : 'flex items-center space-x-2 rtl:space-x-reverse',
        )}>
          {filteredItems.map((item, i) => renderMenuItem(item, i))}
        </div>
      </div>
    );

    // Apply glassmorphism if enabled
    if (glassmorphism) {
      return (
        <GlassPanel
          className={cn(
            fullWidth ? 'w-full' : '', 
            "overflow-hidden", 
            className
          )}
          intensity="light"
          border={withBorder}
          interactive={true}
          colorScheme={colorScheme as any}
        >
          {menuContent}
        </GlassPanel>
      );
    }

    // Regular menu
    return (
      <div
        className={cn(
          "bg-white dark:bg-gray-900",
          withBorder ? `border ${colorVariants[colorScheme].border}` : '',
          roundedClasses[rounded],
          fullWidth ? 'w-full' : '',
          className
        )}
      >
        {menuContent}
      </div>
    );
  };

  return renderMenuWrapper();
}

// Search icon component
const Search = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

/**
 * منوی شیشه‌ای با افکت گلسمورفیسم
 */
export function GlassMenu({
  className,
  children,
  ...props
}: Omit<AdvancedMenuProps, 'glassmorphism'>) {
  return (
    <AdvancedMenu
      glassmorphism={true}
      hoverEffects={true}
      animations={true}
      className={className}
      {...props}
    />
  );
}

/**
 * منوی افقی برای نوارهای ناوبری بالای صفحه
 */
export function HorizontalMenu({
  className,
  items,
  ...props
}: Omit<AdvancedMenuProps, 'vertical'>) {
  return (
    <AdvancedMenu
      vertical={false}
      items={items}
      className={className}
      {...props}
    />
  );
}
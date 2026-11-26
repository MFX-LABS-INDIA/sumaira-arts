export interface CategoryOption {
  id: string;
  label: string;
}

export interface CategoryFilterProps {
  categories: CategoryOption[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  isMobile?: boolean;
  isSectionOpen: boolean;
  onSectionToggle: (isOpen: boolean) => void;
  isModalOpen: boolean;
  onModalToggle: (isOpen: boolean) => void;
}

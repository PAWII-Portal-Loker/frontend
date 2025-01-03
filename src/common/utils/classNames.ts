export const TEXT_CLASSES = "dark:text-slate-100 text-slate-700";
export const TEXT_TITLE_CLASSES = "dark:text-slate-200 text-slate-800";
export const TEXT_PRIMARY_CLASSES = "dark:text-blue-400 text-blue-800";
export const CONTAINER_CLASSES = "dark:bg-slate-700 bg-slate-100";
export const CONTAINER_ACTIVE_CLASSES = "dark:bg-slate-600 bg-slate-200";
export const CONTAINER_HOVER_CLASSES =
  "dark:hover:bg-slate-600 hover:bg-gray-300 transition-all duration-200";
export const CONTAINER_GRADIENT_CLASSES =
  "bg-gradient-to-r from-slate-200 to-slate-400 dark:from-slate-500 dark:to-slate-600";

type ThemeClassOptions =
  | typeof TEXT_CLASSES
  | typeof TEXT_TITLE_CLASSES
  | typeof TEXT_PRIMARY_CLASSES
  | typeof CONTAINER_CLASSES
  | typeof CONTAINER_ACTIVE_CLASSES
  | typeof CONTAINER_HOVER_CLASSES
  | typeof CONTAINER_GRADIENT_CLASSES;

export const getThemeClassNames = (...options: ThemeClassOptions[]): string => {
  return options.join(" ");
};

import { config, type IconDefinition } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;
import { faAngular, faGitAlt, faGithub, faHashnode, faTailwindCss } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowsRotate,
  faCircleHalfStroke,
  faCopy,
  faEarthEurope,
  faEye,
  faEyeSlash,
  faGear,
  faLocationCrosshairs,
  faServer,
  faSquareBinary,
} from '@fortawesome/free-solid-svg-icons';

/** Tree-shaken Font Awesome icons used across the app. */
export const APP_ICONS = {
  angular: faAngular,
  arrowsRotate: faArrowsRotate,
  circleHalfStroke: faCircleHalfStroke,
  copy: faCopy,
  earthEurope: faEarthEurope,
  eye: faEye,
  eyeSlash: faEyeSlash,
  gear: faGear,
  gitAlt: faGitAlt,
  github: faGithub,
  hashnode: faHashnode,
  locationCrosshairs: faLocationCrosshairs,
  server: faServer,
  squareBinary: faSquareBinary,
  tailwindCss: faTailwindCss,
} as const satisfies Record<string, IconDefinition>;

export type AppIconName = keyof typeof APP_ICONS;

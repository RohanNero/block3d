import { Block3dConfig } from "../types/block3d";

/**
 * @param currentPath is the page the user is currently on
 * @return true if currentPath is listed in `publicRoutes` array in `block3d.config.ts`, false otherwise.
 */
export async function checkIsRoutePublic(
  currentPath: string,
  block3dConfig: Block3dConfig
) {
  if (block3dConfig.publicRoutes.includes(currentPath)) {
    return true;
  } else {
    return false;
  }
}

import { Block3dConfig } from "../types/block3d";

/**
 * @param currentPath is the page the user is currently on
 * @return true if currentPath is listed in `publicRoutes` array in `block3d.config.ts`, false otherwise.
 */
export async function checkIsRoutePublic(
  currentPath: string,
  block3dConfig: Block3dConfig,
) {
  if (block3dConfig.publicRoutes.includes(currentPath)) {
    console.log("Current page is public!");
    return true;
  }
  console.log("Current page is not public!");
  return false;
}

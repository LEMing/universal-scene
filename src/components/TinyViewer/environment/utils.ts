export const isWebGLAvailable = () => {
  const canvas = document.createElement('canvas');
  const webgl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (webgl && webgl instanceof WebGLRenderingContext) {
    return true;
  }
  return false;
}

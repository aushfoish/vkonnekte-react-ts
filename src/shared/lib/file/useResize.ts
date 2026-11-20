export const resize = (bitmapWidth: number, bitmapHeight: number, maxSide: number) => {
  const scale = Math.min(maxSide / bitmapWidth, maxSide / bitmapHeight, 1);

  const canvasWidth = Math.round(bitmapWidth * scale)
  const cavnasHeight = Math.round(bitmapHeight * scale)

  return {
    canvasWidth, cavnasHeight
  }
};

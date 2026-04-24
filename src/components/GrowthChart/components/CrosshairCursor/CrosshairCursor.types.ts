export type CursorPoint = {
  x?: number;
  y?: number;
};

export type CursorViewBox = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

export type CrosshairCursorProps = {
  points?: CursorPoint[];
  viewBox?: CursorViewBox;
};

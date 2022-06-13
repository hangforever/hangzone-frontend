import { ToolColor } from '@src/types';

export function backgroundColor(color: ToolColor): string {
  return `background-${color}`;
}
